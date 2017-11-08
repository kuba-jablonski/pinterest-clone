<template>
  <nav :class="{ hidden: !navbar }">
    <template v-if="authenticated === false">
      <div class="nav-head">
        Login
      </div>
      <a @click="signInWithProvider('google.com')" class="nav-item">
        <i class="fa fa-google fa-2x icon" aria-hidden="true"></i>
        Google
      </a>
      <a @click="signInWithProvider('github.com')" class="nav-item">
        <i class="fa fa-github fa-2x icon" aria-hidden="true"></i>
        Github
      </a>
      <a @click="signInWithProvider('twitter.com')" class="nav-item">
        <i class="fa fa-twitter fa-2x icon" aria-hidden="true"></i>
        Twitter
      </a>
    </template>
    <template v-if="authenticated">
      <a class="nav-item">
        <i class="fa fa-users fa-2x icon" aria-hidden="true"></i>
        Pins
      </a>
      <a class="nav-item">
        <i class="fa fa-user fa-2x icon" aria-hidden="true"></i>
        My Pins
      </a>
      <a class="nav-item">
        <i class="fa fa-plus fa-2x icon" aria-hidden="true"></i>
        Add Pin
      </a>
      <a @click="signOut" class="nav-item">
        <i class="fa fa-sign-out fa-2x icon" aria-hidden="true"></i>
        Signout
      </a>
    </template>
  </nav>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { getProviderById } from '@/firebaseHelpers';

export default {
  methods: {
    signInWithProvider(providerId) {
      const provider = getProviderById(providerId);
      firebase.auth().signInWithRedirect(provider);
    },
    signOut() {
      firebase.auth().signOut();
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
  position: relative;
  width: 5rem;
  min-height: 100%;
  background: $navbar-color;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.nav-head {
  color: #fff;
  font-weight: 500;
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
  color: #c9c9c9;
  text-transform: uppercase;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  width: 100%;
  margin: 1rem 0;
  transition: color 0.3s ease;
  .icon {
    display: block;
  }
  &:hover {
    color: #fff;
  }
}

.hidden {
  transform: translateX(-6rem);
}

.active {
  color: #fff;
}
</style>

