<template>
  <form @submit.prevent="savePin">
    <h2 class="form-title"> Add a New Pin</h2>
    <input v-model="imageUrl" type="text" name="link" placeholder="Image Link">
    <input v-model="imageTitle" type="text" name="title" placeholder="Image Title">
    <button>Submit</button>
  </form>
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
form {
  background: #fff;
  width: 80%;
  max-width: 600px;
  padding: 1rem;
  margin: 1rem auto;
  .form-title {
    margin: 0;
    text-align: center;
    font-size: 20px;
  }
}

input {
  background: #fff;
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 5px 10px;
  border: 1px solid #ccc;
}

button {
  color: #fff;
  background: green;
  padding: 5px 10px;
}
</style>
