<template>
  <div class="card">
    <img :src="pin.imageUrl" alt="An Image">
    <h2 class="title">{{ pin.imageTitle }}</h2>
  </div>
</template>

<script>
export default {
  props: ['pin'],
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
  }
  .title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
}
</style>
