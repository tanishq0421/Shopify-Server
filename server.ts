import "dotenv/config";
import morgan from "morgan";
import express from "express";
import ApiRouter from "./routers";
import bodyParser from "body-parser";
import { ShopifyClient } from "./services/apiServices";
import { OrdersService } from "./services/ordersService";
import { CustomerService } from "./services/customerService";
import { CustomerController } from "./controllers/customerController";

const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.use("/app/api", ApiRouter);

const Port = process.env.APP_RUN_PORT;
app.listen(Port, async () => {
  console.log(`Shopify Server started on 8000`);
});
