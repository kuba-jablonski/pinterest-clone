<template>
  <header>
    <div class="header-content">
      <h1 class="brand">Pinclone</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/_colors';

header {
  background: #fff;
  border-top: 5px solid $navbar-color;
}

.header-content {
  padding: 1rem 2rem;
}

.brand {
  line-height: 1;
  margin: 0;
}
</style>
