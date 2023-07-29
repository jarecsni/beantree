Six

<script lang="ts">
    import { Streamer } from "./datastream/Streamer";
    Streamer.getInstance().initialise();
    Streamer.getInstance().connect('ABC', (symbol:string, number:number) => {
        console.log(symbol, number);
    });
    Streamer.getInstance().connect('EFG', (symbol:string, number:number) => {
        console.log(symbol, number);
    });
    Streamer.getInstance().startStreaming();
    setTimeout(() => {
        console.log('stopping stream');
        Streamer.getInstance().stopStreaming();
    }, 10000);
</script>