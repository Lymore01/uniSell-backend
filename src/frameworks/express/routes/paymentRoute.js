import e from "express";
import LipaNaMpesa from "../../../controllers/payment/lipaNaMpesa.js";
import { generateAccessToken } from "../../../middlewares/payment/generateAccessToken.js";

const lipaNaMpesaController = new LipaNaMpesa();

const paymentRouter = e.Router();

paymentRouter.post("/stk-push", generateAccessToken, (req, res) =>
  lipaNaMpesaController.initiateStkPush(req, res)
);
paymentRouter.post(
  "/stk-push-callback/:Order_id",
  generateAccessToken,
  (req, res) => lipaNaMpesaController.stkPushCallBack(req, res)
);
paymentRouter.post(
  "/confirmPayment/:CheckoutRequestID",
  generateAccessToken,
  (req, res) => lipaNaMpesaController.confirmPayment(req, res)
);
export default paymentRouter;
