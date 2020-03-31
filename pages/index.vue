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
  font-family: 'Geogrotesque' !important;
  display: inline-block;
  padding: 5px 15px;
  font-size: 20px;
  border-radius: 2px;
  margin: 30px 0;
  cursor: pointer;
  color: white;
  background: #FF0080;
}
.button:hover {
  transition: .5s;
  color: white;
  background: #E622A5;
}
.small {
  font-size: 16px;
  text-decoration: none;
  margin: 15px 0 0;
}
.card {
  border: 2px solid #333333;
  border-radius: 2px;
  text-align: center;
  max-width: 300px;
  margin: 0 auto;
  font-family: 'Geogrotesque Regular';
  background: white;
}
.quest {
  font-size: 100px;
  margin: 30px 0;
}

h2 {
  font-size: 30px;
}

.spin {
  position: absolute;
  top: 120px;
  transform: translateY(-50%);
  margin: 0 auto;
  max-width: 200px;
  left: 0;
  right: 0;
  transition: top .5s linear;
}

.start {
  top: min(50vw, 50vh);
  transition: top .5s linear;
}

.card-wrap {
  padding: 15px;
}
.img {
  height: 125px;
  background-size: cover;
  background-position: center center;
}

@media (max-aspect-ratio: 2/3) {
  h2 {
    font-size: 14px;
  }
  .button {
    font-size: 14px;
  }
  .spin {
    position: absolute;
    top: 50vw;
    transform: translateY(-50%);
    margin: 0 auto;
    left: 10px;
    right: 10px;
  }
  .card-cont {
    top: 100vw;
    left: 0;
    right: 0;
  }
  .card-wrap {
    font-size: 0.8em;
  }
  .img {
    height: 80px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>

<template>
  <div class="container">
    <div class="copy-cont">
      <h2>WYLOSUJ WYZWANIE</h2>
      <div class="button spin" :class="{ start: first }" @click.prevent="spin">{{ losuj }}</div>
    </div>
    <div class="card-cont">
      <transition name="fade">
        <div v-if="card" class="card">
          <div class="img" :style="{ backgroundImage: 'url(' + require(`@/assets/img/${ card.img }`) + ')' }" />
          <div class="card-wrap">
            <h3>{{ card.name.toUpperCase() }}</h3>
            <br />
            {{ card.quest }}
            <br />
            <a class="button small" :href="card.href" target="_blank">DOWIEDZ SIĘ WIĘCEJ</a>
          </div>
        </div>
      </transition>
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
      this.first = false;
      this.losuj = 'ZAKRĘĆ PONOWNIE';
      this.card = this.options[ev];
    }
  },
  data() {
    return {
      first: true,
      card: null,
      losuj: 'ZAKRĘĆ KOŁEM',
      options: [
        { name: 'wesprzyj lokalsa',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Wesprzyj panią Krysię z lokalnej cukierni',
          href: 'https://www.contra-19.org/wesprzyjlokalsa',
          img: 'wesprzyjlokalsa.png',
        },
        { name: 'maseczka antyfejkowa',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Udostępnij w Internecie infografikę na temat koronawirusa',
          href: 'https://www.contra-19.org/maseczkaantyfejkowa',
          img: 'maseczkaantyfejkowa.png',
        },
        { name: 'e-domóweczka',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Zintegruj ekipę organizując imprezę z prawdziwego zdarzenia',
          href: 'https://www.contra-19.org/e-domoweczka',
          img: 'e-domoweczka.png',
        },
        { name: 'weź zagadaj',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Zadzwoń do kilku osób, by nikt nie czuł się teraz samotny',
          href: 'https://www.contra-19.org/wezzagadaj',
          img: 'wezzagadaj.png',
        },
        { name: 'przeżyj to w piżamie',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Obejrzyj spektakl online i wesprzyj polską kulturę',
          href: 'https://www.contra-19.org/przezyjtowpizamie',
          img: 'przezyjtowpizamie.png',
        },
        { name: 'zdalnie zdolni',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Zaoferuj korepetycje z przedmiotu, w którym jesteś dobry',
          href: 'https://www.contra-19.org/zdalniezdolni',
          img: 'zdalniezdolni.png',
        },
        { name: 'sąsiedzka sztama',
          freq: 4,
          bg: '#D72E8A',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Wesprzyj sąsiada wywieszając plakat lub ogłaszając się w Internecie',
          href: 'https://www.contra-19.org/sasiedzkasztama',
          img: 'sasiedzkasztama.png',
        },
        { name: 'akcja teleportacja',
          freq: 4,
          bg: '#EC378D',
          text: '#222',
          hide: false,
          fontMod: 1.1,
          quest: 'Rozmarz się i zrelaksuj wymyślając listę rzeczy do zrobienia po koronawirusie',
          href: 'https://www.contra-19.org/akcjateleportacja',
          img: 'akcjateleportacja.png',
        },
      ],
      settings: {

      },
    }
  }
};
</script>
