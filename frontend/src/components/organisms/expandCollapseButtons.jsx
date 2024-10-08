// src/components/organisms/ExpandCollapseButtons.js
import React from 'react';

const ExpandCollapseButtons = ({ onExpand, onCollapse }) => {
    return (
        <div className="expand-collapse-buttons flex gap-4 p-4">
            <button
                onClick={onExpand}
                className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition"
            >
                Expand All
            </button>
            <button
                onClick={onCollapse}
                className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition"
            >
                Collapse All
            </button>
        </div>
    );
};

export default ExpandCollapseButtons;
