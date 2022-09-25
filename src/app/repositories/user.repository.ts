import { User } from "../../entities";
import { GenericRepository } from "./generic.repository";
import { IUserRepository } from "./interfaces";

export class UserRepository
	extends GenericRepository<User>
	implements IUserRepository
{
	constructor() {
		super(User);
	}
}
