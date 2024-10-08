import { useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

export default function TreeNode({
  node,
  level,
  onDelete,
  onEdit,
  onAdd,
  isExpandedAll,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if this node should be expanded based on isExpandedAll or its own expanded state
  const shouldExpand =
    isExpanded || (isExpandedAll && node.children && node.children.length > 0);

  return (
    <div style={{ paddingLeft: `${level * 20}px` }}>
      <div
        className="flex items-center cursor-pointer gap-4 mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Display expand/collapse arrow if there are children */}
        {node.children && node.children.length > 0 && (
          <svg
            onClick={handleToggle}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3 w-3 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}

        {/* Display node label (if available) */}
        <span className="text-sm">{node.label || 'Unnamed Node'}</span>

        {/* Show action icons (Add, Edit, Delete) when hovered */}
        {isHovered && (
          <div className="flex gap-2">
            <HiPlus
              className="text-gray-500 cursor-pointer"
              onClick={() => onAdd(node)}
            />
            <HiPencil
              className="text-gray-500 cursor-pointer"
              onClick={() => onEdit(node)}
            />
            <HiTrash
              className="text-gray-500 cursor-pointer"
              onClick={() => onDelete(node)}
            />
          </div>
        )}
      </div>

      {/* Render child nodes if expanded */}
      {shouldExpand && node.children && (
        <div className="flex relative flex-col gap-2">
          {/* Render a vertical line to indicate hierarchy */}
          <div
            className="absolute border-l"
            style={{
              left: `${level * 20 + 4}px`,
              top: "0",
              height: "100%",
              borderLeft: "2px solid gray",
              opacity: "40%",
            }}
          ></div>

          {/* Recursively render child nodes */}
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              label={node.name} 
              level={level + 1}
              onDelete={onDelete}
              onEdit={onEdit}
              onAdd={onAdd}
              isExpandedAll={isExpandedAll}
            />
          ))}
        </div>
      )}
    </div>
  );
}
