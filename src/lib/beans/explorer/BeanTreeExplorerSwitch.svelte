Show Bean Tree Explorer <input type=checkbox bind:checked={$isVisible} on:change={onVisibleChange}>

<script lang="ts">
	import { selectedInstanceId } from '../jar/helloworld/store';
    import {isVisible} from './BeanTreeExplorer.store';
    const onVisibleChange = (event:Event) => {
        //console.log((<HTMLInputElement>event.target).checked)
        selectedInstanceId.set('');
    } 
</script>