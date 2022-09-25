import { Book } from "../../../entities";
import { IGenericRepository } from "./generic-repository.interface";

export interface IBookRepository extends IGenericRepository<Book> {}
