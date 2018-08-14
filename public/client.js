// Vue and Axios have been loaded in the html before this file, 
// so we have access to those libraries by the time this file is loaded
const URL = 'https://strychemi-exercise-tracker.glitch.me/';

Vue.component('create-username', {
  template: 
  `<div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Create a Username</h5>
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" placeholder="Username" v-model="username">
        </div>
        <button type="submit" class="btn btn-primary" @click='submit'>Submit</button>
        <br>
      </div>
    </div>

    <div ref="alert-container" v-if="alert">
      <div class="alert alert-dismissible fade show" v-bind:class="typeOfAlert" role="alert">
        {{ message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click='toggleAlert'>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

  </div>`,
  data() {
    return {
      username: '',
      alert: false,
      success: false,
      message: ''
    }
  },
  computed: {
    typeOfAlert() {
      return this.success ? 'alert-success' : 'alert-danger';
    }
  },
  methods: {
    submit() {
      let alertContainer = this.$refs['alert-container'];
      axios.post('/user', {
        username: this.username
      })
      .then((res) => {
        console.log(res);
        this.alert = true;
        if (res.data.error) {
          this.success = false;
          this.message = res.data.error;
        } else {
          this.success = true;
          this.message = `Success! Username '${res.data.username}' created!`;
        }
      })
      .catch((err) => {
        this.alert = true;
        this.success = false;
        this.message = err;
      });
    },
    toggleAlert() {
      this.alert = !this.alert;
    }
  }
});

Vue.component('add-exercise', {
  template: 
  `<div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Add Exercise</h5>
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input class="form-control" placeholder="Description" v-model="description">
        </div>
        <div class="form-group">
          <label for="duration">Duration (mins)</label>
          <input class="form-control" placeholder="Duration (mins)" v-model="duration">
        </div>
        <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
      </div>
    </div>

    <div ref="alert-container" v-if="alert">
      <div class="alert alert-dismissible fade show" v-bind:class="typeOfAlert" role="alert">
        {{ message }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click='toggleAlert'>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>

  </div>`,
  data() {
    return {
      username: '',
      description: '',
      duration: 0,
      alert: false,
      success: false,
      message: ''
    }
  },
  computed: {
    typeOfAlert() {
      return this.success ? 'alert-success' : 'alert-danger';
    }
  },
  methods: {
    submit() {
      let alertContainer = this.$refs['alert-container'];
      axios.post('/exercise', {
        username: this.username,
        description: this.description,
        duration: this.duration
      })
      .then((res) => {
        this.alert = true;
        if (res.data.error) {
          this.success = false;
          this.message = res.data.error;
        } else {
          this.success = true;
          this.message = `Success! Exercise '${this.description}' added!`;
        }
      })
      .catch((err) => {
        this.alert = true;
        this.success = false;
        this.message = err;
      });
    },
    toggleAlert() {
      this.alert = !this.alert;
    }
  }
});

Vue.component('track-exercises', {
  template: 
  `<div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Track Exercises</h5>
        <div class="form-group">
          <label for="username">Username</label>
          <input class="form-control" placeholder="Username" v-model="username">
        </div>
        <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="exercise in exercises">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ exercise.description }}</h5>
          <small>{{ exercise.date }}</small>
        </div>
        <p class="mb-1">{{ exercise.duration }} mins</p>
      </li>
    </ul>
  </div>`,
  data() {
    return {
      username: '',
      exercises: []
    }
  },
  methods: {
    submit() {
      let alertContainer = this.$refs['exercises-container'];
      axios.get('/user', {
        params: {
          username: this.username
        }
      })
      .then((res) => {
        this.exercises = res.data;
      })
      .catch((err) => {
        
      });
    }
  }
});


const app = new Vue({
  el: "#app",
  methods: {
    
  }
});