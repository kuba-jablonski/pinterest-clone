<template>
  <div class="modal">
    <div class="modal__background">
      <img :src="image" alt="A fullscreen image" class="modal__image">
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
};
</script>

<style lang="scss" scoped>
.modal {
  &__background {
    position: fixed;
    z-index: 10;
    height: 100vh;
    width: 100%;
    background-color: rgba(black, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__image {
    max-height: 90%;
    max-width: 90%;
  }
}
</style>
