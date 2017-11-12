<template>
  <header>
    <div class="header-content">
      <i @click="toggleNav" class="fa fa-bars menu" aria-hidden="true"></i>
      <h1 class="brand">Pinclone</h1>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleNav() {
      this.$store.commit('TOGGLE_NAV');
    },
  },
};
</script>


<style lang="scss" scoped>
header {
  background: #fff;
  padding: 1rem 0;
  border-top: 5px solid $navbar-color;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.menu {
  font-size: 25px;
  height: 100%;
  cursor: pointer;
  width: 5rem;
  text-align: center;
}

.brand {
  display: inline-block;
  line-height: 1;
  margin: 0;
}
</style>
