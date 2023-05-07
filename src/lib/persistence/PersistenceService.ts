import { FirebaseAccess } from './FirebaseAccess';

export class PersistenceService {
    private static instance: PersistenceService;
    static getInstance():PersistenceService {
        if (!PersistenceService.instance) {
            PersistenceService.instance = new PersistenceService();
        }
        return PersistenceService.instance;
    }
    private constructor() {

    }
    public getDataAccessObjectFor(collection: string) {
        // TODO this can be made configurable - not urgent though
        return new FirebaseAccess(collection);
    }
}