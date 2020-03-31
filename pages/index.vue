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
  padding: 20px 0;
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
  margin: 0 auto;
}
.quest {
  font-size: 100px;
  margin: 30px 0;
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
      <div v-else class="card">
        <div class="quest">
          ?
        </div>
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
      this.card = null;
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
        { name: 'wesprzyj lokalsa',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Wesprzyj panią Krysię z lokalnej cukierni',
          href: 'https://www.contra-19.org/wesprzyjlokalsa',
        },
        { name: 'maseczka antyfejkowa',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Udostępnij w Internecie infografikę na temat koronawirusa',
          href: 'https://www.contra-19.org/maseczkaantyfejkowa',
        },
        { name: 'e-domóweczka',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Zintegruj ekipę organizując imprezę z prawdziwego zdarzenia',
          href: 'https://www.contra-19.org/e-domoweczka',
        },
        { name: 'weź zagadaj',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Zadzwoń do kilku osób, by nikt nie czuł się teraz samotny',
          href: 'https://www.contra-19.org/wezzagadaj',
        },
        { name: 'przeżyj to w piżamie',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Obejrzyj spektakl online i wesprzyj polską kulturę',
          href: 'https://www.contra-19.org/przezyjtowpizamie',
        },
        { name: 'zdalnie zdolni',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Zaoferuj korepetycje z przedmiotu, w którym jesteś dobry',
          href: 'https://www.contra-19.org/zdalniezdolni',
        },
        { name: 'sąsiedzka sztama',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Wesprzyj sąsiada wywieszając plakat lub ogłaszając się w Internecie',
          href: 'https://www.contra-19.org/sasiedzkasztama',
        },
        { name: 'akcja teleportacja',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1,
          quest: 'Rozmarz się i zrelaksuj wymyślając listę rzeczy do zrobienia po koronawirusie',
          href: 'https://www.contra-19.org/akcjateleportacja',
        },
      ],
      settings: {

      },
    }
  }
};
</script>
