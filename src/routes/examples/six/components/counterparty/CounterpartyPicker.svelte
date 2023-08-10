<Autocomplete
    options={counterparties}
    bind:value={selectedCounterparty}
    label="Counterparty"
    getOptionLabel={(option) =>
        option ? `${option.label} (${option.id})` : ''}
/>

<script lang="ts">
    import Autocomplete from '@smui-extra/autocomplete';
	import type { Counterparty } from '../../services/CounterpartyService';
	import { getContext } from 'svelte';
	import { createEventDefinition } from 'ts-bus';
	import type { BeanLink } from '../../BeanLink';
	import { counterpartyStateChangedEvent } from './types';
    export let id = '';

    const beanLink:BeanLink = getContext('beanlink');

    export let selectedCounterparty:Counterparty;
    export let counterparties:Counterparty[] = [];
    
    $: {
        beanLink.publishEvent(id, counterpartyStateChangedEvent({name: 'counterparty', value: selectedCounterparty}));
    }
</script>
