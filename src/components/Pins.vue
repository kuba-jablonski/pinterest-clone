<template>
  <div class="grid">
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

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  justify-items: center;
  grid-auto-flow: dense;
  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
