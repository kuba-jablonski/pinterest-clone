<template>
  <div class="app">
    <app-header/>
    <div class="display">
      <app-nav/>
      <main></main>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { getProviderById, getValidCredential } from '@/firebaseHelpers';
import Header from './components/Header';
import Nav from './components/Nav';

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
  },
  created() {
    this.$store.dispatch('watchAuthState');
    firebase.auth().getRedirectResult()
      .then(() => {
        const credential = sessionStorage.getItem('credential');
        if (credential) {
          const validCredential = getValidCredential(JSON.parse(credential));
          firebase.auth().currentUser.linkWithCredential(validCredential)
            .then(() => {
              sessionStorage.removeItem('credential');
            })
            .catch(() => {
              sessionStorage.removeItem('credential');
            });
        }
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          sessionStorage.setItem('credential', JSON.stringify(error.credential));
          firebase
            .auth()
            .fetchProvidersForEmail(error.email)
            .then((providers) => {
              const provider = getProviderById(providers[0]);
              firebase.auth().signInWithRedirect(provider);
            });
        }
      });
  },
};
</script>

<style lang="scss">
@import "../node_modules/sanitize.scss/_sanitize";
@import "src/assets/scss/_colors";
@import "src/assets/scss/_typography";

body {
  padding: 0;
  margin: 0;
  background: $background-color;
}

html,
body,
.app {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
}

.display {
  display: flex;
  flex-grow: 1;
}
</style>
