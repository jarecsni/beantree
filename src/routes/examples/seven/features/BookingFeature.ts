import { counterpartyChanged } from '../components/counterparty/types';
import { BeanLink, type BeanLinkEventer } from '../BeanLink';
import type { Counterparty } from '../components/counterparty/types';
import { bookDeal, setBookButtonEnabled, tileCreated } from '../components/tiles/types';
import type { Feature } from './Feature';

export class BookingFeature implements Feature {
    private counterparty?:Counterparty;
    private beanLinkTileContext?:BeanLinkEventer;
    setup(): void {
        BeanLink.registerFeature('App', this.name, (beanLink:BeanLinkEventer) => {
            beanLink.on(counterpartyChanged.name, (event:ReturnType<typeof counterpartyChanged.event>) => {
                this.counterparty = event.value;
                if (this.beanLinkTileContext) {
                    this.beanLinkTileContext.publish(setBookButtonEnabled.event(!!this.counterparty));
                }
            });
        });
        BeanLink.registerFeature('Tile', this.name, (beanLink:BeanLinkEventer) => {
            this.beanLinkTileContext = beanLink;
            console.log('registering BookingFeature for tile context');
            beanLink.on(bookDeal, (event:ReturnType<typeof bookDeal.event>) => {
                console.log('[BookingFeature]', 'booking deal...', JSON.stringify(event.value));
            });
            beanLink.on(tileCreated, (event:ReturnType<typeof tileCreated.event>) => {
                if (this.beanLinkTileContext) {
                    this.beanLinkTileContext.publish(setBookButtonEnabled.event(!!this.counterparty));
                }
            })
        });
    }
    get name() {
        return 'BookingFeature';
    }
}