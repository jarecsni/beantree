import { BeanLink } from '../BeanLink';
import type { Counterparty, counterpartyStateChangedEvent } from '../components/counterparty/types';
import { bookDealEvent, setBookButtonEnabled } from '../components/tiles/types';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    private counterparty?:Counterparty;
    private beanLinkTileContext?:BeanLink;
    setup(): void {
        BeanLink.registerFeature('App', (context:string, beanLink:BeanLink) => {
            const counterpartyChangedHandler = (event:ReturnType<typeof counterpartyStateChangedEvent>) => {
                console.log('[BookingFeature]', 'counterparty changed', event.payload.value);
                this.counterparty = event.payload.value;
                if (this.beanLinkTileContext) {
                    this.beanLinkTileContext.publishEvent('BookingFeature', setBookButtonEnabled({sourceId:'BookingFeature', enabled: !!this.counterparty}))
                }
            };
            beanLink.subscribeToEvent('state.change.counterparty', { 
                id: 'BookingFeature', 
                handleEvent: counterpartyChangedHandler
            });
        });
        BeanLink.registerFeature('Tile', (context:string, beanLink:BeanLink) => {
            this.beanLinkTileContext = beanLink;
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