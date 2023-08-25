
<div class="label-container">
    <div class="label">
        <Label>{price}</Label>
    </div>
    {#if arrow}
        <Icon class="material-icons">{arrow}</Icon>
    {/if}
</div>

<script lang="ts">
    import { Icon, Label } from '@smui/common';
	import { BeanLink } from '../../BeanLink';
	import { priceLabelSetValue as _priceLabelSetValue} from './types';

    export let priceLabelSetValue = _priceLabelSetValue;

    let price = 0;
    let arrow:string;

    const { beanLink } = BeanLink.getInstance();

    beanLink.on(priceLabelSetValue.name, 
        (event:ReturnType<typeof priceLabelSetValue.event>) => {
            if (event.value > price) {
                arrow = 'arrow_upward';
            } else if (event.value < price) {
                arrow = 'arrow_downward';
            } else {
                arrow = '360';
            }
            price = event.value;            
    });

</script>

<style>
    .label-container {
        display: flex;
    }
    .label {
        font-size: 1.5em;
    }
</style>