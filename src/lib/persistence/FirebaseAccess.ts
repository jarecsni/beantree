import { initializeApp } from 'firebase/app';
import { getFirestore, collection, CollectionReference, type DocumentData, doc, updateDoc, addDoc, deleteDoc, onSnapshot, orderBy, query, where, getDocs, setDoc } from "firebase/firestore";
import type { WhereFilterOp } from 'firebase/firestore';
import type { PersistenceAccess, WhereClause } from './PersistenceAccess';
import firebaseConfig from './firebase-config.json'


export class FirebaseAccess implements PersistenceAccess {
    static app = initializeApp(firebaseConfig);
    static db = getFirestore(FirebaseAccess.app);
    dbRef:CollectionReference<DocumentData>;
    collectionName: string;
    constructor(collectionName:string) {
        this.collectionName = collectionName;
        this.dbRef = collection(FirebaseAccess.db, collectionName);
    }
    getDocRef(id:string) {
        return doc(FirebaseAccess.db, this.collectionName, id);
    }
    update(id: string, obj: object): Promise<void> {
        return updateDoc(doc(FirebaseAccess.db, this.collectionName, id), obj);
    }
    insert(obj: object, key?:string): Promise<unknown> {
        return key? setDoc(doc(FirebaseAccess.db, this.collectionName, key || ''), obj) : addDoc(this.dbRef, obj);
    }
    delete(id: string): Promise<void> {
        return deleteDoc(doc(FirebaseAccess.db, this.collectionName, id));
    }
    async select(clauses: WhereClause[], order?: string): Promise<unknown[]> {
        let whereClauses = [];
        clauses.forEach(clause => {
            whereClauses.push(where(clause.field, (clause.op as WhereFilterOp), clause.value));
        })
        let queryFn = order ? 
            query(this.dbRef, ...whereClauses, orderBy(order)) : 
            query(this.dbRef, ...whereClauses);
        
        return new Promise((resolve, reject) => {
            onSnapshot(queryFn, (querySnapshot) => {
                let objects:unknown[] = [];
                console.log('onSnapshot')
                querySnapshot.forEach((doc) => {
                    console.log('record found', doc.id);
                    objects.push({ ...doc.data(), id: doc.id });
                });
                resolve(objects);
            });
        });
    }
    async count(clauses: WhereClause[]): Promise<number> {
        let whereClauses = [];
        clauses.forEach(clause => {
            whereClauses.push(where(clause.field, (clause.op as WhereFilterOp), clause.value));
        })
        let queryFn = query(this.dbRef, ...whereClauses);
        let countPromise = await getDocs(queryFn);
        return countPromise.size;
    }
}