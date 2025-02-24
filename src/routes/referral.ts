import { Router } from "express";
import referral from "../controllers/referral";




const referralRouter = Router();

referralRouter.post("/createReferral",referral.createReferral);

export default referralRouter