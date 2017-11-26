<template>
  <transition name="fade">
    <div @click="closeModal" class="modal__background">
      <img :src="image" alt="A fullscreen image" class="modal__image">
    </div>
  </transition>
</template>

<script>
export default {
  props: ['image'],
  methods: {
    closeModal() {
      this.$store.dispatch('toggleModal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__background {
    position: fixed;
    z-index: 10;
    height: 100vh;
    width: 100%;
    background-color: rgba(#000, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    max-height: 90%;
    max-width: 90%;
    transition: transform 0.2s;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
