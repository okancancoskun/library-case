import { User, Book, Borrow } from "../entities";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import "dotenv/config";
dotenv.config({ path: process.cwd() + "/.env" });

export const AppDataSource: DataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [User, Book, Borrow],
	synchronize: true,
	logging: true,
});
