import express from "express";
import herosC from "../../controllers/herosController.mjs";
import IDValidator from "../../middlewares/ID_Validator.mjs";
import queryParamsValidator from "../../middlewares/queryParamsSchema.mjs";
const router = express.Router();

router.get("/get-heros", queryParamsValidator, herosC.getHeros);
 
export default router;
