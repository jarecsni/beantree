
<input 
    type="text" 
    on:keydown={onKeyPress}
    on:keyup={onKeyPress}
/>

<script lang="ts">
	import { BackboneService } from "./BackboneService";

    export let stateId:string;
    let text = "";
    const onChange = (e:Event) => {
        console.log(e instanceof Event);
        console.log(e);
    }
    const onKeyPress = (e:KeyboardEvent) => {
        if (e.target.value !== text) {
            BackboneService.getInstance().stateChange(stateId, e.target.value);
        }
        text = e.target.value;
    }
</script>
