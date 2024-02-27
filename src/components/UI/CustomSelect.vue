<template>
  <div class="input-group">
    <label :for="id" :class="{'error-label': invalid}">
      {{ label }}<span v-if="required">*</span>
    </label>
    <select 
    v-if="multiple"
    :multiple="multiple"
    :id="id" 
    :class="{
      'multi-select': multiple,
      'error-input': invalid
    }"
    :value="value"
    @change="$emit('change', selected)"
    v-model="selected"
    >
      <option 
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      >
      {{ option.text }}
      </option>
    </select>

    <select 
    v-else
    :id="id" 
    :value="value"
    :class="{
      'error-input': invalid
    }"
    @change="$emit('change', $event.target.value)"
    >
      <option v-if="!multiple" value="" disabled>--- Не выбрано ---</option>
      <option 
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      >
      {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      default: null
    },
    id: [String],
    label: [String, Number],
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    required: [Boolean],
    invalid: [Boolean]
  },
  data() {
    return {
      selected: []
    }
  },
  watch: {
    value() {
      this.selected = this.value
    }
  }
}
</script>