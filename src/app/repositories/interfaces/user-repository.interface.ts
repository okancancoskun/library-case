import { User } from "entities";
import { IGenericRepository } from "./generic-repository.interface";

export interface IUserRepository extends IGenericRepository<User> {}
