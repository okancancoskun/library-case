import { Book } from "../../../entities";
import { IGenericService } from "./generic-service.interface";

export interface IBookService extends IGenericService<Book> {}
