import { counterpartyChanged } from '../components/counterparty/types';
import { BeanLink } from '../beanlink/BeanLink';
import { bookDeal } from '../components/tiles/types';
import type { Feature } from '../beanlink/Feature';
import { counterpartySpecified } from './store';

export class BookingFeature implements Feature {
    private counterpartyListener;
    private bookDealListener;
    constructor() {
        this.counterpartyListener = (event:ReturnType<typeof counterpartyChanged.event>) => {
            counterpartySpecified.update(() => (!!event.value));
        };
        this.bookDealListener = (event:ReturnType<typeof bookDeal.event>) => {
            console.log('[BookingFeature]', 'booking deal...', JSON.stringify(event.value));
        }
    }

    setup():void {        
        BeanLink.registerFeature('App', this.name, (beanLink:BeanLink) => {
            beanLink.on(counterpartyChanged.name, this.counterpartyListener);
        });
        BeanLink.registerFeature('Tile', this.name, (beanLink:BeanLink) => {
            console.log('registering BookingFeature for tile context');
            beanLink.on(bookDeal, this.bookDealListener);
        });
    }
    get name() {
        return 'BookingFeature';
    }
}