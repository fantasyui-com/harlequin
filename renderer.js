// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json');
const valkyrie = require(__dirname + '/valkyrie.json');

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

const contains = (list,item) => list.indexOf(item) !== -1;

$(function(){
  $('title').text(pkg.productName||pkg.name);
});


$(function(){




  const p1 = (name) => {
    var wad = new Wad({
        source       : `wave_modules/sonic-samples/${name}.flac`,
        panning      : [0, 1, 10],
        panningModel : 'HRTF',
        env     : {      // This is the ADSR envelope.
              attack  : 0.0,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
              decay   : 3.0,  // Time in seconds from peak volume to sustain volume.
              sustain : 0.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
              hold    : 1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
              release : .4     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
          },
    });
    wad.play()
  }
  const p2 = (name) => {
    var wad = new Wad({
        source       : `wave_modules/sonic-samples/${name}.flac`,
        panning      : [10, 1, 0],
        panningModel : 'HRTF',
        env     : {      // This is the ADSR envelope.
              attack  : 0.0,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
              decay   : 1.0,  // Time in seconds from peak volume to sustain volume.
              sustain : 1.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
              hold    : 3.14, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
              release : .4     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
          },
    });
    wad.play()
  }


  //p1('bass_trance_c')




  // Start the game loop
  // const songIntervalId = setInterval(songRun, (1000*60) / valkyrie[0].bpm );


  emitter.on('sound', (beat) => {

    // console.log(JSON.stringify( beat ));

    if(beat.bar === 0) p2('perc_snap');
    if(beat.bar === 1) p1('bass_drop_c');
    if(beat.bar === 2) p2('perc_snap2');
    if(beat.bar === 3) p1('elec_filt_snare');

    if(beat.bar === 1) p1('elec_pop');
    if(beat.bar === 2) p2('elec_pop');

    if( beat.bar === 0 && contains(beat.tags, 'open') ) p1('bass_hard_c');
    if( beat.bar === 1 && contains(beat.tags, 'dings') ) p1('tabla_ghe2');
    if( beat.bar === 2 && contains(beat.tags, 'dings') ) p2('tabla_ghe3');
    if( beat.bar === 3 && contains(beat.tags, 'dings') ) p1('tabla_ghe4');

    if( contains(beat.tags, 'rise') ) p1('tabla_ghe4');


  });


});

//
// /* * *
//   BODY DROP INIT
// * * */
//
// document.ondragover = document.ondrop = (ev) => {
//   ev.preventDefault();
// }
// document.body.ondrop = (ev) => {
//   ev.preventDefault()
//   const file = ev.dataTransfer.files[0].path;
//   emitter.emit('document-drop', {file})
// }
//
// emitter.on('background-color', (data) => {
//   $("body").css({background: data.color})
// });
//
// emitter.on('foreground-color', (data) => {
//   $("body").css({color: data.color})
// });
//
//
//
// /* * *
//   VUE COMPONENT EXAMPLE
// * * */

const store = new Vuex.Store({

  state: {
    position: 0,
    sound:valkyrie[0],
    song: valkyrie,
  },

  getters: {

     selectedMessageId: state => {
       return state.selectedMessageId;
     },

     inboxMessages: state => {
       return state.messages.filter(message => message.inbox)
     },

     inboxMessagesCount: (state, getters) => {
       return getters.inboxMessages.length
     },

     getMessageById: (state, getters) => (id) => {
       return state.messages.find(message => message.id === id)
     }

   },

  mutations: {

    increment (state) {
      state.position++;
      if((state.position+1)>state.song.length) state.position = 0;
      state.sound = state.song[state.position];
      emitter.emit('sound', state.sound)
    }

  },

  actions: {
    incrementAsync ({ commit }) {
      setInterval(() => {
        commit('increment')

      }, (1000*60) / valkyrie[0].bpm)
    }
  }

})










const Beat = {
  template: `<div>

  <div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="songPercent" aria-valuemin="0" aria-valuemax="100" v-bind:style="{ width: songPercent + '%' }"></div>
  </div>

  {{ position }}:{{bar}}, {{ tags }}
  </div>`,

  computed: {

    songPercent () {
      return this.$store.state.sound.songPercent
    },
    bar () {
      return this.$store.state.sound.bar
    },

    tags () {
      return this.$store.state.sound.tags.join();
    },

    position () {
      return this.$store.state.position
    }

  }

}


const app = new Vue({
  el: '#app',

  store,

  components: { Beat },

  template: `
    <div class="app border border-success p-3 m-3">
      Vuex Beat: <beat></beat>
    </div>
  `

})
//
// const appInboxMenu = new Vue({
//   el: '#app-inbox-menu',
//
//   store,
//
//   components: { Counter },
//
//   computed: {
//
//      inboxMessage () {
//       return this.$store.getters.getTodoById(this.$store.message);
//     },
//      inboxMessages () {
//       return this.$store.getters.inboxMessages
//     },
//     inboxMessagesCount () {
//       return this.$store.getters.inboxMessagesCount
//     }
//   },
//
//   template: `
//   <div>
//
//     <h5><i class="fa fa-inbox fa-1x text-secondary"></i> Inbox <span class="badge badge-danger">{{inboxMessagesCount}}</span></h5>
//
//      <div class="m-3">
//        <i class="fa fa-inbox text-secondary"></i> Support Questions <span class="badge badge-secondary">9</span>
//      </div>
//
//      <div class="m-3">
//        <i class="fa fa-inbox text-secondary"></i> Accounts Receivable <span class="badge badge-secondary">9</span>
//      </div>
//
//    </div>
//   `
//
// })
//
// const appInbox = new Vue({
//   el: '#app-inbox',
//
//   store,
//
//   components: { Counter },
//
//   methods: {
//     selectMessage (id) {
//       this.$store.commit('selectMessage', id)
//
//     },
//     isActive (message) {
//       return (message.id === this.$store.getters.selectedMessageId);
//     },
//   },
//
//   computed: {
//
//     inboxMessage () {
//       return this.$store.getters.getTodoById(this.$store.message);
//     },
//      inboxMessages () {
//       return this.$store.getters.inboxMessages
//     },
//     inboxMessagesCount () {
//       return this.$store.getters.inboxMessagesCount
//     }
//   },
//
//   template: `
//     <ul class="list-group mb-3">
//       <li v-for="message in inboxMessages" v-bind:class="{ 'list-group-item': true, 'active': isActive(message) } ">
//         <span v-on:click="selectMessage(message.id)" >{{ message.subject }}</span>
//       </li>
//     </ul>
//   `
//
// })
//
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
//
// var appTitle = new Vue({
//   el: '#app-title',
//   data: pkg
// });
//
//
//
//
// /* * *
//   JQUERY EXAMPLE
// * * */
//
// $(function(){
//   $('title').text(pkg.productName||pkg.name);
// });
//
//
//
//
// /* * *
//   INTERNAL API EXAMPLE
// * * */
//
// emitter.on('document-drop', (data) => {
//   alert('Dropped ' + data.file);
// });
//
//
//
//
// /* * *
//   INTERNAL API EXAMPLE
// * * */
//
// $(function(){
//
//
//   $( "#emitter-example-form" ).submit(function( event ) {
//     const eventName = $( "#event-name-select" ).val();
//     const color = $( "#example-color-input" ).val();
//     console.log((eventName, {color}))
//     emitter.emit(eventName, {color})
//     event.preventDefault();
//   });
//
//
// });
