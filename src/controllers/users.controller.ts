import{Request, Response} from "express";
import {getFirestore} from "firebase-admin/firestore";

type User = {
    id: number;
    nome: string;
    email: string;
}

let usuarios: User[] = [];

export class UserController{

    static getAll(req: Request, res: Response) {
        res.send(usuarios);
    };

    static getById (req: Request, res: Response) {
        let userId = Number(req.params.id);
        let user = usuarios.find(user => user.id === userId);
        res.send(user);
    }

    static async save (req: Request, res: Response) {
        let user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user);
       
        res.send({
            message:`Usuário ${userSalvo.id} criado com sucesso!`
        });
    }

    static update (req: Request, res: Response) {
        let userId = Number(req.params.id);
        let userBody = req.body;
        let user = usuarios.find(user => user.id === userId);
        
        if(user) {
            user.nome = userBody.nome;
            user.email = userBody.email;
            res.send({
                message:"Usuário atualizado com sucesso!"
            });
        } else {
            res.send({
                message:"usuário não encontrado!"
            });
        }
    }

    static delete (req: Request, res: Response) {
        let userId = Number(req.params.id);
        let userIndex = usuarios.findIndex(user => user.id === userId);
        
        if(userIndex) {
            usuarios.splice(userIndex, 1);
            res.send({
                message: "Usuário excluído com sucesso!"
            });
        }else{
            res.send({
                message: "usuário não encontrado!"
            });
        } 
    }
}