<template>
  <div class="app">
    <app-header/>
    <div class="display">
      <app-nav></app-nav>
      <main></main>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import Nav from './components/Nav';

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
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

html,
body,
.app {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
}

.display {
  flex-grow: 1;
}
</style>
