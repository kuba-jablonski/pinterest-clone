<template>
  <nav>
    <div class="nav-head">
      Login
    </div>
    <a class="nav-item">
      <i class="fa fa-google fa-2x icon" aria-hidden="true"></i>
      Google
    </a>
    <a class="nav-item">
      <i class="fa fa-facebook fa-2x icon" aria-hidden="true"></i>
      Facebook
    </a>
    <a class="nav-item">
      <i class="fa fa-twitter fa-2x icon" aria-hidden="true"></i>
      Twitter
    </a>
  </nav>
</template>

<style lang="scss" scoped>
@import 'src/assets/scss/_colors';

nav {
  width: 6rem;
  min-height: 100%;
  background: $navbar-color;
  grid-area: nav;
}

.nav-head {
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  width: 90%;
  border-bottom: 1px solid #fff;
  text-align: center;
  margin: 0 auto;
  padding-top: 1rem;
}

.nav-item {
  display: block;
  cursor: pointer;
  color: #c9c9c9;
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  width: 100%;
  margin: 1rem 0;
  .icon {
    display: block;
  }
  &:hover {
    color: #fff;
  }
}
</style>

