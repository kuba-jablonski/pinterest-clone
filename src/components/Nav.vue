<template>
  <transition name="slide" @after-leave="$redrawVueMasonry" @after-enter="$redrawVueMasonry">
    <nav v-show="navbar">
      <transition name="fade" mode="out-in">
        <div v-if="authenticated === false">
          <div class="nav-head ">
            Login
          </div>
          <a @click="signInWithProvider('google.com')" class="nav-item">
            <i class="fa fa-google fa-2x icon " aria-hidden="true "></i>
            Google
          </a>
          <a @click="signInWithProvider('github.com')" class="nav-item">
            <i class="fa fa-github fa-2x icon " aria-hidden="true "></i>
            Github
          </a>
          <a @click="signInWithProvider('twitter.com')" class="nav-item">
            <i class="fa fa-twitter fa-2x icon " aria-hidden="true "></i>
            Twitter
          </a>
        </div>
        <div v-if="authenticated">
          <a @click="toPins" class="nav-item" :class="{ active: activeTab === 'pins' }">
            <i class="fa fa-users fa-2x icon" aria-hidden="true"></i>
            Pins
          </a>
          <a @click="toMyPins" class="nav-item" :class="{ active: activeTab === 'user-pins' }">
            <i class="fa fa-user fa-2x icon" aria-hidden="true"></i>
            My Pins
          </a>
          <a @click="toAddPin" class="nav-item" :class="{ active: activeTab === 'add-pin' }">
            <i class="fa fa-plus fa-2x icon" aria-hidden="true"></i>
            Add Pin
          </a>
          <a @click="signOut" class="nav-item">
            <i class="fa fa-sign-out fa-2x icon" aria-hidden="true"></i>
            Signout
          </a>
        </div>
      </transition>
    </nav>
  </transition>
</template>

<script>
import firebase from 'firebase';
import { mapGetters, mapActions } from 'vuex';
import { getProviderById } from '@/firebaseHelpers';

export default {
  data() {
    return {
      activeTab: 'pins',
    };
  },
  methods: {
    ...mapActions([
      'setMainComponent',
      'setPinFilter',
    ]),
    signInWithProvider(providerId) {
      const provider = getProviderById(providerId);
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase.auth().signOut();
    },
    toPins() {
      this.setMainComponent('app-pins');
      this.setPinFilter('all');
      this.activeTab = 'pins';
    },
    toMyPins() {
      this.setMainComponent('app-pins');
      this.setPinFilter('setPinFilter', 'user');
      this.activeTab = 'user-pins';
    },
    toAddPin() {
      this.setMainComponent('app-add-pin');
      this.activeTab = 'add-pin';
    },
  },
  computed: {
    ...mapGetters([
      'navbar',
      'authenticated',
    ]),
  },
};
</script>


<style lang="scss" scoped>
nav {
  position: fixed;
  top: 73px;
  width: 5rem;
  min-height: 100%;
  background: $primary;
}

.nav-head {
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  width: 90%;
  border-bottom: 1px solid #fff;
  text-align: center;
  margin: 0 auto;
  padding-top: 1rem;
}

.nav-item {
  display: block;
  cursor: pointer;
  color: #ede7f6;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  width: 100%;
  margin: 1rem 0;
  padding-top: 5px;
  transition: color 0.3s ease;
  .icon {
    display: block;
  }
  &:hover {
    color: #fff;
  }
}

.active {
  color: #fff;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-6rem);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

