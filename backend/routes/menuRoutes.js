import { Router } from 'express';
import { getMenus,getMenuById,addMenuItem,updateMenuItem,deleteMenuItem} from '../controllers/menuController.js';
const router = Router();

router.get('/menus',getMenus);
router.get('/menus/:id',getMenuById);
router.post('/menus',addMenuItem);
router.put('/menus/:id',updateMenuItem);
router.delete('/menus/:id',deleteMenuItem);

export default router;
