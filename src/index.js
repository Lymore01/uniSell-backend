// entry point
import e from "express";
import "dotenv/config";
import productRouter from "./frameworks/express/routes/productRoutes.js";
import orderRouter from "./frameworks/express/routes/orderRoutes.js";
import categoryRouter from "./frameworks/express/routes/categoryRoutes.js";
import shopRouter from "./frameworks/express/routes/shopRoutes.js";
import paymentRouter from "./frameworks/express/routes/paymentRoute.js";
import userRouter from "./frameworks/express/routes/userRoutes.js";
import bodyParser from "body-parser";
import cors from "cors"
import db from "./frameworks/database/connect.js";
const app = e();
const PORT = process.env.PORT;



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/shop", shopRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
