<script lang="ts">

    import {blur} from "svelte/transition"

    export let
        image,
        hint: string = "",
        size: "auto"
            | "small"
            | "medium"
            | "large"
            = "auto"
</script>

<img src={image}
     title={hint}
     class={size}
     alt=""
     transition:blur/>

<style>

    img.auto {
        width: 100%;
    }

    img.auto {
        height: max-content;
    }

    img.small {
        height: 20px;
        width: 20px;
    }

    img.medium {
        height: 25px;
        width: 25px;
    }

    img.large {
        height: 35px;
        width: 35px;
    }
</style>