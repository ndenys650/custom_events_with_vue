const EventBus = new Vue();

const inputComponent = {
  // include v-model for two way data binding on what gets entered into input field
  template: `<input v-model="input" :placeholder="placeholder" @keyup.enter="monitorEnterKey" class="input is-small" type="text" />`,
  // pass props from parent component to this child
  props: ['placeholder'],
  data () {
    return {
      // data bound from v-model, always starts as an empty string
      input: ''
    }
  },
  methods: {
    // create first custom event for listening to enter key from input
    // retrieves information from v-model and creates a new timestamp
    monitorEnterKey() {
      EventBus.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString()
      });
      // reset input v-model to an empty string
      this.input = '';
    }
  }
}

new Vue({
  el: '#app',
  // create empty arrays to hold data that will be pushed from input
  data: {
    notes: [],
    timestamps: [],
    placeholder: 'Enter a note'
  },
  components: {
    'input-component': inputComponent
  },
  methods: {
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    }
  },
  created() {
    EventBus.$on('add-note', event => this.addNote(event));
  }
})
