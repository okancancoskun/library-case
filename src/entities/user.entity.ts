import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	BeforeInsert,
} from "typeorm";
import { Borrow } from "./borrow.entity";
import { AppDataSource } from "../db";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name: string;

	@OneToOne(() => Borrow)
	@JoinColumn()
	books: Borrow;

	@BeforeInsert()
	async createBorrow() {
		const result = await AppDataSource.getRepository(Borrow).save({
			past: [],
			present: [],
		});
		this.books = result;
	}
}
