<template>
  <div>
    <h1>Create Event Page</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Category"
        :options="categories"
        :value="event.category"
        @input-selected="(value)=>event.category=value"
        class="field"
        :class="{error:v$.event.category.$error}"
        @blur="v$.event.category.$touch()"
      />
      <template v-if="v$.event.category.$error">
        <p v-if="v$.event.category.required.$invalid">Category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        :value="event.title"
        @input-entered="(value)=>event.title=value"
        type="text"
        placeholder="Add a title"
        @blur="v$.event.title.$touch()"
      />
      <template v-if="v$.event.title.$error">
        <p v-if="v$.event.title.required.$invalid">Title is required</p>
      </template>

      <BaseInput
        label="Description"
        :value="event.description"
        @input-entered="(value)=>event.description=value"
        type="text"
        placeholder="Add a description"
        @blur="v$.event.description.$touch()"
      />
      <template v-if="v$.event.description.$error">
        <p v-if="v$.event.description.required.$invalid">Description is required</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        :value="event.location"
        @input-entered="(value)=>event.location=value"
        type="text"
        placeholder="Add a location"
        @blur="v$.event.location.$touch()"
      />
      <template v-if="v$.event.location.$error">
        <p v-if="v$.event.location.required.$invalid">Location is required</p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @blur="v$.event.date.$touch()"
        />
        <template v-if="v$.event.date.$error">
          <p v-if="v$.event.date.required.$invalid">Date is required</p>
        </template>
      </div>

      <BaseSelect
        label="Select a time"
        :options="times"
        :value="event.time"
        @input-selected="(value)=>event.time=value"
        class="field"
        @blur="v$.event.time.$touch()"
      />
      <template v-if="v$.event.time.$error">
        <p v-if="v$.event.time.required.$invalid">Time is required</p>
      </template>

      <!-- <input
        type="submit"
        class="button -fill-gradient"
        value="Submit"
      /> -->
      <BaseButton
        type="submit"
        class="button -fill-gradient"
        :disabled="v$.$error"
      >Submit</BaseButton>

    </form>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker'
import NProgress from 'nprogress'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      event: this.createFreshEventObject(),
      categories: this.$store.state.categories,
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
      },
    }
  },
  methods: {
    createEvent() {
      this.v$.$touch()
      if (!this.v$.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id },
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      var user = this.$store.state.user.user
      var id = Math.floor(Math.random() * 1000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
