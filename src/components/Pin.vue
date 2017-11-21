<template>
  <transition name="fade" @after-leave="$redrawVueMasonry">
    <div v-masonry-tile v-if="imageSrc" class="item">
      <div class="pin">
        <div class="image-wrapper">
          <img :src="imageSrc" alt="An Image">
          <div class="actions-buttons">
            <button v-if="userId === pin.author.uid" @click="deletePin" class="delete-btn">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
            <!-- <button  class="fav-btn">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </button> -->
            <button v-if="userId" @click="addLike" class="like-btn">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>
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
              {{ pin.likesCount }} likes
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
      likeAdded: false,
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  mounted() {
    const img = new Image();
    img.onload = () => {
      this.imageSrc = this.pin.imageUrl;
    };

    img.src = this.pin.imageUrl;
  },
  methods: {
    deletePin() {
      this.$store.dispatch('deletePin', this.pin.id);
    },
    addLike() {
      if (!this.likeAdded) {
        this.likeAdded = true;
        this.$store.dispatch('addLike', this.pin.id);
      }
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
  &:hover {
    img {
      filter: grayscale(60%);
    }
    .actions-buttons {
      opacity: 100;
    }
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  img {
    transition: filter 0.5s;
    width: 100%;
  }
  .actions-buttons {
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 50px;
      height: 50px;
      font-size: 18px;
      margin-right: 1rem;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 2px 4px 5px 0px rgba(41, 41, 41, 0.3);
      &.delete-btn {
        background: $red;
      }
      &.fav-btn {
        background: $yellow;
      }
      &.like-btn {
        background: $green;
      }
    }
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

.fade-enter-active {
  transition: opacity 2s;
}
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
