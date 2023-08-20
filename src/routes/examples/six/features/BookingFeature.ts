import { BeanLink } from '../BeanLink';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    setup(): void {
        BeanLink.registerFeature('TilesContainer', this);
        BeanLink.registerFeature('Tile', this);
        BeanLink.registerFeature('App', this);
    }
    init(context: string, beanLink: BeanLink): void {
        console.log(this.name, 'init', context);        
    }
    get name() {
        return 'BookingFeature';
    }
}