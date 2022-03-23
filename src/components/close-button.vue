<template>
  <button class="close">
    <div>
      <span class="close-line close-line1"></span>
      <span class="close-line close-line2"></span>
    </div>
  </button>
</template>

<script>
export default {
  name: "close-button"
}
</script>

<style scoped>
.close {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0px 17px 40px rgba(19, 49, 97, 0.07), 0px 6.20528px 21.901px rgba(19, 49, 97, 0.0482987), 0px 3.01255px 10.6325px rgba(19, 49, 97, 0.0389404), 0px 1.47681px 5.21226px rgba(19, 49, 97, 0.0310596), 0px 0.583932px 2.06094px rgba(19, 49, 97, 0.0217013);

  background-color: #F7F9FC;
}

.close-line {
  display: block;
  width: 35px;
  height: 1px;

  border-radius: 5px;

  background-color: #000;
}

.close-line1 {
  transform: rotateZ(45deg);
}

.close-line2 {
  position: relative;
  top: -1px;
  transform: rotateZ(-45deg);
}
</style>