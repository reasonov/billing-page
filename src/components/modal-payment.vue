<template>
  <div>
    <div class="modal-payment">
      <div class="payment__wrapper">

        <close-button class="payment__close" @click="changeModal(null)" />

        <payment-method
            @newMethod="takeMethod($event)"
            :paymentMethod="paymentMethod"
            :currentPrice="currentTariff.price"
            v-if="activeModal === 0"
        />

        <payment-data
            @updatePaymentData="takePaymentData($event)"
            :currentPrice="currentTariff.price"
            v-if="activeModal === 1"
        />

        <payment-invoice
            :currentTariff="currentTariff"
            v-if="activeModal === 2"
        />

        <div class="payment__bottom">
          <router-link to="/history" class="payment__download" v-if="activeModal === 2">Скачать</router-link>

          <button class="payment__redo" @click="changeModal(-1)" v-if="activeModal === 1">
            <arrow-right class="arrow-left" />
            Назад
          </button>

          <button
              class="payment__submit"
              @click="changeModal(1)"
              v-if="activeModal < 2"
              :disabled="(paymentMethod === 0 && activeModal === 0) || (!isDataFull && activeModal === 1)"
          >
            Перейти к оплате
            <arrow-right class="arrow-right" />
          </button>
        </div>
      </div>
    </div>

    <div class="modal__background" @click="changeModal(null)"></div>

  </div>

</template>

<script>
import paymentMethod from "@/components/payment-method";
import paymentData from "@/components/payment-data";
import paymentInvoice from "@/components/payment-invoice";
import closeButton from "@/components/close-button";
import arrowRight from "@/components/icons/arrow-right";
import {ref, reactive, watchEffect, computed} from "vue";

export default {
  name: "modal-payment",
  components: {
    paymentMethod,
    paymentData,
    paymentInvoice,
    closeButton,
    arrowRight
  },
  props: {
    modalNumber: {
      type: Number,
      default: null
    },
    currentTariff: {
      type: Object,
      required: true
    }
  },
  emits: ['toggleModal'],
  setup(props, { emit }) {

    const activeModal = ref(null);

    function changeModal(value) {
      if(typeof value === 'number') {
        if(value > 0) {
          activeModal.value += value;
        } else {
          activeModal.value += value;
        }
      } else {
        activeModal.value = value;
        emit('toggleModal', false)
      }
    }

    watchEffect(() => {
      if(props.modalNumber === 0) {
        activeModal.value = 0;
      }
    })

    const paymentMethod = ref(0);

    function takeMethod(index) {
      paymentMethod.value = index;
    }

    const paymentData = reactive({
      inn: '',
      name: '',
      address: ''
    })

    function takePaymentData(data) {
      paymentData.inn = data.inn;
      paymentData.name = data.name;
      paymentData.address = data.address;
    }

    const isDataFull = computed(() => {
      if(paymentData.inn && paymentData.name && paymentData.address) {
        return true;
      }
      return false;
    })

    return {
      activeModal,
      changeModal,
      paymentMethod,
      takeMethod,
      takePaymentData,
      isDataFull
    }

  }
}
</script>

<style scoped>

.payment__close {
  top: -30px;
  right: -25px;
}

.modal__background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  
  width: 100%;
  min-height: 100vh;

  background-color: rgba(196, 196, 196, 0.6);
}

.payment__wrapper {
  position: relative;

  width: 653px;
  height: 773px;
  padding: 60px;

  box-sizing: border-box;
}

.payment__download {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 48px;

  border-radius: 12px;

  font-size: 16px;

  background-color: #FFC549;
}

.payment__redo {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 121px;
  height: 48px;
  margin-right: 20px;

  border-radius: 12px;

  font-size: 16px;

  background: #F7F9FC;
}

.payment__redo:hover {
  background-color: #FED47A;
}

.payment__redo:active {
  background-color: #F0F3F8;
}

.payment__submit {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 210px;
  height: 48px;

  border-radius: 12px;

  font-size: 16px;

  background-color: #FFC549;
}

.payment__submit:hover {
  background-color: #FED47A;
}

.payment__submit:active {
  background-color: #F0F3F8;
}

.payment__submit:disabled {
  color: #000;
  background-color: #F7F9FC;
}

.arrow-right {
  margin-left: 10px;
}

.arrow-left {
  margin-right: 10px;

  transform: rotateZ(180deg);
}

.payment__bottom {
  position: absolute;
  bottom: 60px;
  right: 60px;

  display: flex;
  justify-content: flex-end;
  width: calc(100% - 120px);
}

.modal-payment {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20;

  box-shadow: 0px 24px 120px -30px rgba(0, 0, 0, 0.15);
  border-radius: 30px;

  transform: translateX(-50%) translateY(-50%);

  background-color: #FFFFFF;
}
</style>