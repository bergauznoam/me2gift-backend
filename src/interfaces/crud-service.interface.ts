import { Repository } from "typeorm";

export interface ICRUDFilters<T> {

}

export type Constructor<T> = new (...args: any[]) => T;

export interface ICRUDService<T> {
    readonly repository: Repository<T>;
    get(filter?: ICRUDFilters<T>): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(createRequest: Record<string, any>): Promise<T>;
    update(id: string, updateRequest: Record<string, any>): Promise<T>;
    delete(id: string): Promise<void>;
}