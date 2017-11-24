<template>
  <transition name="fade" @after-leave="$redrawVueMasonry">
    <div v-masonry-tile v-if="imageSrc" class="item">
      <div class="pin">
        <div class="pin__image-wrapper">
          <img class="pin__image" :src="imageSrc" alt="An Image">
          <div class="pin__action-buttons">
            <button v-if="userId === pin.author.uid" @click="deletePin" class="pin__btn pin__btn--delete">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
            <!-- <button  class="fav-btn">
              <i class="fa fa-star-o" aria-hidden="true"></i>
            </button> -->
            <button v-if="userId" @click="addLike" class="pin__btn pin__btn--like">
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="pin__info">
          <h2 class="pin__title">
            {{ pin.imageTitle }}
          </h2>
          <div class="pin__details">
            <div class="pin__top-details">
              <div @click="setPinFilter(pin.author.uid)" class="pin__author">
                <i class="fa fa-user-o" aria-hidden="true"></i>
                {{ pin.author.displayName }}
              </div>
            </div>
            <div class="pin__bottom-details">
              <div class="pin__details-text">
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                {{ pin.createdAt | displayTimeSince }}
              </div>
              <div class="pin__details-text">
                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                {{ pin.likesCount }} likes
              </div>
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
    setPinFilter(id) {
      this.$store.dispatch('setPinFilter', id);
      this.$store.dispatch('setActiveTab', 'none');
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

  &:hover &__image {
    filter: grayscale(60%);
  }

  &:hover &__action-buttons {
    opacity: 100;
  }

  &:hover &__author {
    color: $primary;
  }

  &__image-wrapper {
    position: relative;
    width: 100%;
  }

  &__image {
    transition: filter 0.5s;
    width: 100%;
  }

  &__action-buttons {
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    width: 50px;
    height: 50px;
    font-size: 18px;
    margin-right: 1rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 2px 4px 5px 0px rgba(41, 41, 41, 0.3);

    &--delete {
      background: $red;
    }

    &--fav {
      background: $yellow;
    }

    &--like {
      background: $green;
    }
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    width: 90%;
    margin: 0;
    border-bottom: 2px solid $secondary;
    padding-top: 13px;
    padding-bottom: 7px;
  }

  &__details {
    width: 90%;
    color: #7c7c7c;
    font-weight: 600;
  }

  &__bottom-details {
    display: flex;
    text-align: center;
    font-size: 13px;
  }

  &__details-text {
    padding: 0 10px 5px 5px;
  }

  &__author {
    padding: 5px 0 2px 5px;
    font-size: 14px;
    color: #7c7c7c;
    font-weight: 600;
    transition: color 0.3s;
    cursor: pointer;
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
