import "dotenv/config";
import morgan from "morgan";
import express from "express";
import ApiRouter from "./routers";

const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.get("/api", ApiRouter);

const Port = process.env.APP_RUN_PORT;
app.listen(Port, async () => {
  console.log(`Shopify Server started on 8000`);
});
