import {Router} from "express";
import {PostsController} from "./controller";

const router = Router();
const controller = new PostsController();

router.get("/get", controller.get);

export default router