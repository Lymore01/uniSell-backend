// entry point
import e from "express";
import "dotenv/config";
import userRouter from "./frameworks/express/routes/productRoutes.js";
import orderRouter from "./frameworks/express/routes/orderRoutes.js";
import bodyParser from "body-parser";
import cors from "cors"
import db from "./frameworks/database/connect.js";
const app = e();
const PORT = process.env.PORT;



app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/product", userRouter);
app.use("/api/order", orderRouter);



app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
