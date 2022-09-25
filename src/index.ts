import express, { Express } from "express";
import { AppDataSource } from "./db";
import cors from "cors";
import { userRouter, bookRouter } from "./routes";
import { urlencoded } from "body-parser";
import { join } from "path";
import * as dotenv from "dotenv";
import "dotenv/config";

dotenv.config({ path: process.cwd() + "/.env" });
const app: Express = express();

const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cors());
app.use("/public", express.static(join(__dirname, "public")));
app.use(urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/books", bookRouter);

AppDataSource.initialize().then(() => {
	console.log("DB connected successfully");
	app.listen(process.env.PORT || 5000, () =>
		console.log(
			`App listening on port: ${process.env.PORT || "5000"}`
		)
	);
});
