<div>
    <EventButton 
        {id} 
        label={eventLabel} 
        event={eventProduced}
        on:click={()=>{beanLink.publishEvent(id, eventProduced({}))}}
    />
</div>

<script lang="ts">
	import type { BusEvent, EventCreatorFn } from 'ts-bus/types';
	import { BeanLink, type EventSource } from '../../BeanLink';
    import EventButton from '../button/EventButton.svelte';

    export let id:string;
    export let eventConsumed:EventSource;
    export let eventProduced:EventCreatorFn<BusEvent>;
    const beanLink = BeanLink.getInstanceInContext();
    
    const event = eventProduced({});
    const eventLabel = 'Produce event ' + event.type

    beanLink.subscribeToEventSource(eventConsumed, { id, handleEvent: (e) => {
            beanLink.publishEvent(id, event, self);
        }
    });
</script>