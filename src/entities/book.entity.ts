import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "books" })
export class Book {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@Column({
		default: -1,
		nullable: true,
		type: "float",
	})
	score: number;

	@Column({ default: 0, nullable: true })
	scoreCount: number;

	constructor(partial: Partial<Book>) {
		Object.assign(this, partial);
	}
}
