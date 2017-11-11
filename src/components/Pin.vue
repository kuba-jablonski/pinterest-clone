<template>
  <div>
    <img :src="pin.imageUrl" alt="An Image">
  </div>
</template>

<script>
export default {
  props: ['pin'],
};
</script>

<style lang="scss" scoped>
img {
  width: 200px;
}
</style>
