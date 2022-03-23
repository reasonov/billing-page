<template>
  <div class="info-modal">
    <div class="info__wrapper">
      <template v-if="infoIndex === 1">
        <h3 class="info__title">Согласие на обработку персональных данных</h3>

        <p class="info__text">
          Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных КУБ (ОГРН 1172375054026, ИНН 2308246561), зарегистрированным в соответствии с законодательством РФ по адресу:
          Красноармейская улица, 136, г. Краснодар, ул. им. Фрунзе, д. 186/1, пом. М-406, M-406 , Краснодар, Краснодарский край, город Краснодар, Россия, 350000 (далее по тексту - Оператор).
          Персональные данные - любая информация, относящаяся к определенному или определяемому на основании такой информации физическому лицу.
          Настоящее Согласие выдано мною на обработку следующих персональных данных:
        </p>

        <ul class="info__list">
          <li class="info__item">- Фамилия;</li>
          <li class="info__item">- Имя;</li>
          <li class="info__item">- Отчество;</li>
          <li class="info__item">- Номер телефона;</li>
          <li class="info__item">- Пол;</li>
          <li class="info__item">- День рождения;</li>
          <li class="info__item">- Адрес электронной почты.</li>
        </ul>

        <p class="info__text">
          Согласие дано Оператору для совершения следующих действий с моими персональными данными с использованием средств автоматизации и/или без использования таких средств: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, обезличивание, а также осуществление любых иных действий, предусмотренных действующим законодательством РФ как неавтоматизированными, так и автоматизированными способами.
          Данное согласие дается Оператору для обработки моих персональных данных в следующих целях:
        </p>

        <ul class="info__list">
          <li class="info__item">- предоставление мне услуг/работ;</li>
          <li class="info__item">- направление в мой адрес уведомлений, касающихся предоставляемых услуг/работ;</li>
          <li class="info__item">- подготовка и направление ответов на мои запросы;</li>
          <li class="info__item">- направление в мой адрес информации, в том числе рекламной, о мероприятиях/товарах/услугах/работах Оператора.</li>
        </ul>

        <p class="info__text">
          Настоящее согласие действует до момента его отзыва путем направления соответствующего уведомления на электронный адрес app@qoob.store. В случае отзыва мною согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без моего согласия при наличии оснований, указанных в пунктах 2 – 11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11 Федерального закона №152-ФЗ «О персональных данных» от 27.07.2006 г.
        </p>
        
        <p class="info__text">Редакция 27.04.2021 г.</p>
      </template>

      <template v-else-if="infoIndex === 2">
        <h3 class="info__title">Лицензионный договор-оферта</h3>

        <p class="info__text">г. Краснодар «01» июля 2020 г.</p>

        <p class="info__text">ООО «КУБ», именуемое в дальнейшем «Лицензиар», публикует настоящий Лицензионный договор-оферту (далее – «Договор»), являющийся публичной офертой.</p>

        <p class="info__text">В соответствии со статьей 438 Гражданского Кодекса Российской Федерации, безусловным принятием (акцептом) условий настоящего Договора  считается оплата лицензионного вознаграждения Лицензиатом и получение соответствующего финансового документа, подтверждающего факт оплаты.</p>

        <p class="info__text">Лицензиар предлагает заключить договор о передаче прав простой (неисключительной) лицензии на использование программного обеспечения для мобильных устройств  "Мобильное приложение qoob" (далее – мобильное ПО) любому юридическому и физическому лицу, именуемому в дальнейшем «Лицензиат» на условиях настоящего Договора.</p>

      </template>

    </div>

    <close-button class="info__close" @click="closeModal" />

    <div class="info__background" @click="closeModal"></div>

  </div>
</template>

<script>
import closeButton from "@/components/close-button";

export default {
  name: "info-modal",
  components: {
    closeButton
  },
  props: {
    infoIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['closeInfo'],
  setup(props, { emit }) {

    function closeModal() {
      emit('closeInfo');
    }

    return { closeModal }

  }
}
</script>

<style scoped>

.info__close {
  top: 40px;
  left: -32px;
  z-index: 20;
}

.info-modal {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;

  width: 64%;
  max-width: 776px;
  min-height: 100vh;
  max-height: 100vh;
}

.info__wrapper {
  position: relative;
  z-index: 20;

  padding: 80px 55px 40px 55px;
  max-height: 100vh;

  box-sizing: border-box;
  overflow-y: scroll;
  -ms-overflow-style: none;

  background-color: #fff;
  border-radius: 30px 0 0 30px;
  box-shadow: 0px 24px 120px -30px rgba(0, 0, 0, 0.15);
}

.info__wrapper::-webkit-scrollbar { width: 0 }
.info__wrapper::-webkit-scrollbar { width: 0 }

.info__title {
  margin-bottom: 60px;

  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}

.info__text {
  margin-bottom: 30px;

  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
}

.info__list {
  margin-bottom: 30px;
}

.info__item {
  font-size: 20px;
  font-weight: 600;
  line-height: 26px;
}

.info__background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  width: 100%;
  height: 100vh;

  background-color: rgba(196, 196, 196, 0.6);
}
</style>