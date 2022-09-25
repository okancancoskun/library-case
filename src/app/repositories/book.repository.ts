import { Book } from "../../entities";
import { GenericRepository } from "./generic.repository";
import { IBookRepository } from "./interfaces";

export class BookRepository
	extends GenericRepository<Book>
	implements IBookRepository
{
	constructor() {
		super(Book);
	}
}
