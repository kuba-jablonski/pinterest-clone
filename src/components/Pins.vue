<template>
  <div class="grid" v-masonry transition-duration="1s" item-selector=".item">
    <app-pin v-for="pin in pins" :key="pin.id" :pin="pin" />
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
  margin: 0 auto;
  width: 100%;
}
</style>
