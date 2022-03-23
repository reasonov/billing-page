<template>
  <article :class="['card', {'card--disabled': parentTimer != index && parentTimer}]">
    <div class="card__header">
      <h3 class="card__title">{{ parentData.name }}</h3>
      <div class="card__days">
        <p>{{ parentData.days }}</p>
        <span>дней</span>
      </div>

      <div class="card__sale" v-show="parentData.sale">
        <p class="sale__text">сэкономьте</p>
        <p class="sale__number">{{ parentData.sale }}%</p>
      </div>

      <div class="card__timer" v-show="parentData.timer">
        <card-timer-icon />
        <p class="timer__text">
          {{ timerValue.day }} дн.
          {{ timerValue.hours }} ч.
          {{ timerValue.minutes }} мин.
        </p>
      </div>
    </div>

    <ul :class="['card__list', {'card__list--last': parentData.timer}]">
      <li class="card__item" v-for="(item, index) in parentData.list" :key="index">

        <cardItemIcon v-show="parentData.name != 'Персональный'" />

        <p
            :class="[
                'card__text',
                {'text--bold': parentData.timer && index === 0}
            ]"
        >
          {{ item }}

          <b class="card__text--blue" v-show="parentData.blueText && index === 1">
            {{ parentData.blueText }}
          </b>
          <b class="card__text--price" v-show="parentData.lastPrice && index === 1">
            {{ parentData.lastPrice }} ₽
          </b>
        </p>

      </li>

    </ul>

    <div class="card__price">
      <p>{{ parentData.price }} ₽</p>
    </div>

    <button class="card__submit" @click="selectTariff">Выбрать</button>
  </article>
</template>

<script>
import cardItemIcon from './icons/card-item-icon';
import cardTimerIcon from './icons/card-timer-icon';
import { reactive } from 'vue';

export default {
  name: "card-component",
  components: {
    cardItemIcon: cardItemIcon,
    cardTimerIcon: cardTimerIcon
  },
  props: {
    parentData: {
      type: Object,
      required: true
    },
    parentTimer: {
      type: Number,
      default: null
    },
    index: {
      type: Number,
      required: false
    }
  },
  emits: ['selectTariff'],
  setup(props, { emit }) {

    const timerValue = reactive({
      day: 0,
      hours: 0,
      minutes: 0
    })

    function setTimer() {
      const date = new Date();

      const lastDay = props.parentData.timer;

      timerValue.day = lastDay - date.getDate();
      timerValue.hours = 23 - date.getHours();
      timerValue.minutes = 60 - date.getMinutes();
    }

    function reloadTimer() {

      if(props.parentData.timer) {

        setInterval(() => {
          setTimer();
        }, 60000);

      }
    }

    setTimer();
    reloadTimer();

    function selectTariff() {
      emit('selectTariff', props.index)
    }

    return { timerValue, selectTariff }
  }
}
</script>

<style scoped>
  .card {
    position: relative;
    width: 345px;
    padding-bottom: 35px;

    box-shadow: 0 17px 40px rgba(19, 49, 97, 0.07), 0 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
    border-radius: 30px;
  }

  .card--disabled::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    width: 100%;
    height: 100%;
    border-radius: 30px;

    background-color: rgba(255, 255, 255, 0.6);
  }

  .card__header {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #EFF0F0;
  }

  .card__sale {
    position: absolute;
    top: 95px;
    right: 0;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 95px;
    height: 50px;

    color: #fff;

    border-radius: 0 0 0 24px;
    background-color: #8ECD88;
  }

  .sale__text {
    font-size: 12px;
    font-weight: 500;
  }

  .sale__number {
    font-size: 16px;
    font-weight: 600;
  }

  .card__timer {
    position: absolute;
    top: 95px;
    left: 0;

    display: flex;
    align-items: center;

    width: 100%;
    height: 50px;
    padding-left: 42px;
    box-sizing: border-box;

    background-color: #F6F9FC;
  }

  .timer__text {
    margin-left: 15px;
  }

  .card__title {
    padding-left: 40px;

    font-size: 26px;
    font-weight: 600;
    color: #1E2022;
  }

  .card__days {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 95px;
    height: 95px;

    border-radius: 0px 30px 0px 0px;

    background: #FFC549;
  }

  .card__days p {
    font-size: 20px;
    font-weight: 500;
  }

  .card__days span {
    font-size: 14px;
  }

  .card__list {
    padding: 40px;

    color: #6D6D6D;
  }

  .card__list--last {
    padding-top: 73px;
    padding-bottom: 25px;

    color: #000;
  }

  .text--bold {
    font-weight: 500;
  }

  .card__text--blue {
    font-size: 15px;
    color: #328fe4;
  }

  .card__text--price {
    margin-left: 5px;

    font-size: 15px;
    font-weight: 400;
    text-decoration: line-through;
  }

  .card__item {
    display: flex;
  }

  .card__item:not(:last-child) {
    margin-bottom: 20px;
  }

  .card__text {
    //max-width: 250px;
    margin-left: 15px;

    font-size: 16px;
    line-height: 22px;
  }

  .card__price {
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 80px;
    margin-bottom: 30px;

    background-color: #F6F9FC;
  }

  .card__price p {
    font-size: 40px;
    letter-spacing: -2.5px;
  }

  .card__submit {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 180px;
    height: 48px;
    margin: 0 auto;

    border: 2px solid #FFC549;
    border-radius: 12px;

    font-family: 'Graphik LCG';
    font-size: 16px;
  }

  .card__submit:hover {
    background-color: #FED47A;
  }

  .card__submit:active {
    border: none;
    color: #A1A2A2;
    background-color: #F0F3F8;
  }
</style>