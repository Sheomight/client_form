<template>
  <div class="modal" v-if="show" @click="hideModal()">
    <div>
      <h2>Новый пользователь успешно добавлен</h2>
      <button @click="hideModal">Отлично</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      defaul: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    }
  }
}
</script>


<style lang="scss">
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;

  & div {
    text-align: center;
    margin: auto;
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
  }
  
  & button {
    min-width: 150px;
    max-width: 300px;
    padding: 0 15px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }
}
</style>