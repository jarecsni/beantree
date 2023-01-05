import { BeanRegistry } from '$lib/beans/BeanRegistry';

// Enumerate Beans in your app here (yeah I know IOC container with auto discovery of these would be nice, yeah thanks JS :D)
import * as HelloWorldMeta from '$lib/beans/jar/helloworld/meta';
import * as SlotContainerMeta from '$lib/beans/jar/slotcontainer/meta';
import * as StringBeanMeta from '$lib/beans/jar/stringbean/meta';

export const init = () => {
    console.log('initialising application');
    BeanRegistry.getInstance().registerBean(HelloWorldMeta.getMetaInfo());
    BeanRegistry.getInstance().registerBean(SlotContainerMeta.getMetaInfo());
    BeanRegistry.getInstance().registerBean(StringBeanMeta.getMetaInfo());
}