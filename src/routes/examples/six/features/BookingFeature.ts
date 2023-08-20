import { BeanLink } from '../BeanLink';
import type { Counterparty, counterpartyStateChangedEvent } from '../components/counterparty/types';
import { bookDealEvent } from '../components/tiles/types';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    private counterparty?:Counterparty;
    setup(): void {
        BeanLink.registerFeature('App', (context:string, beanLink:BeanLink) => {
            const counterpartyChangedHandler = (event:ReturnType<typeof counterpartyStateChangedEvent>) => {
                console.log('[BookingFeature]', 'counterparty changed', event.payload.value);
                this.counterparty = event.payload.value;
            };
            beanLink.subscribeToEvent('state.change.counterparty', { 
                id: 'BookingFeature', 
                handleEvent: counterpartyChangedHandler
            });
        });
        BeanLink.registerFeature('Tile', (context:string, beanLink:BeanLink) => {
            beanLink.subscribeToEventSource([{event: bookDealEvent.eventType, eventCreator:bookDealEvent}], {
                id: 'BookingFeature',
                handleEvent: (event:ReturnType<typeof bookDealEvent>) => {
                    console.log('[BookingFeature]', 'booking deal...', JSON.stringify(event.payload));
                }
            });
        });
    }
    get name() {
        return 'BookingFeature';
    }
}