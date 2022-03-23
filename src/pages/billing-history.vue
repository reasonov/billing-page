<template>
  <div class="history-page">
    <div class="history__header">
      <h2 class="history__title">История платежей</h2>
      <p class="history__subtitle">В этом разделе вы можете найти детализацию всех ваших платежей в системе qoob.store</p>
    </div>

    <ul class="history__list">
      <li :class="['history__item', {'history__item--first': index === 0}]" v-for="(item, index) in historyList" :key="item.name">
        <p
            :class="[
                'history__text',
                {'history__text--first': index === 0},
                {'history__text--blue': (text === item.state && item.state === 'Оплачен')},
                {'history__text--red': (text === item.state && item.state === 'Не оплачен')}
                ]"
            v-for="text in item"
            :key="text"
            v-show="text != item.action"
        >
          {{ text }}
        </p>
        <button :class="['history__action', {'download': item.action === 'Скачать'}, {'delete': item.action === 'Удалить'}]">{{ item.action }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { paymentList } from '../data/paymentList.json';

export default {
  name: "billing-history",
  setup() {

    class Payment {
      constructor(id, name, sum, date, method, state, action) {
        this.id = id;
        this.name = name;
        this.sum = sum;
        this.date = date;
        this.method = method;
        this.state = state;
        this.action = action;
      }
    }

    const historyList = [];

    function updateHistory() {
      historyList.push(new Payment('#', 'Название платежа', 'Сумма, ₽', 'Дата выставления', 'Способ оплаты', 'Статус', 'Действия'));

      paymentList.forEach((item) => {
        historyList.push(new Payment(item.id, item.name, item.sum, item.date, item.method, item.state, item.action));
      })
    }
    updateHistory();

    return { historyList }

  }
}
</script>

<style scoped>

.download::before {
  content: '';
  position: absolute;
  top: 29px;
  left: 0;

  width: 24px;
  height: 24px;

  background-image: url("../assets/img/download.png");
  background-size: cover;
}

.delete::before {
  content: '';
  position: absolute;
  top: 29px;
  left: 0;

  width: 24px;
  height: 24px;

  background-image: url("../assets/img/delete.png");
  background-size: cover;
}

.history__action {
  position: relative;
  text-align: left;
  color: #A1A2A2;
}

.delete {
  text-align: center;
  color: #000;
}

.download {
  text-align: center;
  color: #000;
}

.history__text {
  display: flex;
  align-items: center;

  height: 80px;

  font-size: 14px;
}

.history__text--blue {
  color: #328FE4;
}

.history__text--red {
  color: #DD6068;
}

.history__text--first {
  display: block;
  height: auto;

  line-height: 24px;
  color: #A1A2A2;
}

.history__item {
  display: grid;
  grid-template-columns: 0.7fr 4fr 2fr 2fr 2fr 2fr 1.7fr;

  border-bottom: 1px solid #EFF0F0;
}

.history__item--first {
  border-bottom: none;
}

.history__subtitle {
  font-size: 16px;
}

.history__title {
  margin-bottom: 20px;

  font-size: 26px;
  font-weight: 600;
}

.history__header {
  padding-top: 50px;
  padding-bottom: 40px;
}

.history-page {
  padding: 0 60px;
  margin-left: 200px;
}
</style>