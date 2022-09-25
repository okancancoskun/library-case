import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BookService } from "../app";
import { Book } from "../entities";

const bookService = new BookService();

export class BookController {
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
			const body: Pick<Book, "name"> = req.body;
			res.status(201).json(await bookService.create(new Book(body)));
		} catch (error) {
			res.status(500).json("Book Couldn't created");
		}
	}

	public async find(req: Request, res: Response, next: NextFunction) {
		try {
			res
				.status(200)
				.json(
					await bookService.find({ select: ["name", "score", "id"] })
				);
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
				await bookService.findOne({
					where: { id: parseInt(req.params.id) },
					select: ["name", "score", "id"],
				})
			);
		} catch (error) {
			return res.status(404).json((error as any).message);
		}
	}
}
