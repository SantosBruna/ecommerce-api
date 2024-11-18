import { NotFoundError } from "../errors/not-found.error";
import { Category } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";


export class CategoryService {

    private categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }

    async getById(categoryId: string): Promise<Category> {
        const category = await this.categoryRepository.getById(categoryId);
        if(!category){
            throw new NotFoundError("Categoria não encontrado!");
        }
        return category;
    }

    async save(categoryBody: Category): Promise<void> {
        await this.categoryRepository.update(categoryBody);
    }

    async update(categoryId: string, categoryBody: Category): Promise<void> {
        const _category = await this.getById(categoryId);

        _category.descricao = categoryBody.descricao;
        _category.ativa = categoryBody.ativa;

        await this.categoryRepository.update(_category);
    }

    async delete(categoryId: string): Promise<void> {
        await this.categoryRepository.delete(categoryId);
    }
}