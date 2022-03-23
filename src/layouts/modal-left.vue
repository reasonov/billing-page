<template>
  <transition name="modalAm">
    <div class="main-modal" v-if="modalState">
      <div class="modal__wrapper">
        <button class="close-modal" @click="closeModal">
          <redo-icon />
        </button>
      </div>
      <slot></slot>
    </div>
  </transition>
  <div class="modal__background" @click="closeModal" v-show="modalState"></div>
</template>

<script>
import redoIcon from "@/components/icons/redo-icon";

export default {
  name: "modal-left",
  components: {
    redoIcon
  },
  props: {
    modalState: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleModal'],
  setup(props, { emit }) {
    function closeModal() {
      emit('toggleModal', false);
    }

    return { closeModal }
  }
}
</script>

<style scoped>

.modal__background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  
  width: 100%;
  min-height: 100vh;

  background-color: rgba(196, 196, 196, 0.6);
}

.close-modal {
  position: absolute;
  top: -10px;
  left: -108px;

  width: 48px;
  height: 48px;

  border-radius: 12px 0 0 12px;

  background: #F6F9FC;
}

.modal__wrapper {
  position: relative;
  z-index: 10;
}

.main-modal {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  width: 63%;
  max-width: 1200px;
  min-height: 100vh;
  padding: 80px 60px;

  box-sizing: border-box;
  box-shadow: 0 24px 120px -30px rgba(0, 0, 0, 0.15);

  background-color: #fff;
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