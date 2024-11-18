import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";


export class UsersService {

    private userRepository: UserRepository;
    private authService: AuthService;

    constructor(){
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(userId: string): Promise<User> {
        const user = await this.userRepository.getById(userId);
        if(!user){
            throw new NotFoundError("Usuário não encontrado!");
        }
        return user;
    }

    async save(userBody: User): Promise<void> {
        const userAuth = await this.authService.create(userBody);
        userBody.id = userAuth.uid;
        await this.userRepository.update(userBody);
    }

    async update(userId: string, userBody: User): Promise<void> {
        const _user = await this.getById(userId);

        _user.nome = userBody.nome;
        _user.email = userBody.email;

        await this.authService.update(userId, userBody);
        await this.userRepository.update(_user);
    }

    async delete(userId: string): Promise<void> {
        await this.authService.delete(userId);
        await this.userRepository.delete(userId);
    }
}