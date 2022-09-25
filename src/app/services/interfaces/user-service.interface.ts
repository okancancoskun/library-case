import { ReturnBookDto } from "../../../dtos";
import { User } from "../../../entities";
import { IGenericService } from "./generic-service.interface";

export interface IUserService extends IGenericService<User> {
	borrowBook(
		userId: number,
		bookId: number
	): Promise<User | Error | undefined>;

	returnBook(
		userId: number,
		bookId: number,
		body: ReturnBookDto
	): Promise<User | Error | undefined>;
}
