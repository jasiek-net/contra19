<style>
.container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.wheel-cont {
  height: min(100vh, 100vw);
  width: min(100vh, 100vw);
  position: absolute;
  right: max(-50vh, -50vw);
}
.copy-cont {
  position: absolute;
  top: 0;
  left: 0;
  height: min(100vh, 100vw);
  right: min(50vh, 50vw);
  padding: 15px;
}
button {
  font-size: 30px;
}
@media (max-aspect-ratio: 2/3) {
  div {
    /*background: #9af;*/
  }
}
</style>

<template>
  <div class="container">
    <div class="copy-cont">
      <h1>Wylosuj wyzwanie na dziś</h1>
      <br />
      <br />
      <button class="button" @click.prevent="spin">spin</button>
      <br />
      <br />
      <div>wylosowano: {{ card }}</div>
    </div>
    <div class="wheel-cont">
      <Wheel
        ref="wheel"
        :options="options"
        :singleWin="true"
        :removeWin="true"
        @result="result" />
    </div>
  </div>
</template>

<script>
import Wheel from '@/components/Wheel';

export default {
  components: {
    Wheel,
  },
  methods: {
    spin() {
      this.$refs.wheel.startSpin();
    },
    result(ev) {
      this.card = this.options[ev].name;
    }
  },
  data() {
    return {
      card: 'nic',
      options: [
        { name: 'Wesprzyj lokalnych przedsiębiorców',
          freq: 4, bg: '#FFCC80', text: '#222', hide: false, fontMod: 1 },
        { name: 'Walcz z fake newsami',
          freq: 4, bg: '#F48FB1', text: '#222', hide: false, fontMod: 1 },
        { name: 'Zorganizuj imprezę online',
          freq: 4, bg: '#81D4FA', text: '#222', hide: false, fontMod: 1.5 },
        { name: 'Zadbaj o jakość nauki online',
          freq: 4, bg: '#B39DDB', text: '#222', hide: false, fontMod: 1 },
        { name: 'Zorganizuj czas najmłodszych',
          freq: 4, bg: '#C5E1A5', text: '#222', hide: false, fontMod: 1.5 },
        { name: 'Uratuj teatry',
          freq: 4, bg: '#F48FB1', text: '#222', hide: false, fontMod: 1 },
        { name: 'Zaoferuj darmowe e-korepetycje',
          freq: 4, bg: '#81D4FA', text: '#222', hide: false, fontMod: 1 },
        { name: 'Pomóż sąsiadom',
          freq: 4, bg: '#FFCC80', text: '#222', hide: false, fontMod: 1 },
        { name: 'Zaplanuj swoje życie po koronawirusie',
          freq: 4, bg: 'white', text: '#222', hide: false, fontMod: 1 },
      ],
      settings: {

      },
    }
  }
};
</script>
