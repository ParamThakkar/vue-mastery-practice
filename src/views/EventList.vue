<template>
  <div>
    <h1>Event Listing Page For {{user.user.name}}</h1>
    <EventCard
      v-for="event in event.events"
      :key="event.id"
      :event="event"
    />
    <template v-if="page > 1">
      <router-link
        :to="{name:'event-list',query:{page:page-1}}"
        rel="prev"
      >Previous Page | </router-link>
    </template>
    <template v-if="hasNextPage">
      <router-link
        :to="{name:'event-list',query:{page:page+1}}"
        rel="prev"
      >Next Page</router-link>
    </template>
  </div>
</template>
<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
import store from '@/store'

function getEventPage(routeTo , next)
{
    var currentPage = parseInt(routeTo.query.page) || 1
    store
      .dispatch('event/fetchEvents', {
        page: currentPage,
      })
      .then(() => {
        routeTo.params.page = currentPage
        next()
      })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getEventPage(routeTo , next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getEventPage(routeTo , next)
  },
  computed: {
    hasNextPage() {
      return this.page * this.event.perPage < this.event.totalEvents
    },
    ...mapState(['event', 'user']),
    // ...mapState('user',['user'])
  },
}
</script>
