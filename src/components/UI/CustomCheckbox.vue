<template>
  <div class="input-group input-group-checkbox">
    <label :for="id" class="checkbox">
      <input type="checkbox" :checked="checked" :id="id" @change="$emit('change', $event.target.checked)">
      <div class="checkbox__checkmark"></div>
      <div class="checkbox__body">{{ label }}</div>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      required: true
    },
    id: [String]
  }
}
</script>