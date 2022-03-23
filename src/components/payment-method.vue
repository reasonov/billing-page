<template>
  <div class="payment-method">
    <button class="payment__close"></button>

    <h3 class="payment-title">Выбор способа оплаты</h3>

    <div class="sum-block">
      <p class="sum__text">К оплате:</p>
      <p class="sum__number">{{ currentPrice }} ₽</p>
    </div>

    <div class="payment-partner">
      <img src="../assets/img/u-kassa.png" alt="partner-image">
      <p class="partner__text">
        Платеж осуществляется через посредника ЮКаssа, что гарантирует полную сохранность ваших данных.
      </p>
    </div>

    <div class="payment-method">
      <button :class="['method__item', {'method--active': activeMethod === 1}]" @click="selectMethod(1)">Оплата картой онлайн</button>
      <button
          :class="['method__item', {'method--active': activeMethod === 2}]"
          @click="selectMethod(2)"
      >
        Выставить мне счет на оплату
      </button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "payment-method",
  props: {
    paymentMethod: {
      type: Number,
      default: 0
    },
    currentPrice: {
      type: String,
      required: true
    }
  },
  emits: ['newMethod'],
  setup(props, { emit }) {

    const activeMethod = ref(0);

    function selectMethod(index) {
      activeMethod.value = index;
      emit('newMethod', index);
    }

    function updateMethod() {
      activeMethod.value = props.paymentMethod;
    }
    updateMethod();

    return { activeMethod, selectMethod }
  }
}
</script>

<style scoped>

.method__item {
  width: 100%;
  height: 80px;
  margin-bottom: 15px;

  border-radius: 12px;

  font-size: 20px;
  font-weight: 600;
  color: #1E2022;

  background-color: #F6F9FC;
}

.method__item:hover {
  background-color: #FED47A;
}

.method__item:active {
  background-color: #F0F3F8;
}

.method--active {
  border: 1.7px solid #FFC549;
  background-color: #fff;
}

.payment-method {
  margin-bottom: 130px;
}

.partner__text {
  max-width: 321px;

  font-size: 14px;
  line-height: 24px;
}

.payment-partner {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 55px;
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