import {
	FindManyOptions,
	FindOneOptions,
	DeleteResult,
	UpdateResult,
} from "typeorm";
import { IGenericService } from "./interfaces";
import { IGenericRepository } from "../repositories/interfaces";

export class GenericService<T> implements IGenericService<T> {
	constructor(private readonly repository: IGenericRepository<T>) {}

	public async find(options?: FindManyOptions<T>): Promise<T[]> {
		return await this.repository.find(options);
	}

	public async create(body: T): Promise<T> {
		return await this.repository.create(body);
	}

	public async findOne(
		options: FindOneOptions<T>
	): Promise<T | null> {
		return await this.repository.findOne(options);
	}

	public async deleteOne(id: number): Promise<DeleteResult> {
		return await this.repository.deleteOne(id);
	}

	public async updateOne(id: number, body: T): Promise<T> {
		return await this.repository.updateOne(id, body);
	}
}
