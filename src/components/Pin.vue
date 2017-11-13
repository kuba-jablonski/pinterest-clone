<template>
  <div class="item">
    <div v-masonry-tile class="pin">
      <img :src="pin.imageUrl" alt="An Image">
      <div class="pin-info">
        <h2 class="title">
          {{ pin.imageTitle }}
        </h2>
        <div class="bottom">
          <div class="details created">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            6 min ago
          </div>
          <div class=" details likes">
            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            6 likes
          </div>
        </div>
      </div>
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
  @media (min-width: 1300px) {
    width: 25%;
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
    transition: filter 0.3s ease;
  }
  .title {
    position: relative;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    width: 90%;
    margin: 0;
    border-bottom: 2px solid $secondary;
    padding: 5px;
  }
  .bottom {
    display: flex;
    width: 90%;
    text-align: center;
    padding: 5px 15px 5px 0;
    font-size: 13px;
    color: #7e7e7e;
    font-weight: 600;
    .details {
      padding: 5px;
    }
  }
  &:hover img {
    filter: grayscale(100%);
  }
}

.actions {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
