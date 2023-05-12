import type { DocumentReference, FieldPath } from 'firebase/firestore';

export type WhereClause = {
    field: string|FieldPath
    op: string
    value: unknown
}

export interface PersistenceAccess {
    update(id:string, obj:object):Promise<void>
    insert(obj:object, key?:string): Promise<unknown>
    delete(id:string): Promise<void>
    select(clauses:WhereClause[], orderBy?:string): Promise<unknown[]>
    count(clauses:WhereClause[]): Promise<number>
}