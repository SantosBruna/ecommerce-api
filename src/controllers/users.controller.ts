import{ Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { User } from "../models/user.model";

export class UserController{

    static async getAll(req: Request, res: Response) {
        res.send(await new UsersService().getAll());
    };

    static async getById (req: Request, res: Response) {
        let userId = req.params.id;
        res.send(await new UsersService().getById(userId));
    }

    static async save (req: Request, res: Response) {
        await new UsersService().save(req.body);
        res.status(201).send({
            message:"Usuário criado com sucesso!"
        });
    }

    static async update (req: Request, res: Response) {
        let userId = req.params.id;
        let userBody = req.body as User;
        await new UsersService().update(userId, userBody);

        res.send({
            message: "Usuário alterado com sucesso!"
        });    
    }

    static async delete (req: Request, res: Response) {
        await new UsersService().delete(req.params.id);
        res.status(204).end();
    }
}