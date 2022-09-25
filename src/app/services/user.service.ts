import { ReturnBookDto } from "../../dtos";
import { User } from "../../entities";
import { UserRepository } from "../repositories";
import { BookService } from "./book.service";
import { BorrowService } from "./borrow.service";
import { GenericService } from "./generic.service";
import { IUserService } from "./interfaces";

export class UserService
	extends GenericService<User>
	implements IUserService
{
	constructor() {
		super(new UserRepository());
	}

	public async borrowBook(
		userId: number,
		bookId: number
	): Promise<User | Error | undefined> {
		const borrowService = new BorrowService();
		const bookService = new BookService();

		const book = await bookService.findOne({
			where: { id: bookId },
		});
		if (!book) throw new Error("Book does not exist");
		const user = await this.findOne({
			where: { id: userId },
			relations: ["books", "books.present", "books.past"],
			select: ["books"],
		});
		if (!user) throw new Error("User does not exist");
		const exist = user?.books.present.some(
			(book) => book.id === bookId
		);
		if (!exist && user.books && user.books.id) {
			user.books.present.push(book);
			await borrowService.updateOne(user?.books.id, user?.books);
			return user;
		}
		if (exist) {
			throw new Error("User already had this book");
		}
	}

	public async returnBook(
		userId: number,
		bookId: number,
		body: ReturnBookDto
	): Promise<User | Error | undefined> {
		const bookService = new BookService();
		const borrowService = new BorrowService();
		const book = await bookService.findOne({
			where: { id: bookId },
		});

		if (!book) throw new Error("Book does not exist");
		const user = await this.findOne({
			where: { id: userId },
			relations: ["books", "books.present", "books.past"],
			select: ["books"],
		});
		if (!user) throw new Error("User does not exist");
		const index = user?.books.present.findIndex(
			(book) => book.id === bookId
		);
		if (index === -1) {
			throw new Error("User doesnt have this book");
		} else {
			user.books.present.splice(index, 1);
			user.books.past.push(book);
			await borrowService.updateOne(user.books.id, user?.books);
			if (book.score !== -1) {
				const currentAverage = book.scoreCount * book.score;
				const newAverage = currentAverage + body.score;
				let newCount = book.scoreCount + 1;
				book.score = newAverage / newCount;
				book.scoreCount = newCount;
			} else {
				book.score = body.score;
				book.scoreCount = 1;
			}
			await bookService.updateOne(book.id, book);
			return user;
		}
	}
}
