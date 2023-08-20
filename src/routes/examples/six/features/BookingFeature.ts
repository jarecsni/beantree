import { BeanLink } from '../BeanLink';
import type { counterpartyStateChangedEvent } from '../components/counterparty/types';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    setup(): void {
        BeanLink.registerFeature('App', (context:string, beanLink:BeanLink) => {
            const counterpartyChangedHandler = (event:ReturnType<typeof counterpartyStateChangedEvent>) => {
                console.log('[BookingFeature]', 'counterparty changed', event.payload.value);
            };
            beanLink.subscribeToEvent('state.change.counterparty', { 
                id: 'cptyEventHandler', handleEvent: counterpartyChangedHandler
            });
        });
    }
    get name() {
        return 'BookingFeature';
    }
}