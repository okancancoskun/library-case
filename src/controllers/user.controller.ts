import { CreateUserDto } from "../dtos/user/create-user.dto";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../app";
import { plainToInstance } from "class-transformer";
import { User } from "../entities";
import { ReturnBookDto } from "../dtos";
import { validationResult } from "express-validator";

const userService = new UserService();

export class UserController {
	public async create(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const body: CreateUserDto = req.body;
			res
				.status(201)
				.json(await userService.create(plainToInstance(User, body)));
		} catch (error) {
			res.status(500).json("User Couldn't created");
		}
	}

	public async find(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(200).json(await userService.find());
		} catch (error) {
			res.status(500).json("error");
		}
	}

	public async findOne(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			res.status(200).json(
				await userService.findOne({
					where: { id: parseInt(req.params.id) },
					relations: ["books", "books.past", "books.present"],
				})
			);
		} catch (error) {}
	}

	public async borrowBook(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			await userService.borrowBook(
				parseInt(req.params.userId),
				parseInt(req.params.bookId)
			);
			res.status(204).json();
		} catch (error: any) {
			res.status(500).json(next(error.message));
		}
	}

	public async returnBook(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const body: ReturnBookDto = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			await userService.returnBook(
				parseInt(req.params.userId),
				parseInt(req.params.bookId),
				body
			);
			return res.status(204).json({});
		} catch (error: any) {
			res.status(500).json(next(error.message));
		}
	}
}
