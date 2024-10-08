import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { addMenuItem, updateMenuItem, deleteMenuItem, fetchMenus } from "../../services/api";
import TreeNode from "../molecules/treeNode";
import CustomField from "../molecules/customField";
import { treeDataAtom, formDataAtom, buttonTextAtom, isCollapseAtom } from '../../recoil/menuState';

// TreeDropdown component
export default function TreeDropdown() {
  const [treeData, setTreeData] = useRecoilState(treeDataAtom);
  const [formData, setFormData] = useRecoilState(formDataAtom);
  const [buttonText, setButtonText] = useRecoilState(buttonTextAtom);
  const [isCollapse, setIsCollapse] = useRecoilState(isCollapseAtom);

  // Load the menu data from API on component mount
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const response = await fetchMenus();
        setTreeData(response.data);  // Set the fetched menus
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    loadMenus();
  }, [setTreeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddChild = async () => {
    const newChild = {
      name: formData.name,
      depth: formData.depth + 1,
      parentId: formData.menu_id,
      isGroup: false,
    };

    try {
      const response = await addMenuItem(newChild);  // API call to add menu item
      const updatedData = [...treeData];

      const addChildToNode = (nodes) => {
        for (let n of nodes) {
          if (n.id === formData.menu_id) {
            n.children.push({ ...newChild, id: response.data.id });  // Add newly created item
            return true;
          }
          if (n.children.length) {
            const found = addChildToNode(n.children);
            if (found) return true;
          }
        }
        return false;
      };

      addChildToNode(updatedData);
      setTreeData(updatedData);

      // Reset form data after adding
      setFormData({ menu_id: "", depth: 0, parent_data: "", name: "" });
      setButtonText("Save");
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const handleEditItem = async () => {
    try {
      await updateMenuItem(formData.menu_id, { name: formData.name });  // API call to update menu
      const updatedData = [...treeData];

      const updateNode = (nodes) => {
        for (let n of nodes) {
          if (n.id === formData.menu_id) {
            n.name = formData.name;
            return true;
          }
          if (n.children.length) {
            const found = updateNode(n.children);
            if (found) return true;
          }
        }
        return false;
      };

      updateNode(updatedData);
      setTreeData(updatedData);

      // Reset form data after editing
      setFormData({ menu_id: "", depth: 0, parent_data: "", name: "" });
      setButtonText("Save");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDelete = async (node) => {
    try {
      await deleteMenuItem(node.id);  // API call to delete menu
      const updatedData = [...treeData];

      const deleteNode = (nodes) => {
        return nodes.filter((n) => {
          if (n.id === node.id) return false;
          n.children = deleteNode(n.children);
          return true;
        });
      };

      setTreeData(deleteNode(updatedData));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleEditButtonPressed = (node) => {
    setFormData({
      menu_id: node.id,
      depth: node.depth,
      parent_data: node.name,
      name: node.name,
    });
    setButtonText("Save Edit");
  };

  const handleAddButtonPressed = (node) => {
    setFormData({
      menu_id: node.id,
      depth: node.depth,
      parent_data: node.name,
      name: "",
    });
    setButtonText("Add Child");
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div className="flex gap-8 whitespace-nowrap">
          <button
            onClick={() => setIsCollapse(false)}
            className={`py-3 px-8 font-semibold ${isCollapse ? "text-black bg-white" : "bg-black text-white"} rounded-full border border-gray-300`}
          >
            Expand All
          </button>
          <button
            onClick={() => setIsCollapse(true)}
            className={`py-3 px-8 font-semibold ${!isCollapse ? "text-black bg-white" : "bg-black text-white"} rounded-full border border-gray-300`}
          >
            Collapse All
          </button>
        </div>
        <div>
          {treeData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              onAdd={() => handleAddButtonPressed(node)}  // Updated function for adding
              onEdit={() => handleEditButtonPressed(node)} // Updated function for editing
              onDelete={() => handleDelete(node)}
              isExpandedAll={!isCollapse}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4 pt-32 md:pt-0">
        <CustomField
          name="menu_id"
          value={formData.menu_id}
          label="Menu Id"
          type="text"
          onChange={handleInputChange}
        />
        <CustomField
          name="depth"
          value={formData.depth}
          label="Depth"
          type="number"
          onChange={handleInputChange}
        />
        <CustomField
          name="parent_data"
          value={formData.parent_data}
          label="Parent Data"
          type="text"
          onChange={handleInputChange}
        />
        <CustomField
          name="name"
          value={formData.name}
          label="Name"
          type="text"
          onChange={handleInputChange}
        />
        <button
          onClick={
            buttonText === "Save Edit"
              ? handleEditItem
              : buttonText === "Add Child"
              ? handleAddChild
              : () => {}
          }
          className="max-w-[230px] font-bold bg-blue-500 py-3 px-8 rounded-full text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
