<template>
  <form @submit.prevent="savePin">
    <!-- <img v-if="imageSrc" :src="imageSrc" alt="Image preview"> -->
    <h2 class="form-title"> Add a New Pin</h2>
    <label for="link">Image Url</label>
    <input v-model="imageUrl" type="text" name="link">
    <label for="title">Title</label>
    <input v-model="imageTitle" type="text" name="title">
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      imageTitle: '',
      // imageSrc: null,
    };
  },
  // watch: {
  //   imageUrl(url) {
  //     const img = new Image();
  //     img.onload = () => {
  //       this.imageSrc = url;
  //     };
  //     img.onerror = () => {
  //       this.imageSrc = null;
  //     };

  //     img.src = url;
  //   },
  // },
  methods: {
    savePin() {
      if (this.verifyUrl(this.imageUrl) && (this.imageTitle.trim() !== '')) {
        this.$store.dispatch('savePin', {
          imageUrl: this.imageUrl,
          imageTitle: this.imageTitle,
        });
        this.$store.dispatch('setMainComponent', 'app-pins');
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
  width: 90%;
  max-width: 600px;
  padding: 2rem;
  margin: 1rem auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  .form-title {
    margin: 0;
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 500;
  }
  label {
    display: block;
    margin-top: 1rem;
    padding: 2px 0;
    font-size: 14px;
    color: #7c7c7c;
    font-weight: 600;
  }
}

input {
  background: #fff;
  display: block;
  width: 100%;
  padding: 5px 10px;
  border: 1px solid #ccc;
}

button {
  color: #fff;
  background: $primary;
  margin-top: 1rem;
  padding: 7px 14px;
  &:hover {
    cursor: pointer;
  }
}
</style>
