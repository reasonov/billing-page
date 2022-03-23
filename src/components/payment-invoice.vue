<template>
  <div class="payment-invoice">
    <h3 class="invoice__title">Счет на оплату</h3>

    <ul class="plan-stat">
      <li class="plan-stat__item">
        <p class="stat__text">Выбраный тарифный план</p>
        <p class="stat__text--bold">{{ currentTariff.name }}</p>
      </li>
      <li class="plan-stat__item">
        <p class="stat__text">Срок лицензии тарифного плана</p>
        <p class="stat__text--bold">{{ currentTariff.days }} дней</p>
      </li>
      <li class="plan-stat__item">
        <p class="stat__text">Суммарный срок лицензии</p>
        <p class="stat__text--bold">{{ currentTariff.days + 12 }} дня</p>
      </li>
    </ul>

    <div class="sum-block">
      <p class="sum__text">К оплате:</p>
      <p class="sum__number">{{ currentTariff.price }} ₽</p>
    </div>

    <p class="invoice__text">
      После оплаты, обработка платежа может занять некоторое время.
      Как правило, это происходит в течении одного рабочего дня с
      момента поступления средств на нащ расчетный счет.
      Для ускорения зачисления денежных средств, пришлите нам платежное поручение из банка.
    </p>
  </div>
</template>

<script>
export default {
  name: "payment-invoice",
  props: {
    currentTariff: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.invoice__text {
  margin-top: 50px;

  font-size: 14px;
  line-height: 24px;
}

.invoice__title {
  padding-bottom: 25px;
  margin-bottom: 20px;
  border-bottom: 1px solid #EFF0F0;

  font-size: 20px;
  font-weight: 600;
  color: #1E2022;
}

.sum__number {
  font-size: 32px;
  letter-spacing: -2.5px;
  color: #1E2022;
}

.sum__text {
  font-size: 20px;
  font-weight: 600;
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

.stat__text--bold {
  font-size: 15px;
  font-weight: 500;
}

.plan-stat__item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;

  font-size: 16px;
}

.plan-stat {
  margin: 40px 0;
}
</style>