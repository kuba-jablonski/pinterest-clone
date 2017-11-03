<template>
  <div>
    <app-nav/>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  components: {
    appNav: Nav,
  },
};
</script>

<style lang="scss">
@import '../node_modules/sanitize.scss/_sanitize';

body {
  padding: 0;
  margin: 0;
}
</style>
