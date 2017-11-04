<template>
  <div>
    <app-header/>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: {
    appHeader: Header,
  },
};
</script>

<style lang="scss">
@import '../node_modules/sanitize.scss/_sanitize';
@import 'src/assets/scss/_colors';
@import 'src/assets/scss/_typography';

body {
  padding: 0;
  margin: 0;
  background: $background-color;
}
</style>
