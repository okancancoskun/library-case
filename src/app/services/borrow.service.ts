import { Borrow } from "../../entities";
import { BorrowRepository } from "../repositories";
import { GenericService } from "./generic.service";
import { IBorrowService } from "./interfaces";

export class BorrowService
	extends GenericService<Borrow>
	implements IBorrowService
{
	constructor() {
		super(new BorrowRepository());
	}
}
