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
    export let id = '';

    const beanLink:BeanLink = getContext('beanlink');

    export let selectedCounterparty:Counterparty;
    export let counterparties:Counterparty[] = [];
    $: {
        beanLink.publishEvent(id, 'counterpartyChanged', {counterparty: selectedCounterparty})
    }
</script>
