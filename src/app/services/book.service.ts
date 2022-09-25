import { Book } from "../../entities";
import { BookRepository } from "../repositories";
import { GenericService } from "./generic.service";
import { IBookService } from "./interfaces";

export class BookService
	extends GenericService<Book>
	implements IBookService
{
	constructor() {
		super(new BookRepository());
	}
}
