import Menu from '../models/menu.js';

// Get all menus
export async function getMenus(req, res) {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menus' });
  }
}

// Get a single menu by ID
export async function getMenuById(req, res) {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
}

// Add a new menu item (Allow missing fields, defaults will be used)
export async function addMenuItem(req, res) {
  try {
    const { name, parentId, depth, isGroup } = req.body;
    const menu = await Menu.create({
      name: name || 'Untitled',  
      parentId: parentId || null, 
      depth: depth || 0,  
      isGroup: isGroup || false,  
    });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: `Failed to add menu item ${error}` });
  }
}

// Update an existing menu item (Allow partial updates)
export async function updateMenuItem(req, res) {
  try {
    const { name, parentId, depth, isGroup } = req.body;
    
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Update only provided fields
    const updated = await menu.update({
      name: name !== undefined ? name : menu.name,  
      parentId: parentId !== undefined ? parentId : menu.parentId,
      depth: depth !== undefined ? depth : menu.depth,
      isGroup: isGroup !== undefined ? isGroup : menu.isGroup,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: `Failed to update menu item ${error}`});
  }
}

// Delete a menu item
export async function deleteMenuItem(req, res) {
  try {
    const deleted = await Menu.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Menu item deleted' });
    } else {
      res.status(404).json({ error: 'Menu item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete menu item' });
  }
}
