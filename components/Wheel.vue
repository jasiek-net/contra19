<style>
.wheels-container {
  position: relative;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheels {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheel-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.wheel-main,
.wheel-sub {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
}
.wheel-sub {
  z-index: 2;
}
</style>

<template>
  <div class="wheels-container">
    <div class="wheels">
      <div class="wheel-container">
        <canvas class="wheel-main" ref="mainCanvas" />
      </div>
      <div class="wheel-container">
        <canvas class="wheel-sub" ref="subCanvas" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  DEFAULT_FREQUENCY,
  DEFAULT_TEXT_COLOR,
  getDefaultBgColor,
  getTotalFrequency,
} from '../data';
import { getRandomInt } from '../util';

// Calculate the resulting prize index given the final angle and list of prizes.
function calculateResult(angle, prizes) {
  const totalFreqs = getTotalFrequency(prizes);
  let cumulative = 0;
  let winner = -1;

  for (let i = 0; i < prizes.length; ++i) {
    const freq = prizes[i].freq || DEFAULT_FREQUENCY;
    cumulative += freq;

    const arcAngle1 = angle + (2 * Math.PI * (cumulative - freq)) / totalFreqs;
    const arcAngle2 = angle + (2 * Math.PI * cumulative) / totalFreqs;
    if (isAngleBetween((3 / 2) * Math.PI, arcAngle1, arcAngle2)) {
      winner = i;
    }
  }

  return winner;
}

// Returns true if the given angle is between the specified bounds.
function isAngleBetween(angle, lower, upper) {
  lower %= 2 * Math.PI;
  upper %= 2 * Math.PI;
  if (lower <= upper) {
    return lower < angle && upper >= angle;
  } else {
    return lower < angle || upper >= angle;
  }
}

// Redraw the wheel onto the given canvas, with the given offset angle and list of prizes.
function redrawWheel(canvas, angle, prizes, final) {
  const r = Math.min(canvas.width, canvas.height) / 2.05;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  // g.addColorStop(0, 'rgba(0,0,0,0)');
  // g.addColorStop(1, 'rgba(0,0,0,0.1)');

  const totalFreqs = getTotalFrequency(prizes);
  let cumulative = 0;
  for (let i = 0; i < prizes.length; ++i) {
    const prize = prizes[i];
    const freq = prize.freq || DEFAULT_FREQUENCY;
    cumulative += freq;

    // calculate arc and text angles
    const arcAngle1 = angle + (2 * Math.PI * (cumulative - freq)) / totalFreqs;
    const arcAngle2 = angle + (2 * Math.PI * cumulative) / totalFreqs;
    const textAngle = angle + (2 * Math.PI * (cumulative - freq / 2)) / totalFreqs;
    const highlight = isAngleBetween((3 / 2) * Math.PI, arcAngle1, arcAngle2);

    // draw arc
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r - 15, arcAngle1, arcAngle2, false);
    ctx.fillStyle = prize.bg || getDefaultBgColor(i);
    ctx.fill();
    if (highlight && final) {
      ctx.fillStyle = '#222222';
      ctx.fill();
    }
    // ctx.fillStyle = g;
    ctx.save();

    // calculate font size
    const angleMod = Math.min(arcAngle2 - arcAngle1, 0.25);
    const lengthMod = 1 - Math.round(prize.name.length / 3) * 0.07;
    const fontMod = prize.fontMod || 1;
    const fontSize = Math.max(18, 0.4 * r * angleMod * lengthMod * fontMod);

    // draw text
    ctx.fillStyle = prize.text || DEFAULT_TEXT_COLOR;
    if (highlight && final) {
      ctx.fillStyle = '#FFFFFF';
      // ctx.shadowColor = prize.text || DEFAULT_TEXT_COLOR;
      // ctx.shadowBlur = r / 15;
    }
    ctx.font = fontSize + "px 'Geogrotesque', tahoma, verdana, arial, sans-serif";
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.translate(cx, cy);
    ctx.rotate(textAngle);
    ctx.fillText(prize.name.toUpperCase(), r * 0.91, 0);
    ctx.restore();
  }
}

// Redraw the wheel frame onto the given canvas.
function redrawFrame(canvas) {
  const r = Math.min(canvas.width, canvas.height) / 2.05;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const ctx = canvas.getContext('2d');

  // outer ring
  ctx.save();
  ctx.shadowOffsetX = 0 //-r / 10;
  ctx.shadowOffsetY = -5 //-r / 10;
  ctx.shadowBlur = r / 40;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.005, 0, 2 * Math.PI, true);
  ctx.arc(cx, cy, r * 0.985, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // center ring
  // ctx.shadowOffsetX = r / 100;
  // ctx.shadowOffsetY = r / 100;
  // ctx.fillStyle = '#000000';
  // ctx.beginPath();
  // ctx.arc(cx, cy, r / 25, 0, 2 * Math.PI, false);
  // ctx.fill();

  // prize pointer
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(-r * 1, -r * 0.075);
  ctx.lineTo(-r * 0.87, 0);
  ctx.lineTo(-r * 1, r * 0.075);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.restore();
}

export default {
  props: [
    'options',
    'removeWin',
    'singleWin'
  ],
  data() {
    return {
      angle: 0,
      resizeIntervalId: null
    };
  },
  computed: {
    prizes() {
      return this.options;
    },
  },
  methods: {
    // Resize and repaint the wheel if the size of the canvas changes.
    resize() {
      const mainCanvas = this.$refs.mainCanvas;
      const subCanvas = this.$refs.subCanvas;
      const pixelRatio = window.devicePixelRatio || 1;
      const desiredWidth = mainCanvas.offsetWidth * pixelRatio;
      const desiredHeight = mainCanvas.offsetHeight * pixelRatio;
      if (mainCanvas.width !== desiredWidth || mainCanvas.height !== desiredHeight) {
        mainCanvas.width = desiredWidth;
        mainCanvas.height = desiredHeight;
        subCanvas.width = desiredWidth;
        subCanvas.height = desiredHeight;
        window.requestAnimationFrame(() => {
          redrawWheel(mainCanvas, this.angle, this.prizes);
          redrawFrame(subCanvas);
        });
      }
    },

    // Determine the winner and notify parent.
    spinCompleted() {
      const winner = calculateResult(this.angle, this.prizes);
      this.$emit('result', winner);
    },

    // Start spinning. Called by parent (WheelPanel).
    startSpin() {
      const mainCanvas = this.$refs.mainCanvas;
      const prizes = this.prizes;
      const self = this;

      const totalTicks = getRandomInt(450, 530);
      const speed = 0.12 + getRandomInt(0, 80) * 0.001;
      let ticks = 0;
      const start = +new Date();

      function mainLoop() {
        const now = +new Date();
        const targetTicks = Math.min(totalTicks, (now - start) / 10);
        for (; ticks <= targetTicks; ++ticks) {
          self.angle += (speed * (totalTicks - ticks)) / totalTicks;
        }

        if (ticks < totalTicks) {
          redrawWheel(mainCanvas, self.angle, prizes);
          window.requestAnimationFrame(mainLoop);
        } else {
          redrawWheel(mainCanvas, self.angle, prizes, true);
          self.spinCompleted();
        }
      }

      window.requestAnimationFrame(mainLoop);
    }
  },
  mounted() {
    this.resizeIntervalId = setInterval(this.resize, 500);
  },
  beforeDestroy() {
    clearInterval(this.resizeIntervalId);
  }
};
</script>
