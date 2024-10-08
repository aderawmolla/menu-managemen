import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { addMenuItem, updateMenuItem, deleteMenuItem, fetchMenus } from "../../services/api";
import TreeNode from "../molecules/treeNode";
import CustomField from "../molecules/customField";
import { treeDataAtom, formDataAtom, buttonTextAtom, isCollapseAtom } from '../../recoil/menuState';
import { v4 as uuidv4 } from 'uuid';

// TreeDropdown component
export default function TreeDropdown() {
  const treeData = useRecoilValue(treeDataAtom);
  const setTreeData = useSetRecoilState(treeDataAtom);
  const formData = useRecoilValue(formDataAtom);
  const setFormData = useSetRecoilState(formDataAtom);
  const buttonText = useRecoilValue(buttonTextAtom);
  const setButtonText = useSetRecoilState(buttonTextAtom);
  const isCollapse = useRecoilValue(isCollapseAtom);
  const setIsCollapse = useSetRecoilState(isCollapseAtom);

  // Load the menu data from API on component mount
  useEffect(() => {
    const loadMenus = async () => {
      try {
        const response = await fetchMenus();
        const structuredData = structureMenus(response.data);
        setTreeData(structuredData);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    loadMenus();
  }, [setTreeData]);

  // Function to structure menu data into a tree format
  const structureMenus = (menus) => {
    const menuMap = new Map();
    menus.forEach(menu => {
      menu.children = [];
      menuMap.set(menu.id, menu);
    });

    const tree = [];
    menuMap.forEach(menu => {
      if (menu.parentId) {
        const parent = menuMap.get(menu.parentId);
        if (parent) {
          parent.children.push(menu);
        }
      } else {
        tree.push(menu);
      }
    });
    return tree;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleAddChild = async () => {
    const newChild = {
      id: uuidv4(),
      name: formData.name,
      depth: (formData.depth || 0) + 1,
      parentId: formData.parentId, // This should now reflect the selected node's ID
      isGroup: false,
      children: [],
    };

    try {
      const response = await addMenuItem(newChild);
      const updatedData = addChildToNode(treeData, response.data.id, { ...newChild, id: response.data.id });
      setTreeData(updatedData);
      resetForm(); // Clear the form after adding
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };


  const addChildToNode = (nodes, newChildId, newChild) => {
    return nodes.map(node => {
      if (node.id === newChild.parentId) {
        node.children.push(newChild);
      }
      if (node.children.length > 0) {
        node.children = addChildToNode(node.children, newChildId, newChild);
      }
      return node;
    });
  };


  const handleEditItem = async () => {
    try {
      await updateMenuItem(formData.menu_id, { name: formData.name });
      const updatedData = updateNode(treeData, formData.menu_id, formData.name);
      setTreeData(updatedData);
      resetForm(); // Clear the form after editing
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };


  const updateNode = (nodes, menuId, newName) => {
    return nodes.map(node => {
      if (node.id === menuId) {
        node.name = newName;
      }
      if (node.children.length > 0) {
        node.children = updateNode(node.children, menuId, newName);
      }
      return node;
    });
  };

  const handleDelete = async (nodeId) => {
    try {
      await deleteMenuItem(nodeId);
      const updatedData = deleteNodeAndChildren(treeData, nodeId);
      setTreeData(updatedData);
      resetForm(); // Clear the form after deletion
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const deleteNodeAndChildren = (nodes, nodeId) => {
    return nodes.reduce((acc, node) => {
      if (node.id !== nodeId) {
        node.children = deleteNodeAndChildren(node.children, nodeId);
        acc.push(node);
      }
      return acc;
    }, []);
  };

  const handleEditButtonPressed = (node) => {
    setFormData({
      menu_id: node.id,
      depth: node.depth,
      parentId: node.parentId || "", // Ensure this reflects the current node's parent
      name: node.name,
    });
    setButtonText("Save Edit");
  };

  const handleAddButtonPressed = (node) => {
    setFormData({
      menu_id: "", 
      depth: node.depth + 1, 
      parentId: node.id, // Set parentId to the current node's ID
      name: "", 
    });
    setButtonText("Add Child");
  };

  const resetForm = () => {
    setFormData({ menu_id: "", depth: 0, parentId: "", name: "" });
    setButtonText("Save");
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
          {treeData.length > 0 ? (
            treeData.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                level={0}
                onAdd={() => handleAddButtonPressed(node)}
                onEdit={() => handleEditButtonPressed(node)}
                onDelete={() => handleDelete(node.id)}
                isExpandedAll={!isCollapse}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">There are no records available.</div>
          )}
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
          readOnly // Making depth read-only
        />
        <CustomField
          name="parentId"
          value={formData.parentId}
          label="Parent Id"
          type="text"
          onChange={handleInputChange}
          readOnly // Making parentId read-only
        />
        <CustomField
          name="name"
          value={formData.name}
          label="Menu Name"
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
          className="max-w-[230px] font-bold bg-menu-arcticBlue py-3 px-8 rounded-full text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
