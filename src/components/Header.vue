<template>
  <header>
    <div class="header-content">
      <i class="fa fa-bars menu" aria-hidden="true"></i>
      <h1 class="brand">Pinclone</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/_colors';

header {
  background: #fff;
  padding: 1rem 0;
  border-top: 5px solid $navbar-color;
}

.menu {
  font-size: 25px;
  height: 100%;
  cursor: pointer;
  width: 6rem;
  text-align: center;
}

.brand {
  display: inline-block;
  line-height: 1;
  margin: 0;
}
</style>
