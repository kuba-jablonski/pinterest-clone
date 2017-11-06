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
import Header from './components/Header';
import Nav from './components/Nav';

export default {
  components: {
    appHeader: Header,
    appNav: Nav,
  },
  created() {
    this.$store.dispatch('watchAuthState');
    firebase
      .auth()
      .getRedirectResult()
      .then(() => {
        console.log('Fetching credential');
        const credential = sessionStorage.getItem('credential');

        if (credential) {
          console.log('Found credential, linking user...');
          const { accessToken } = JSON.parse(credential);
          const validCredential = firebase.auth.GithubAuthProvider.credential(accessToken);
          firebase.auth().currentUser.linkWithCredential(validCredential)
            .then((user) => {
              console.log(user);
              console.log('Removing credential');
            })
            .catch(error => console.log(error));
        } else {
          console.log('No credential');
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.log('Account exists with different credential.. Logging with Google');
          sessionStorage.setItem('credential', JSON.stringify(error.credential));
          firebase
            .auth()
            .fetchProvidersForEmail(error.email)
            .then((providers) => {
              if (providers.includes('google.com')) {
                firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
              }
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
  flex-grow: 1;
}
</style>
