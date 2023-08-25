import type { counterpartyChanged } from '../components/counterparty/types';
import { BeanLink, type BeanLinkEventer } from '../BeanLink';
import type { Counterparty } from '../components/counterparty/types';
import { bookDealEvent, setBookButtonEnabled } from '../components/tiles/types';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    private counterparty?:Counterparty;
    private beanLinkTileContext?:BeanLinkEventer;
    setup(): void {
        BeanLink.registerFeature('App', this.name, (beanLink:BeanLinkEventer) => {
            beanLink.on('counterparty', (event:ReturnType<typeof counterpartyChanged>) => {
                this.counterparty = event.value;
                if (this.beanLinkTileContext) {
                    this.beanLinkTileContext.publish(setBookButtonEnabled('setBookButtonEnabled', !!this.counterparty));
                }
            });
        });
        BeanLink.registerFeature('Tile', this.name, (beanLink:BeanLinkEventer) => {
            this.beanLinkTileContext = beanLink;
            console.log('registering BookingFeature for tile context');
            beanLink.on('bookDeal', (event:ReturnType<typeof bookDealEvent>) => {
                console.log('[BookingFeature]', 'booking deal...', JSON.stringify(event.value));
            });
        });
    }
    get name() {
        return 'BookingFeature';
    }
}