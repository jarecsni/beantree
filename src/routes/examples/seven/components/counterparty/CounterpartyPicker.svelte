<Autocomplete
    options={counterparties}
    bind:value={selectedCounterparty}
    label="Counterparty"
    getOptionLabel={(option) =>
        option ? `${option.label} (${option.id})` : ''}
/>

<script lang="ts">
    import Autocomplete from '@smui-extra/autocomplete';
	import type { Counterparty } from '../counterparty/types';
	import { BeanLink, createEvent } from '../../BeanLink';
	import { counterpartyChanged } from './types';
    export let stateName = 'counterparty';

    const { beanLink } = BeanLink.getInstance();

    export let selectedCounterparty:Counterparty;
    export let counterparties:Counterparty[] = [];
    
    $: {
        beanLink.publish(counterpartyChanged(stateName, selectedCounterparty));
    }
</script>
