import {Router} from "express";
import {MainController} from "./main";
import authRoutes from "./web/auth/routes";
import postsRoutes from "./web/posts/router";

const router = Router();

const mainController = new MainController();

router.get('/', mainController.get);
router.use(authRoutes);
router.use('/posts', postsRoutes);

export default router;