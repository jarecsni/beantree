import { BeanLink } from '../BeanLink';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    setup(): void {
        BeanLink.registerFeature('App', (context:string, beanLink:BeanLink) => {
            console.log('initialising context for booking feature', context);
        });
    }
    get name() {
        return 'BookingFeature';
    }
}