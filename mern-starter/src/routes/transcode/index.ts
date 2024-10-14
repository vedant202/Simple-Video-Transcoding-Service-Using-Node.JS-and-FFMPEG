import {Router} from "express"
import fileUploader from "../../middlewares/fileUploader";
import transcodeVideo from "../../controller/transcodeVideo";

const router = Router();

router.post("/new",fileUploader.single("file"),transcodeVideo)
export default router;