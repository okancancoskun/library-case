import { Borrow } from "../../entities";
import { GenericRepository } from "./generic.repository";
import { IBorrowRepository } from "./interfaces";

export class BorrowRepository
	extends GenericRepository<Borrow>
	implements IBorrowRepository
{
	constructor() {
		super(Borrow);
	}
}
