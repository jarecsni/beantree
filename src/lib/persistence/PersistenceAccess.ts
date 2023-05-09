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
    select(callback: (data:object[]) => void, clauses:WhereClause[], orderBy?:string): void
    count(clauses:WhereClause[]): Promise<number>
}