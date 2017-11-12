<template>
  <div class="item">
    <div v-masonry-tile class="pin">
      <img :src="pin.imageUrl" alt="An Image">
      <h2 class="title">{{ pin.imageTitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pin'],
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  padding: 5px;
  @media (min-width: 550px) {
    width: 50%;
  }
  @media (min-width: 900px) {
    width: 33.3333%;
  }
}

.pin {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
  }
  .title {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin: 0;
    background: $navbar-color;
    color: #fff;
    padding: 5px;
  }
}
</style>
