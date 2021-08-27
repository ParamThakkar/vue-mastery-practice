<template>
  <div id="nav" class="nav">
    <router-link to="/">Home Page</router-link>
    <nav>
        <router-link :to="{ name: 'event-list' }">Event List</router-link> |
        <router-link :to="{ name: 'event-create' }">Create Event</router-link>
    </nav>
  </div>
</template>

<script>
export default {};
</script>
