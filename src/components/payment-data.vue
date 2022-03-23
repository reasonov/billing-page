<template>

  <div class="payment-data">
    <h3 class="payment-title">Реквизиты организации</h3>

    <div class="sum-block">
      <p class="sum__text">К оплате:</p>
      <p class="sum__number">{{ currentPrice }} ₽</p>
    </div>

    <div class="inn">
      <div class="input-wrapper">
        <label for="inn__input1">Инн юридического лица</label>
        <input
            class="main-input"
            id="inn__input1"
            type="text"
            placeholder="0000 0000 0000"
            v-model="paymentData.inn"
        >
      </div>
      <button class="inn__search">Найти по номеру</button>
    </div>

    <div class="input-wrapper input-wrapper1">
      <label for="inn__input2">Название организации</label>
      <input
          class="main-input"
          id="inn__input2"
          type="text"
          placeholder="Укажите название вашей организации"
          v-model="paymentData.name"
      >
    </div>

    <div class="input-wrapper">
      <label for="inn__input3">Юридический адрес</label>
      <input
          class="main-input"
          id="inn__input3"
          type="text"
          placeholder="Укажите юридический адрес"
          v-model="paymentData.address"
      >
    </div>
  </div>

</template>

<script>
import { reactive, watch } from "vue";

export default {
  name: "payment-data",
  props: {
    currentPrice: {
      type: String,
      required: true
    }
  },
  emits: ['updatePaymentData'],
  setup(props, { emit }) {

    const paymentData = reactive({
      inn: '',
      name: '',
      address: ''
    })

    watch(paymentData, () => {
      emit('updatePaymentData', paymentData);
    }, {deep: true})

    return { paymentData }
  }
}
</script>

<style scoped>

.input-wrapper1 {
  margin-bottom: 25px;
}

#inn__input1 {
  width: 336px;
}

.inn__search {
  width: 180px;
  min-width: 180px;
  height: 48px;

  border: 1.7px solid #FFC549;
  box-sizing: border-box;
  border-radius: 12px;

  font-size: 16px;
}

.inn__search:hover {
  border: none;
  background-color: #FED47A;
}

.inn__search:active {
  border: none;
  background-color: #F0F3F8;
}

.main-input {
  width: 100%;
  height: 48px;
  padding-left: 20px;
  margin-top: 5px;

  border-radius: 12px;
  box-sizing: border-box;

  background: #F6F9FC;
}

label {
  font-size: 14px;
  color: #6D6D6D;
}

.inn {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding-bottom: 40px;
  margin-bottom: 100px;

  border-bottom: 1px solid #EFF0F0;
}

.sum__number {
  font-size: 32px;
  letter-spacing: -2.5px;
  color: #1E2022;
}

.sum__text {
  font-size: 20px;
}

.sum-block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 0 20px;
  margin-bottom: 35px;

  border-radius: 12px;

  background-color: #F6F9FC;
}

.payment-title {
  margin-bottom: 35px;

  font-size: 20px;
  color: #1E2022;
}
</style>