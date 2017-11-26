<template>
  <div class="app">
    <app-header/>
    <app-nav/>
    <main class="main" :style="mainWidth">
      <transition name="fade" mode="out-in">
        <component :is="mainComponent"></component>
      </transition>
    </main>
    <app-modal v-if="modal.show" :image="modal.image" />
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { getProviderById, getValidCredential } from '@/firebaseHelpers';
import Header from './components/Header';
import Nav from './components/Nav';
import Pins from './components/Pins';
import AddPin from './components/AddPin';
import Modal from './components/Modal';

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
    appPins: Pins,
    appAddPin: AddPin,
    appModal: Modal,
  },
  computed: {
    ...mapGetters([
      'navbar',
      'modal',
      'mainComponent',
    ]),
    mainWidth() {
      return this.navbar
        ? { width: 'calc(100% - 5rem)', transform: 'translateX(5rem)' }
        : { width: 'calc(100% -5rem)', transform: 'translateX(2.5rem)' };
    },
  },
  created() {
    this.$store.dispatch('watchAuthState');
    this.onRedirectResult();
  },
  methods: {
    onRedirectResult() {
      firebase.auth().getRedirectResult()
        .then((result) => {
          this.addUserToDatabase(result.user);
          this.linkUserAccounts();
        })
        .catch((error) => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            this.handleCredentialError(error);
          }
        });
    },
    addUserToDatabase({ uid, displayName }) {
      const usersRef = firebase.database().ref('users');
      usersRef.once('value', (snap) => {
        if (!snap.hasChild(uid)) {
          usersRef.child(uid).set({ uid, displayName });
        }
      });
    },
    linkUserAccounts() {
      const credential = sessionStorage.getItem('credential');
      if (credential) {
        const validCredential = getValidCredential(JSON.parse(credential));
        firebase.auth().currentUser.linkWithCredential(validCredential)
          .then(() => {
            sessionStorage.removeItem('credential');
          });
      }
    },
    handleCredentialError({ email, credential }) {
      sessionStorage.setItem('credential', JSON.stringify(credential));
      firebase.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          const provider = getProviderById(providers[0]);
          firebase.auth().signInWithRedirect(provider);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/sanitize.scss/_sanitize";

html,
body,
.app {
  height: 100%;
}

body {
  color: $font-color;
  font-family: $base-font;
  line-height: 1.4;
  font-size: 16px;
  padding: 0;
  margin: 0;
  background: $background-color;
}

*:focus {
  outline: none;
}
</style>

<style lang="scss" scoped>
.main {
  position: absolute;
  transition: transform 0.5s;
  top: 73px;
  padding: 0.5rem;
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
