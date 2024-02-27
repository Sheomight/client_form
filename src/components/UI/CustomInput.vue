<template>
  <div class="input-group">
    <label :for="id" :class="{'error-label': invalid}">
      {{ label }}<span v-if="required">*</span>
    </label>
    <input 
    :type="type" 
    :id="id" 
    :maxlength="maxlength"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :class="{
      'error-input': invalid
    }"
    >
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    label: [String, Number],
    id: [String],
    required: [Boolean],
    type: {
      type: String,
      default: 'text'
    },
    maxlength: [Number],
    placeholder: [String],
    invalid: [Boolean],
    value: [String, Number],
  }
}
</script>