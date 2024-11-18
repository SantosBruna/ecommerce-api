import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from "../models/category.model";

export class CategoryRepository {

    private collection: CollectionReference;

    constructor(){
        this.collection =  getFirestore().collection("categories");
    }

    async getAll():Promise<Category[]>{
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc =>{
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Category[];
    }

    async getById(id: string): Promise<Category | null>{
        const category = await this.collection.doc(id).get();
        if(category.exists) {
            return {
                id: category.id,
                ...category.data()
            } as Category;
        } else {
            return null;
        }
    }

    async save(categoryBody: Category){
        try {
            await this.collection.add(categoryBody);
        } catch (error) {
            const typedError = error as Error; 
            console.error('Erro ao salvar a categoria:', typedError.message);
            throw new Error('Erro ao salvar a categoria: ' + typedError.message);
        }
    }

    async update(category: Category): Promise<void>{
        try {
            let docRef = this.collection.doc(category.id!);
            delete category.id;
            await docRef.set({
                nome: category.descricao,
                email: category.ativa
            });
        } catch (error) {
            const typedError = error as Error; 
            console.error('Erro ao atualizar a categoria:', typedError.message);
            throw new Error('Erro ao atualizar a categoria: ' + typedError.message);
        }

    }

    async delete (id: string): Promise<void>{
        await this.collection.doc(id).delete();
    }
}