import "dotenv/config";
import axios from "axios";

export const generateAccessToken = async (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = new Buffer.from(
      `${process.env.SAFARICOM_CONSUMER_KEY}:${process.env.SAFARICOM_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
    });

    req.safaricom_access_token = response.data.access_token;
    console.log("Access token generated", req.safaricom_access_token)
    next();
  } catch (error) {
    console.error(
      "Access token error ",
      error.response ? error.response.data : error.message
    );
    res.status(401).send({
      message: "Something went wrong when trying to process your payment",
      error: error.response ? error.response.data : error.message,
    });
  }
};
