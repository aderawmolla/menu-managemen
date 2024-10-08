import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Menu = sequelize.define('Menu', {  
    id: {
        type: DataTypes.UUID, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,  
    },
    depth: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.UUID,  // Use DataTypes.UUID here
        allowNull: true,
        defaultValue: null,
    },
    isGroup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    
}, {
    timestamps: true,  // Automatically add createdAt and updatedAt fields
});

export default Menu;
