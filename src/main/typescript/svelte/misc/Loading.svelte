<script lang="ts">

    import {fade} from "svelte/transition"

</script>

<div class="loader"
     in:fade>
    <svg class="circular-loader" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="2"/>
    </svg>
</div>

<style>

    .loader {
        height: 2em;
        width: 2em;
    }

    .loader-path {
        fill: none;
        stroke: var(--primary-color);
        stroke-width: 10%;
        stroke-linecap: round;
        animation: animate-stroke 1.5s ease-in-out infinite;
    }

    .circular-loader {
        animation: rotate 2s linear infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes animate-stroke {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124;
        }
    }
</style>