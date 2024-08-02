import { timeStamp } from "../../utils/timeStamp.js";
import ngrok from "ngrok";
import axios from "axios";
import "dotenv/config";

class LipaNaMpesa {
  async initiateStkPush(req, res) {
    try {
      const { amount, phone, Order_ID } = req.body;
      const url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + req.safaricom_access_token;

      const timestamp = timeStamp();
      const password = Buffer.from(
        process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp
      ).toString("base64");
      const callback_url = await ngrok.connect(process.env.PORT);
      const api = ngrok.getApi();
      await api.listTunnels();

      const requestBody = {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.BUSINESS_SHORT_CODE,
        PhoneNumber: phone,
        CallBackURL: `${callback_url}/api/payment/stk-push-callback/${Order_ID}`,
        AccountReference: "Unisell marketplace",
        TransactionDesc: "Paid online"
      };

      console.log("Request Body: ", requestBody);
      console.log("Request URL: ", url);

      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error while trying to create LipaNaMpesa details",
        error.response ? error.response.data : error.message
      );
      res.status(503).send({
        message:
          "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
        error: error.response ? error.response.data : error.message,
      });
    }
  }

  // TODO: Make sure stkPushCallback works

  async stkPushCallBack(req, res) {
    try {
      const { Order_ID } = req.params;

      const bod = req.body;

      console.log(bod);

      const {
        MerchantRequestID,
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
        CallbackMetadata,
      } = req.body.Body.stkCallback;

      const meta = Object.values(CallbackMetadata.Item);
      const PhoneNumber = meta
        .find((o) => o.Name === "PhoneNumber")
        .Value.toString();
      const Amount = meta.find((o) => o.Name === "Amount").Value.toString();
      const MpesaReceiptNumber = meta
        .find((o) => o.Name === "MpesaReceiptNumber")
        .Value.toString();
      const TransactionDate = meta
        .find((o) => o.Name === "TransactionDate")
        .Value.toString();

      console.log("-".repeat(20), "OUTPUT IN THE CALLBACK", "-".repeat(20));
      console.log(`
            Order_ID: ${Order_ID},
            MerchantRequestID: ${MerchantRequestID},
            CheckoutRequestID: ${CheckoutRequestID},
            ResultCode: ${ResultCode},
            ResultDesc: ${ResultDesc},
            PhoneNumber: ${PhoneNumber},
            Amount: ${Amount}, 
            MpesaReceiptNumber: ${MpesaReceiptNumber},
            TransactionDate: ${TransactionDate}
        `);
      res.json(true);
    } catch (error) {
      console.error(
        "Error while trying to update LipaNaMpesa details from the callback",
        error
      );
      res.status(503).send({
        message: "Something went wrong with the callback",
        error: error.message,
      });
    }
  }

  async confirmPayment(req, res) {
    try {
      const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
      const auth = "Bearer " + req.safaricom_access_token;

      const timestamp = timeStamp();
      const password = Buffer.from(
        `${process.env.BUSINESS_SHORT_CODE}${process.env.PASS_KEY}${timestamp}`
      ).toString("base64");

      const requestBody = {
        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: req.params.CheckoutRequestID,
      };

      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error while trying to create LipaNaMpesa details", error);
      res.status(503).send({
        message:
          "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
        error: error.message,
      });
    }
  }
}

export default LipaNaMpesa;
