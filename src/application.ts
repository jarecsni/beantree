import { BeanRegistry } from '$lib/beans/BeanRegistry';

// Enumerate Beans in your app here (yeah I know IOC container with auto discovery of these would be nice, yeah thanks JS :D)
import * as HelloWorldMeta from '$lib/beans/jar/helloworld/meta';
import * as SlotContainerMeta from '$lib/beans/jar/slotcontainer/meta';
import * as StringBeanMeta from '$lib/beans/jar/stringbean/meta';
import type { FirebaseAccess } from '$lib/persistence/FirebaseAccess';
import type { PersistenceAccess } from '$lib/persistence/PersistenceAccess';
import { PersistenceService } from '$lib/persistence/PersistenceService';

export const init = () => {
    console.log('initialising application');
    BeanRegistry.getInstance().registerBean(HelloWorldMeta.getMetaInfo());
    BeanRegistry.getInstance().registerBean(SlotContainerMeta.getMetaInfo());
    BeanRegistry.getInstance().registerBean(StringBeanMeta.getMetaInfo());
    console.log('Starting persistence service');
    const dao:PersistenceAccess = PersistenceService.getInstance().getDataAccessObjectFor('tree');
    dao.insert({json: JSON.stringify({})}, 'beantree-main');
}