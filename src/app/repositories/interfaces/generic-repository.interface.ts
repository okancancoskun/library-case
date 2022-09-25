import {
	FindManyOptions,
	FindOneOptions,
	DeleteResult,
	UpdateResult,
} from "typeorm";

export interface IGenericRepository<T> {
	find(options?: FindManyOptions<T>): Promise<T[]>;
	create(body: T): Promise<T>;
	findOne(options: FindOneOptions<T>): Promise<T | null>;
	deleteOne(id: number): Promise<DeleteResult>;
	updateOne(id: number, body: T): Promise<T>;
}
