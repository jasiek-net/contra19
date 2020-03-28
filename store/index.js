// import { getAvailable, getInitialPreset } from '../data';
// import { PRESET2 } from '../data/presets';
// // import { loadOptions, loadPresets } from '../data/storage';
// import {
//   deepClone,
//   // getParameterByName,
// } from '../util';
// // import { saveOptions, savePresets } from '../data/storage';

// // let options = loadOptions();
// // const presets = loadPresets();

// // console.log(presets)

// // Use the preset specified by the parameter, if any.
// // const initial = getInitialPreset(getParameterByName('preset'), presets);
// // const data = initial ? deepClone(initial) : deepClone(options || PRESET2);
// const data = PRESET2;

// // If there is no stored options, use the initial data as options.
// // if (!options) {
// //   options = deepClone(data);
// // }
// const options = deepClone(data);

// export const state = () => ({
//   // totalSpins: 0,
//   // spins: 0,
//   // lastResult: -1,
//   // showOptions: false,
//   // size: 0,
//   // options,
//   // data,
//   // available: deepClone(getAvailable(data.prizes)),
//   // records: [],
//   // presets
// });

// export const mutations = {
//   // addPrize: (state, prize) => {
//   //   state.options.prizes.push(prize);
//   // },

//   // Add the prize at the given index to the records.
//   // addSpinResult: (state, index) => {
//   //   state.totalSpins++;
//   //   state.spins++;
//   //   state.lastResult = index;
//   //   state.records.push(state.available[index].name);
//   // },

//   // hideOptions: state => {
//   //   state.showOptions = false;
//   // },

//   // loadPreset: (state, data) => {
//   //   if (data) {
//   //     state.options = deepClone(data);
//   //   }
//   // },

//   // removePreset: (state, index) => {
//   //   state.presets.splice(index, 1);
//   //   savePresets(state.presets);
//   // },

//   // removePrize: (state, index) => {
//   //   state.options.prizes.splice(index, 1);
//   // },

//   // Save current wheel data to storage, and reset the wheel.
//   // saveAndReset: state => {
//   //   state.spins = 0;
//   //   state.lastResult = -1;
//   //   state.records = [];
//   //   state.data = deepClone(state.options);
//   //   state.available = deepClone(getAvailable(state.data.prizes));
//   //   saveOptions(state.options);
//   // },

//   // saveNewPreset: (state, name) => {
//   //   state.presets.push({ name, data: deepClone(state.data) });
//   //   savePresets(state.presets);
//   // },

//   // savePreset: (state, index) => {
//   //   state.presets[index].data = deepClone(state.data);
//   //   savePresets(state.presets);
//   // },

//   // showOptions: state => {
//   //   state.showOptions = true;
//   // },

//   // If removeWinning is set to true, make the last spin result unavailable.
//   // updateAvailable: state => {
//   //   if (state.lastResult !== -1 && state.data.removeWinning) {
//   //     state.available.splice(state.lastResult, 1);
//   //     state.lastResult = -1;
//   //   }
//   // },

//   // updateWheelSize: (state, size) => {
//   //   state.size = size;
//   // },
// };
