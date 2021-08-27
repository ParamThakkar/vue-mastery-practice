<template>
    <div>
        <button v-bind="$attrs">
            <slot />
        </button>
    </div>
</template>

<script>
export default {
    inheritAttrs:false 
}
</script>