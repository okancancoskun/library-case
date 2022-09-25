import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable,
} from "typeorm";
import { Book } from "./book.entity";

@Entity({ name: "borrows" })
export class Borrow {
	@PrimaryGeneratedColumn()
	id: number;

	@JoinTable()
	@ManyToMany(() => Book)
	past: Book[];

	@JoinTable()
	@ManyToMany(() => Book)
	present: Book[];
}
