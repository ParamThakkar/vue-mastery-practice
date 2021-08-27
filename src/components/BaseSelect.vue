<template>
  <div>
    <label v-if="label">{{label}}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected = "option == value"
      >{{option}}</option>
    </select>
  </div>
</template>

<script>
import { formFieldMixins } from "../mixins/formFieldMixins"
export default {
  mixins:[formFieldMixins],
  props: {
    options: {
        type: Array,
        required : true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input-selected', event.target.value)
    },
  },
}
</script>