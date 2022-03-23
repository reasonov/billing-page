<template>
  <div class="select-plan">
    <div class="plan-info">
      <h3 class="title">Подлючение тарифного плана</h3>

      <p class="subtitle">Укажите, для какого именно филиана приобретается лицензия.</p>

      <drop-menu :itemSelected="itemSelected">
        <template v-slot:name>
          <p class="drop__label">Добавить филиал в лицензию</p>
        </template>

        <template v-slot:text>{{ dropList[dropItem] }}</template>

        <template v-slot:item>
          <li class="drop__item-wrapper">
            <button class="drop__item" @click="selectDrop(1)">Студия красоты Health & beauty</button>
          </li>
          <li class="drop__item-wrapper">
            <button class="drop__item" @click="selectDrop(2)">Барбершоп у Олега</button>
          </li>
          <li class="drop__item-wrapper">
            <button class="drop__item" @click="selectDrop(3)">Маникюрный салон татьяна</button>
          </li>
        </template>
      </drop-menu>

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

      <ul class="terms">
        <li class="terms__item" v-for="(item, index) in termsList" :key="item">
          <custom-checkbox :item="item" :index="index" @toggleCheckbox="toggleCheckbox($event)" />
          <button class="terms__text" @click="selectInfo(index + 1)">{{ item.text }}</button>
        </li>
      </ul>

      <button
          class="plan__submit"
          @click="toggleModal"
          :disabled="(!termsList[0].state || !termsList[1].state)"
      >
        Выбрать способ оплаты
        <arrow-right class="arrow" />
      </button>
    </div>
    <div class="plan__right">
      <div class="plan-block">
        <div class="card__header">
          <h3 class="card__title">Тарифный план "{{ currentTariff.name }}"</h3>
          <div class="card__days">
            <p>{{ currentTariff.days }}</p>
            <span>дней</span>
          </div>
        </div>
        <div class="plan-block__body">
          <ul class="plan-block__list">
            <li class="plan-block__item" v-for="item in currentTariff.list" :key="item">
              <card-item-icon />
              <p class="card__text">{{ item }}</p>
            </li>
<!--            <li class="plan-block__item">-->
<!--              <card-item-icon />-->
<!--              <p class="card__text">Каскад уведомлений</p>-->
<!--            </li>-->
<!--            <li class="plan-block__item">-->
<!--              <card-item-icon />-->
<!--              <p class="card__text">Push — уведомления</p>-->
<!--            </li>-->
<!--            <li class="plan-block__item">-->
<!--              <card-item-icon />-->
<!--              <p class="card__text">WhatsApp</p>-->
<!--            </li>-->
<!--            <li class="plan-block__item">-->
<!--              <card-item-icon />-->
<!--              <p class="card__text">SMS — агрегатор</p>-->
<!--            </li>-->
          </ul>
        </div>
      </div>

      <div class="instruction" @click="toggleInstruction">
        <div class="instruction__header">
          <p class="instruction__title">
            <instruction-icon />
            <span class="instruction-title__text">Инструкция</span>
            <arrow-down-icon class="arrow-down" />
          </p>
        </div>
        
        <p class="instruction__text">{{ instructionList[instructionActive] }}</p>
        
      </div>
    </div>
  </div>

  <modal-payment
      :modalNumber="modalNumber"
      :currentTariff="currentTariff"
      @toggleModal="toggleModal($event)"
      v-show="modalNumber === 0"
  />

  <transition name="modalAm">
    <info-modal v-show="infoIndex != 0" :infoIndex="infoIndex" @closeInfo="selectInfo(0)" />
  </transition>

</template>

<script>
import dropMenu from "@/components/drop-menu";
import customCheckbox from "@/components/custom-checkbox";
import cardItemIcon from './icons/card-item-icon';
import instructionIcon from "@/components/icons/instruction-icon";
import arrowDownIcon from "@/components/icons/arrow-down-icon";
import modalPayment from "@/components/modal-payment";
import infoModal from "@/components/info-modal";
import arrowRight from "@/components/icons/arrow-right";
import {ref, reactive} from "vue";

