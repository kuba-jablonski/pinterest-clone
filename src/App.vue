<template>
  <div class="app">
    <app-header/>
    <app-nav/>
    <main :style="mainWidth">
      <transition name="fade" mode="out-in">
        <component :is="mainComponent"></component>
      </transition>
    </main>
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

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
    appPins: Pins,
    appAddPin: AddPin,
  },
  computed: {
    ...mapGetters([
      'navbar',
      'mainComponent',
    ]),
    mainWidth() {
      return this.navbar
        ? { width: 'calc(100% - 5rem)', left: '5rem' }
        : { width: '100%', left: 0 };
    },
  },
  created() {
    this.$store.dispatch('watchAuthState');
    this.onRedirectResult();
    this.showNavOnDesktop();
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
    showNavOnDesktop() {
      if (window.innerWidth > 800) {
        this.$store.dispatch('toggleNav');
      }
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
.app {
  display: flex;
  flex-direction: column;
}

.display {
  display: flex;
  flex-grow: 1;
}

main {
  position: absolute;
  transition: all 0.3s;
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
