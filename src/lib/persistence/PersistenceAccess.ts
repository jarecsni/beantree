import type { insert } from 'svelte/internal'

export type WhereClause = {
    field: string
    op: string
    value: string
}

export interface PersistenceAccess {
    update(id:string, obj:object):Promise<void>
    insert(obj:object, key?:string): Promise<unknown>
    delete(id:string): Promise<void>
    select(callback: (data:object[]) => void, clauses:WhereClause[], orderBy?:string): void
    count(clauses:WhereClause[]): Promise<number>
}