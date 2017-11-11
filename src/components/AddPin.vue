<template>
  <div class="container">
    <h2>Add a New Pin</h2>
    <form @submit.prevent="savePin">
      <div class="inline-input">
        <label for="link">Link</label>
        <input v-model="imageUrl" type="text" name="link">
      </div>
      <div class="inline-input">
        <label for="title">Title</label>
        <input v-model="imageTitle" type="text" name="title">
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      imageUrl: '',
      imageTitle: '',
    };
  },
  methods: {
    savePin() {
      if (this.verifyUrl(this.imageUrl) && (this.imageTitle.trim() !== '')) {
        const newPinRef = firebase.database().ref('pins').push();
        newPinRef.set({
          imageUrl: this.imageUrl,
          imageTitle: this.imageTitle,
          author: this.$store.getters.userId,
        });
      }
    },
    verifyUrl(url) {
      return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
}

input {
  background: #fff;
  border: 1px solid $navbar-color;
}

button {
  border: 1px solid $navbar-color;
}
</style>
