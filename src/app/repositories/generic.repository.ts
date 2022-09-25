import {
	FindManyOptions,
	ObjectLiteral,
	Repository,
	EntityTarget,
	FindOneOptions,
	DeleteResult,
} from "typeorm";
import { AppDataSource } from "../../db";
import { IGenericRepository } from "./interfaces";

export class GenericRepository<T extends ObjectLiteral>
	implements IGenericRepository<T>
{
	protected repository: Repository<T>;
	constructor(target: EntityTarget<T>) {
		this.repository = AppDataSource.getRepository<T>(target);
	}

	public async find(options?: FindManyOptions<T>): Promise<T[]> {
		return await this.repository.find(options);
	}

	public async create(body: T): Promise<T> {
		return await this.repository.save(body);
	}

	public async findOne(
		options: FindOneOptions<T>
	): Promise<T | null> {
		return await this.repository.findOne(options);
	}

	public async deleteOne(id: number): Promise<DeleteResult> {
		return await this.repository.delete(id);
	}

	public async updateOne(id: number, body: T): Promise<T> {
		const data = await this.repository.findOne({
			where: { id: id as any },
		});
		return this.repository.save({ ...data, ...body });
	}
}
