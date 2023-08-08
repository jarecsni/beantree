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
	import type { BeanLink } from '../../BeanLink';
	import { getContext } from 'svelte';
	import { createEventDefinition } from 'ts-bus';
    export let id = '';

    const counterpartyChangedEvent = createEventDefinition<{counterparty: Counterparty}>()('counterpartyChanged');

    const beanLink:BeanLink = getContext('beanlink');

    export let selectedCounterparty:Counterparty;
    export let counterparties:Counterparty[] = [];
    $: {
        beanLink.publishEvent(id, counterpartyChangedEvent({counterparty: selectedCounterparty}));
    }
</script>