export default {
  name: "select-plan",
  components: {
    dropMenu,
    customCheckbox,
    cardItemIcon,
    instructionIcon,
    arrowDownIcon,
    modalPayment,
    infoModal,
    arrowRight
  },
  props: {
    currentTariff: {
      type: Object,
      required: true
    }
  },
  setup() {
    const dropList = reactive([
        'Выберите филиал',
        'Студия красоты Health & beauty',
        'Барбершоп у Олега',
        'Маникюрный салон татьяна'
    ])

    const dropItem = ref(0);
    const itemSelected = ref(false);

    function selectDrop(index) {
      dropItem.value = index;
      itemSelected.value = true;

      setTimeout(() => {
        itemSelected.value = false;
      }, 200)
    }

    const termsList = reactive([
      {
        text: 'Я принимаю условия соглашения сервиса qoob.store',
        state: false
      },
      {
        text: 'Я принимаю условия соглашения сервиса qoob.store',
        state: false
      }
    ])

    function toggleCheckbox(data) {
      termsList[data.index].state = data.state;
    }

    const instructionList = [
        'Инструкция по подключению канала WhatsApp к каскаду уведомлений.',
        'Являясь всего лишь частью общей картины, предприниматели в сети интернет лишь добавляют фракционных разногласий и указаны как претенденты на роль ключевых факторов.'
    ]

    const instructionActive = ref(0);

    function toggleInstruction() {
      if(instructionActive.value === 0) {
        instructionActive.value = 1;
      } else {
        instructionActive.value = 0;
      }
    }

    const modalNumber = ref(null);

    function toggleModal(state) {
      if(state === false) {
        modalNumber.value = null;
      } else {
        modalNumber.value = 0;
      }
    }

    const infoIndex = ref(0);

    function selectInfo(index) {
      infoIndex.value = index;
    }

    return {
      dropList,
      dropItem,
      selectDrop,
      itemSelected,
      termsList,
      toggleCheckbox,
      instructionList,
      instructionActive,
      toggleInstruction,
      modalNumber,
      toggleModal,
      infoIndex,
      selectInfo
    }
  }
}
</script>

<style scoped>

.instruction__text {
  margin-top: 15px;

  font-size: 16px;
  line-height: 24px;
  color: #6D6D6D;
}

.arrow-down {
  margin-left: auto;
}

.instruction-title__text {
  margin-left: 15px;
}

.instruction__title {
  display: flex;
  align-items: center;
}

.instruction {
  position: absolute;
  right: 0;
  top: calc(100% - 150px);

  width: 493px;
  min-height: 150px;
  padding: 32px 40px;

  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
  border-radius: 30px;
  box-sizing: border-box;

  background-color: #fff;
}

.card__text {
  margin-left: 20px;

  font-size: 14px;
  color: #6D6D6D;
}

.plan-block__item {
  display: flex;
  align-items: center;

  margin-bottom: 15px;
}

.plan-block__list {
  padding-top: 25px;
  padding-left: 40px;
  padding-bottom: 60px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #EFF0F0;
}

.card__title {
  padding-left: 40px;

  font-size: 20px;
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

.plan-block {
  width: 488px;
  
  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);
  border-radius: 30px;

  background-color: #fff;
}

.plan__right {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 488px;
  margin-left: 60px;
}

.plan__submit {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 48px;

  border-radius: 12px;

  font-size: 16px;

  background-color: #FFC549;
}

.plan__submit:hover {
  background-color: #FED47A;
}

.plan__submit:active {
  background-color: #F0F3F8;
}

.plan__submit:disabled {
  color: #000;
  background-color: #F7F9FC;
}

.arrow {
  margin-left: 10px;
}

.terms__text {
  margin-left: 20px;

  font-size: 14px;
  text-align: left;
  color: #328FE4;
}

.terms__item {
  display: flex;
  align-items: center;

  margin-bottom: 20px;
}

.terms {
  margin-bottom: 35px;
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

.drop__item-wrapper:hover {
  background-color: #F6F9FC;
}

.drop__item-wrapper:active {
  background-color: #F0F3F8;
}

.drop__item {
  display: flex;
  align-items: center;

  height: 45px;
  padding-left: 20px;

  font-size: 15px;
}

.drop__label {
  margin-bottom: 10px;

  font-size: 14px;
  color: #6D6D6D;
}

.subtitle {
  margin-bottom: 20px;

  font-size: 16px;
}

.title {
  margin-bottom: 25px;

  font-size: 20px;
  font-weight: 600;
  color: #1E2022;
}

.plan-info {
  max-width: 533px;
}

.select-plan {
  display: flex;
  justify-content: space-between;
}

.modalAm-enter-active,
.modalAm-leave-active {
  transition: .5s all ease;
}

.modalAm-enter-from,
.modalAm-leave-to {
  right: -300px;
  opacity: 0;
}
</style>