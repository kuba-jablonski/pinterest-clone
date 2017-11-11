<template>
  <div>
    <app-pin v-for="pin in pins" :key="pin.imageTitle" :pin="pin" />
  </div>
</template>

<script>
import Pin from './Pin';

export default {
  components: {
    appPin: Pin,
  },
  computed: {
    pins() {
      return this.$store.getters.pins;
    },
  },
  created() {
    this.$store.dispatch('fetchPins');
  },
};
</script>
