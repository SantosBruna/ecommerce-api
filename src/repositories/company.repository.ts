import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.model";

export class CompanyRepository {

    private collection: CollectionReference;

    constructor(){
        this.collection =  getFirestore().collection("companies");
    }

    async getAll():Promise<Company[]>{
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc =>{
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Company[];
    }

    async getById(id: string): Promise<Company | null>{
        const company = await this.collection.doc(id).get();
        if(company.exists) {
            return {
                id: company.id,
                ...company.data()
            } as Company;
        } else {
            return null;
        }
    }

    async save(companyBody: Company){
        try {
            await this.collection.add(companyBody);
        } catch (error) {
            const typedError = error as Error; 
            console.error('Erro ao salvar a empresa:', typedError.message);
            throw new Error('Erro ao salvar a empresa: ' + typedError.message);
        }  
    }

    async update(company: Company): Promise<void> {
        try {
            let docRef = this.collection.doc(company.id!);
            delete company.id;
            await docRef.set(company, { merge: true }); 
        } catch (error) {
            const typedError = error as Error; 
            console.error('Erro ao atualizar a empresa:', typedError.message);
            throw new Error('Erro ao atualizar a empresa: ' + typedError.message);
        }
    }
    
    
}