<template>
  <transition name="fade">
    <div v-masonry-tile v-if="imageSrc" class="item">
      <div class="pin">
        <img :src="imageSrc" alt="An Image">
        <div class="pin-info">
          <h2 class="title">
            {{ pin.imageTitle }}
          </h2>
          <div class="details">
            <div class="created">
              <i class="fa fa-clock-o" aria-hidden="true"></i>
              {{ pin.createdAt | displayTimeSince }}
            </div>
            <div class="likes">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
              {{ pin.likes }} likes
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import moment from 'moment';

export default {
  props: ['pin'],
  data() {
    return {
      imageSrc: null,
    };
  },
  mounted() {
    const img = new Image();
    img.onload = () => {
      this.imageSrc = this.pin.imageUrl;
    };

    img.src = this.pin.imageUrl;
  },
  methods: {
    addLike() {
      // todo
    },
  },
  filters: {
    displayTimeSince(date) {
      return moment(date).from(moment());
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  padding: 10px;
  transition: opacity 2s;
  @media (min-width: 550px) {
    width: 50%;
  }
  @media (min-width: 900px) {
    width: 33.3333%;
  }
  @media (min-width: 1330px) {
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
  }
}

.pin-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    width: 90%;
    margin: 0;
    border-bottom: 2px solid $secondary;
    padding-top: 10px;
    padding-bottom: 5px;
  }
  .details {
    display: flex;
    width: 90%;
    text-align: center;
    padding: 5px 0;
    font-size: 13px;
    color: #7c7c7c;
    font-weight: 600;
    .created,
    .likes {
      padding: 5px 10px 5px 5px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
