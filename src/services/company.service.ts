import { NotFoundError } from "../errors/not-found.error";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";


export class CompanyService {

    private companyRepository: CompanyRepository;

    constructor(){
        this.companyRepository = new CompanyRepository();
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    async getById(companyId: string): Promise<Company> {
        const company = await this.companyRepository.getById(companyId);
        if(!company){
            throw new NotFoundError("Empresa não encontrada!");
        }
        return company;
    }

    async save(companyBody: Company): Promise<void> {
        await this.companyRepository.save(companyBody);
    }

    async update(companyId: string, companyBody: Company): Promise<void> {
        const _company = await this.getById(companyId);
    
        _company.logomarca = companyBody.logomarca;
        _company.cpfCnpj = companyBody.cpfCnpj;
        _company.razaoSocial = companyBody.razaoSocial;
        _company.nomeFantasia = companyBody.nomeFantasia;
        _company.telefone = companyBody.telefone;
        _company.horarioFuncionamento = companyBody.horarioFuncionamento;
        _company.endereco = companyBody.endereco;
        _company.localizacao = companyBody.localizacao;
        _company.taxaEntrega = companyBody.taxaEntrega;
        _company.ativa = companyBody.ativa;

        await this.companyRepository.update(_company);
    }
}