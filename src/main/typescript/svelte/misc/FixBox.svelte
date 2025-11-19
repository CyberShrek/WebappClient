<script lang="ts">

    import { fade } from 'svelte/transition'

    export let
        framed: boolean = false,
        xAlign: "start" | "end" | "center" = "center",
        yAlign: "start" | "end" | "center" = "center"

</script>

<div class="fix x-{xAlign} y-{yAlign}"
     class:framed
     transition:fade>

    <slot/>
</div>

<style>
    .fix {
        display: flex;
        opacity: 0.8;
        position: fixed;
        z-index: 64;
        box-shadow: var(--shadow);
        transition:  opacity 0.3s;
        width: min-content;
    }
    .fix:hover {
        opacity: 1;
    }
    .fix.y-start { top:  var(--strong-indent);  }
    .fix.y-end   { bottom: var(--strong-indent);}
    .fix.y-center{ top: 50%; transform: translateY(-50%);}
    .fix.x-start { left: var(--strong-indent);  }
    .fix.x-end   { right: var(--strong-indent); }
    .fix.x-center{ left: 50%; transform: translateX(-50%);}

    .fix.framed {
        flex-wrap: wrap;
        color: var(--accent-color);
        padding: var(--indent);
        background: var(--secondary-color);
        border: 5px solid var(--accent-color);
        border-radius: var(--border-radius);
    }
</style>