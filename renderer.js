// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json');
const valkyrie = require(__dirname + '/valkyrie.json');

const samples = require(__dirname + '/node_modules/ultrasonic/index.json');

const EventEmitter = require('events');
const fs = require('fs');
const oneof = require('oneof');
const path = require('path');
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.setMaxListeners(100);

const contains = (list,item) => list.indexOf(item) !== -1;

$(function(){
  $('title').text(pkg.productName||pkg.name);
});




var mixerTrack = new Wad.Poly({

  recConfig : { // The Recorder configuration object. The only required property is 'workerPath'.
      workerPath : 'node_modules/web-audio-daw/src/Recorderjs/recorderWorker.js' // The path to the Recorder.js web worker script.
  },

  compressor : {
      attack    : .003, // The amount of time, in seconds, to reduce the gain by 10dB. This parameter ranges from 0 to 1.
      knee      : 30,   // A decibel value representing the range above the threshold where the curve smoothly transitions to the "ratio" portion. This parameter ranges from 0 to 40.
      ratio     : 12,   // The amount of dB change in input for a 1 dB change in output. This parameter ranges from 1 to 20.
      release   : .25,  // The amount of time (in seconds) to increase the gain by 10dB. This parameter ranges from 0 to 1.
      threshold : -24,  // The decibel value above which the compression will start taking effect. This parameter ranges from -100 to 0.
  },

  tuna   : {

      Chorus : {
          intensity: 0.2,  //0 to 1
          rate: 4,         //0.001 to 8
          stereoPhase: 160,  //0 to 180
          bypass: 0
      }
  },

  filter  : {
      type      : 'lowpass',
      frequency : 700,
      q         : 3
  },

  panning : 1
})




  const p1 = (file, options) => {

    var wad = new Wad({

        source       : file,
        panning      : -1,
        //panningModel : 'HRTF',
        env     : {      // This is the ADSR envelope.
              attack  : 0.0,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
              decay   : 3.0,  // Time in seconds from peak volume to sustain volume.
              sustain : 0.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
              hold    : 1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
              release : .4     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
          },
    });
    mixerTrack.add(wad)
    wad.play(options.play)
    console.log(options.play)
  }
  const p2 = (file, options) => {
    var wad = new Wad({

        source       : file,
        panning      : 1,
        //panningModel : 'HRTF',
        env     : {      // This is the ADSR envelope.
          attack  : 0.0,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
          decay   : 3.0,  // Time in seconds from peak volume to sustain volume.
          sustain : 0.0,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
          hold    : 1, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
          release : .4     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
          },
    });
    mixerTrack.add(wad)
    wad.play(options.play)
    console.log(options.play)
  }

