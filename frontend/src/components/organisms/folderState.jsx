// src/components/organisms/FolderState.js
import React from 'react';

const FolderState = ({ currentFolder }) => {
    return (
        <div className="folder-state p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold">Current Folder</h2>
            <p>{currentFolder ? currentFolder : 'No folder selected'}</p>
        </div>
    );
};

export default FolderState;
