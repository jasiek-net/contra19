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
  left: max(-50vh, -50vw);
  transform: rotate(90deg);
}
.copy-cont {
  position: absolute;
  top: 0;
  left: min(50vh, 50vw);
  right: 0;
  padding: 15px;
  text-align: center;
}
.card-cont {
  position: absolute;
  top: 150px;
  left: min(50vh, 50vw);
  right: 0;
  padding: 15px;
}
.button {
  display: inline-block;
  padding: 5px 20px;
  font-size: 20px;
  border: 2px solid #E622A5;
  border-radius: 30px;
  margin: 30px 0;
  cursor: pointer;
}
.button:hover {
  transition: .5s;
  color: white;
  background: #E622A5;
}
.small {
  font-size: 16px;
  text-decoration: none;
  color: black;
  margin: 15px 0;
}
.card {
  padding: 15px;
  border: 2px solid #333333;
  text-align: center;
  max-width: 350px;
  margin: 15px auto;
}

@media (max-aspect-ratio: 2/3) {
  h2 {
    font-size: 20px;
  }
  .button {
    font-size: 16px;
  }
  .card-cont {
    top: 100vw;
    left: 0;
    right: 0;
  }
}
</style>

<template>
  <div class="container">
    <div class="copy-cont">
      <h2>Wylosuj wyzwanie na dziś</h2>
      <div class="button" @click.prevent="spin">{{ losuj }}</div>
    </div>
    <div class="card-cont">
      <div v-if="card" class="card">
        <h3>{{ card.name }}</h3>
        <br />
        {{ card.quest }}
        <br />
        <a class="button small" :href="card.href" target="_blank">Dowiedz się więcej</a>
      </div>
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
      this.losuj = 'Losuj jeszcze raz';
      this.card = this.options[ev];
    }
  },
  data() {
    return {
      card: null,
      losuj: 'Wylosuj wyzwanie',
      options: [
        { name: 'Wesprzyj lokalnych przedsiębiorców',
          freq: 4,
          bg: '#FFCC80',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Walcz z fake newsami',
          freq: 4,
          bg: '#F48FB1',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Zorganizuj imprezę online',
          freq: 4,
          bg: '#81D4FA',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Zadbaj o jakość nauki online',
          freq: 4,
          bg: '#B39DDB',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Zorganizuj czas najmłodszych',
          freq: 4,
          bg: '#C5E1A5',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Uratuj teatry',
          freq: 4,
          bg: '#F48FB1',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Zaoferuj darmowe e-korepetycje',
          freq: 4,
          bg: '#81D4FA',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Pomóż sąsiadom',
          freq: 4,
          bg: '#FFCC80',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
        { name: 'Zaplanuj swoje życie po koronawirusie',
          freq: 4,
          bg: 'white',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          href: 'https://www.zmiana.zwolnienizteorii.pl/',
        },
      ],
      settings: {

      },
    }
  }
};
</script>