//
//   //p1('bass_trance_c')
//
//
//
//
//   // Start the game loop
//   // const songIntervalId = setInterval(songRun, (1000*60) / valkyrie[0].bpm );
//
//
//   emitter.on('sound', (beat) => {
//
//     // console.log(JSON.stringify( beat ));
//
//     if(beat.bar === 0) p2('perc_snap');
//     if(beat.bar === 1) p1('bass_drop_c');
//     if(beat.bar === 2) p2('perc_snap2');
//     if(beat.bar === 3) p1('elec_filt_snare');
//
//     if(beat.bar === 1) p1('elec_pop');
//     if(beat.bar === 2) p2('elec_pop');
//
//     if( beat.bar === 0 && contains(beat.tags, 'open') ) p1('bass_hard_c');
//     if( beat.bar === 1 && contains(beat.tags, 'dings') ) p1('tabla_ghe2');
//     if( beat.bar === 2 && contains(beat.tags, 'dings') ) p2('tabla_ghe3');
//     if( beat.bar === 3 && contains(beat.tags, 'dings') ) p1('tabla_ghe4');
//
//     if( contains(beat.tags, 'rise') ) p1('tabla_ghe4');
//
//
//   });
//
//
// });

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
    sound:valkyrie.data[0],
    song: valkyrie,
    samples,
    frequencies: Object.keys(Wad.pitches).map(note => ({ note, frequency:Wad.pitches[note]}) ),
    instruments:[
      {"debug":false, "name":"Ambience","selectedTags":["playing"], "selectedFrequency":[400],"selectedBars":[0],"selectedSamples":["node_modules/ultrasonic/ambi_haunted_hum.flac","node_modules/ultrasonic/ambi_lunar_land.flac"]},
      {"debug":false, "name":"Kick","selectedTags":["playing"], "selectedFrequency":[400],"selectedBars":["0","2","4","6"],"selectedSamples":["node_modules/ultrasonic/elec_blip.flac","node_modules/ultrasonic/elec_blip2.flac"]},
      {"debug":false, "name":"Snare","selectedTags":["playing"], "selectedFrequency":[400],"selectedBars":[1,3,5,7],"selectedSamples":["node_modules/ultrasonic/bd_ada.flac","node_modules/ultrasonic/bd_fat.flac"]},
      {"debug":false, "name":"Drums","selectedTags":["playing"], "selectedFrequency":[400],"selectedBars":[0,1,2,5,7],"selectedSamples":["node_modules/ultrasonic/bd_tek.flac","node_modules/ultrasonic/bd_zum.flac","node_modules/ultrasonic/drum_bass_hard.flac"]},

      {"debug":false,"name":"Sample #1","selectedTags":["playing"], "selectedFrequency":[400],"selectedBars":[0,2,4,6],"selectedSamples":["node_modules/ultrasonic/elec_blup.flac","node_modules/ultrasonic/elec_fuzz_tom.flac","node_modules/ultrasonic/elec_plip.flac","node_modules/ultrasonic/elec_tick.flac","node_modules/ultrasonic/elec_twip.flac","node_modules/ultrasonic/misc_crow.flac"]},
      {debug:false, "name":"Sample #2", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[0,2,4,6], "selectedSamples":[] },
      {debug:false, "name":"Sample #3", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[1,3,5,7], "selectedSamples":[] },
      {debug:false, "name":"Sample #4", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[0,2,4,6], "selectedSamples":[] },
      {debug:false, "name":"Sample #5", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[1,3,5,7], "selectedSamples":[] },
      {debug:false, "name":"Sample #6", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[0,2,4,6], "selectedSamples":[] },
      {debug:false, "name":"Sample #7", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[1,3,5,7], "selectedSamples":[] },
      {debug:false, "name":"Sample #8", "selectedTags":["playing"], "selectedFrequency":[400], "selectedBars":[0,2,4,6], "selectedSamples":[] },

    ],
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
      if((state.position+1)>state.song.data.length) {
        state.position = 0;
        emitter.emit('song-end')
      }
      state.sound = state.song.data[state.position];
      emitter.emit('sound', state.sound)
    }

  },

  actions: {
    incrementAsync ({ commit }) {
      setInterval(() => {
        commit('increment')

      }, (1000*60) / valkyrie.meta.bpm)
    }
  }

})










const ProgressCard = {
  template: `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">{{title}} Pattern <span class="text-muted">by {{author}}</span></h4>
      <p class="card-text">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated pa-1" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100" :style="{ width: percent + '%' }"><span v-show="percent>9">{{percent}}%</span></div>
      </div>
      </p>
      <p class="card-text"><small class="text-muted">Progress {{percent}}%</small></p>
    </div>
  </div>
  `,
  computed: {
    title () {
      return this.$store.state.song.meta.title
    },
    author () {
      return this.$store.state.song.meta.author
    },
    percent () {
      return this.$store.state.sound.songPercent
    },
  }
}




const MeasureCard = {
  template: `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title"> <span class="text-muted"> {{bars}} Measures</span>, Bar {{bar}}</h4>
      <p class="card-text">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated pa-1" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100" :style="{ width: percent + '%' }"><span v-show="percent>9">{{percent}}%</span></div>
      </div>
      </p>
      <p class="card-text"><small class="text-muted">Measure Progress {{percent}}%</small></p>
    </div>
  </div>
  `,
  computed: {
    bar () {
      return this.$store.state.sound.bar
    },
    bars () {
      return this.$store.state.song.meta.bars
    },
    percent () {
      return this.$store.state.sound.barPercent
    },
  }
}




const TagCard = {
  template: `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Tag State</h4>
      <p class="card-text">
        <span v-for="tag in tags">
          <span class="text-uppercase d-inline-block badge badge-pill badge-secondary py-2 px-3 m-1">{{tag}}</span>
        </span>
      </p>
      <p class="card-text"><small class="text-muted">Total {{count}}</small></p>
    </div>
  </div>
  `,
  computed: {

    tags () {
      return this.$store.state.sound.tags
    },
    count () {
      return this.$store.state.sound.tags.length
    },
  }
}

