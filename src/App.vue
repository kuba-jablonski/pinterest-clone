<template>
  <div class="app">
    <app-header/>
    <div class="display">
      <app-nav/>
      <main>
        <router-view/>
      </main>
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
  flex-grow: 1;
  padding: 1rem;
}
</style>
