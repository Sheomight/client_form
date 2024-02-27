<template>
  <div class="input-group">
    <label :for="id" :class="{'error-label': invalid}">
      {{ label }}<span v-if="required">*</span>
    </label>
    <input 
    type="date" 
    :id="id" 
    :value="value"
    @change="$emit('change', $event.target.value)"
    :class="{
      'error-input': invalid
    }"
    >
  </div>
</template>

<script>

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String],
    label: [String, Number],
    id: [String],
    required: [Boolean],
    invalid: [Boolean]
  }
}
</script>