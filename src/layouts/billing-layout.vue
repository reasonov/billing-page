<template>
  <div class="rate-page">
    <h2 class="rate__title">Выберите подходящий Вам тариф qoob.store</h2>
    <div class="rate__info info">
      <p class="info__date">Лицензия Вашего аккаунта окончена 24.12.2021</p>
      <p class="info__rate">Тариф: <b>“Стандарт”</b></p>
      <p class="info__days">6 дней назад</p>
    </div>
    <p class="rate__recommendation">Рекомендуем вам опробовать тариф <b>“Базовый”</b></p>

    <ul class="card-list">
      <li v-for="(item, index) in cardList" :key="index" :style="'order: ' + orderList[index] + ';'">
        <card-component
            :parentData="item"
            :parentTimer="isTimer"
            :index="index"
            @selectTariff="selectTariff($event)"
        />
      </li>
    </ul>

  </div>
</template>

<script>
import cardComponent from '../components/card-component';
import { cardList } from '../data/cardList.json';
import {ref, reactive} from "vue";

export default {
  name: 'App',
  components: {
    cardComponent: cardComponent
  },
  emits: ['selectTariff'],
  setup(props, { emit }) {

    const isTimer = ref(null);

    function checkTimer() {
      cardList.forEach((item, index) => {
        if(item.timer) {
          isTimer.value = index;
        }
      })
    }

    checkTimer();

    const orderList = reactive([
      1, 2, 3
    ])

    function order () {
      if(isTimer.value === 0) {
        return;
      } else if(isTimer.value === 1) {
        orderList[0] = 2;
        orderList[1] = 1;
      } else if(isTimer.value === 2) {
        orderList[0] = 2;
        orderList[1] = 3;
        orderList[2] = 1;
      }
    }

    order();

    function selectTariff(index) {
      emit('selectTariff', cardList[index]);
    }

    return { cardList, isTimer, orderList, selectTariff };
  }
}
</script>

