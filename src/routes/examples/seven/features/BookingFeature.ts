import { counterpartyChanged } from '../components/counterparty/types';
import { BeanLink, type BeanLinkEventer } from '../beanlink/BeanLink';
import type { Counterparty } from '../components/counterparty/types';
import { bookDeal } from '../components/tiles/types';
import type { Feature } from '../beanlink/Feature';
import { counterpartySpecified } from './store';

export class BookingFeature implements Feature {
    setup(): void {
        BeanLink.registerFeature('App', this.name, (beanLink:BeanLinkEventer) => {
            beanLink.on(counterpartyChanged.name, (event:ReturnType<typeof counterpartyChanged.event>) => {
                counterpartySpecified.update(() => (!!event.value));
            });
        });
        BeanLink.registerFeature('Tile', this.name, (beanLink:BeanLinkEventer) => {
            console.log('registering BookingFeature for tile context');
            beanLink.on(bookDeal, (event:ReturnType<typeof bookDeal.event>) => {
                console.log('[BookingFeature]', 'booking deal...', JSON.stringify(event.value));
            });
        });
    }
    get name() {
        return 'BookingFeature';
    }
}