const RecordCard = {
  template: `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Wave Recorder</h4>

      <div class="btn-group" role="group" aria-label="Basic example">

       <button v-show="recording === false"   v-on:click="record" type="button" class="btn btn-secondary" title="Start Recording"><i class="fas fa-3x fa-microphone"></i></button>

       <button   v-show="recording === true" v-on:click="save" type="button" class="btn btn-success" title="Stop Recording and Save"><i class="fas fa-3x fa-save"></i></button>

     </div>
     <p class="card-text"><small v-show="recording" class="text-muted">{{fileName}}</small></p>

    </div>
  </div>
  `,
  data: function() {
    return {
        recording: false,
        fileName: `session-${(new Date).getTime()}.wav`,
    }
  },
  methods: {

    record: function () {
      this.recording = true;
      this.fileName = `session-${(new Date).getTime()}.wav`;
      mixerTrack.rec.record()
      emitter.on('song-end', () => {
        if(this.recording) this.save();
      });

    },

    save: function () {
      this.recording = false;
      const fileName = this.fileName;
      mixerTrack.rec.exportWAV(function(wavBlob,x){
        console.log(wavBlob)

        // var foo = new Uint8Array( wavBlob );
        // console.log(foo);
        //
        // //var buf = Buffer.from( );
        // var buffer = Buffer.from( new Uint8Array(wavBlob) );
        // console.log(buffer);


        var reader = new FileReader();
        reader.addEventListener("loadend", function() {
           // reader.result contains the contents of blob as a typed array

        var buffer = new Buffer(reader.result, "binary");

         fs.writeFile(fileName, buffer, function(err) {
           if(err) {
             console.log("err", err);
           } else {
             //return res.json({'status': 'success'});
           }
         });

       });
       reader.readAsArrayBuffer(wavBlob);



      })
    },
  },

  computed: {

    tags () {
      return this.$store.state.sound.tags
    },
    count () {
      return this.$store.state.sound.tags.length
    },
  }

}

const SampleCard = {
  template: `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title" v-on:click="debug = !debug">{{name}}</h4>
      <p class="card-text">

      <form>
        <div class="form-row">
          <div class="col">
            <select multiple class="form-control" v-model="selectedTags">
               <option v-for="tag in tags">{{tag}}</option>
            </select>
          </div>

          <div class="col">
            <select multiple class="form-control" v-model="selectedBars">
               <option v-for="bar in bars">{{bar}}</option>
            </select>
          </div>

          <div class="col">
            <select multiple class="form-control" v-model="selectedSamples">
               <option v-for="sample in samples" :value="sample.file">{{sample.name}}</option>
            </select>
          </div>

          <div class="col">
            <select multiple class="form-control" v-model="selectedFrequency">
               <option v-for="entry in frequencies" :value="entry.note">{{entry.note}}:{{entry.frequency}}</option>
            </select>
          </div>

        </div>
      </form>

      </p>
      <p class="card-text"><small v-show="debug" class="text-muted">{{ dump }}</small></p>
    </div>
  </div>
  `,

  props: ['configuration'],
  data: function() {
    return this.configuration
  },

  computed: {

    dump () {
      return JSON.stringify(this.configuration, null);
    },

    tags () {
      return this.$store.state.song.meta.tags
    },
    frequencies () {
      return this.$store.state.frequencies
    },
    samples () {
      return this.$store.state.samples.data
    },
    bars () {
      const repeat = count => {const response = []; for(var i=0;i<count;i++){response.push(i)}; return response;}
      return repeat(this.$store.state.song.meta.bars)
    },
    // name () {
    //   return this.configuration.name
    // },
  },

  created() {
    const intersection = (a, b) => { const s = new Set(b); return a.filter(x => s.has(x)); };

    emitter.on('sound', (beat) => {

      let barMatch = false;
      let tagMatch = false;
      // if within my tags, is the beat that arrived via emitter...
      if( this.selectedBars && this.selectedBars.map(i=>parseInt(i)).indexOf( beat.bar ) !== -1 ){
        barMatch = true;
      }
      if( this.selectedTags && (intersection(this.selectedTags, beat.tags).length == this.selectedTags.length) ){
        tagMatch = true;
      }

      if(barMatch && tagMatch && this.selectedSamples.length){

        //this.selectedSamples.forEach(sample=>p1(sample))
        const options = {play:{}}

        if (this.selectedFrequency.length){
          options.play.detune = 1900
        }
        oneof([p1,p2])(oneof(  this.selectedSamples), options)


      }


    });
  }

}






const Beat = {
  template: `<span>
  {{ position }}:{{bar}}, {{ tags }}
  </span>`,

  computed: {


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

  components: {
    ProgressCard,
    MeasureCard,
    TagCard,
    SampleCard,
    RecordCard,
  },

  template: `

    <div class="container">

    <div class="row py-3">
      <div class="col py-3">
        <div class="card-deck">
          <progress-card></progress-card>
          <measure-card></measure-card>
        </div>
      </div>
    </div>

    <div class="row py-3">
      <div class="col py-3">
        <div class="card-deck">
          <tag-card></tag-card>
          <record-card></record-card>
        </div>
      </div>
    </div>

    <div class="row py-3">
      <div class="col py-3">
        <div v-for="instrument in instruments">
          <div class="mb-3 pb-3">
            <sample-card :configuration="instrument"></sample-card>
          </div>
        </div>
      </div>
    </div>

    </div>
  `,
  computed: {
    instruments () {
      return this.$store.state.instruments;
    },
  }

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
