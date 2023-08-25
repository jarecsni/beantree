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
	import { counterpartyChanged as _counterpartyChanged} from './types';

    const { beanLink } = BeanLink.getInstance();
    export let counterpartyChanged = _counterpartyChanged;

    export let selectedCounterparty:Counterparty;
    export let counterparties:Counterparty[] = [];
    
    $: {
        beanLink.publish(counterpartyChanged.event(selectedCounterparty));
    }
</script>
