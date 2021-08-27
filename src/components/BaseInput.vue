<template>
    <div>
        <label v-if="label">{{label}}</label>
        <input type="text" :value="value" @input="updateValue" v-bind="$attrs">
    </div>
</template>

<script>
import { formFieldMixins } from "../mixins/formFieldMixins"
export default {
    mixins:[formFieldMixins],
    methods:{
        updateValue(event)
        {
            this.$emit('input-entered',event.target.value)
        }
    }
}
</script>