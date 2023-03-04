import {Router} from "express";
import {AuthController} from "./controller";

const router = Router();
const controller = new AuthController()

router.get("/register", controller.register);
router.post("/register", controller.create);
router.post("/submit-email", controller.submit);
router.get("/forget", controller.reset);
router.post("/forgetStep",controller.resetS);
router.get("/post-a-trip",controller.trip);
router.post("/post-a-trip-next" , controller.tripNext);
router.post("/post-map" , controller.tripNextTwo);
router.get("/posts-result" , controller.result);
router.get("/history" , controller.historyTravel)


export default router;