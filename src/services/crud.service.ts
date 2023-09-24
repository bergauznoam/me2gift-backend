import { Type } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";

import { BaseModel } from "@models/_base.model";
import { Constructor, ICRUDFilters, ICRUDService } from "@interfaces/crud-service.interface";
import { InvalidIdError } from "@root/exceptions";

export function CRUDService<BaseModel>(entity: Constructor<BaseModel>): Type<ICRUDService<BaseModel>> {
    class CRUDServiceImpl implements ICRUDService<BaseModel> {
        @InjectRepository(entity) public readonly repository: Repository<BaseModel>

        public get(filter?: ICRUDFilters<BaseModel>): Promise<BaseModel[]> {
            return this.repository.find();
        }

        public async getById(id: string): Promise<BaseModel> {
            const model = await this.repository.findOne({ where: { id: +id } } as unknown as FindOneOptions<BaseModel>);
            if (!model) {
                throw new InvalidIdError();
            }
            return model;
        }

        public async delete(id: string): Promise<void> {
            const model = await this.getById(id);
            await this.repository.delete(model as any);
        }

        public create: (createRequest: Record<string, any>) => Promise<BaseModel>;
        public update: (id: string, updateRequest: Record<string, any>) => Promise<BaseModel>;
    }
    return CRUDServiceImpl;
}