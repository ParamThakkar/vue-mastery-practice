<template>
  <router-link :to="{ name: 'event-show', params: { id: event.id } }">
    <div class="event-card -shadow">
      <span class="eyebrow">@{{ event.time }} on {{ $filters.DateFilter(event.date) }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <span>{{ event.attendees.length }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props:{
    event:Object
  }
};
</script>

<style scoped>
h4 {
  color: red;
}

div {
  border: 1px solid black;
}
</style>
