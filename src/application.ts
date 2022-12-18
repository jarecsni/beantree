import { BeanRegistry } from '$lib/beans/BeanRegistry';
import * as HelloWorldMeta from '$lib/beans/jar/helloworld/meta';

export const init = () => {
    console.log('initialising application');
    BeanRegistry.getInstance().registerBean('helloworld', HelloWorldMeta.getMetaInfo());
}