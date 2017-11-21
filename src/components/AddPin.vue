<template>
  <form @submit.prevent="savePin">
    <h2 class="form-title"> Add a New Pin</h2>
    <label for="link">Image Url</label>
    <input :class="{'input--success': validImage, 'input--error': validImage === false}" v-model="imageUrl" type="text" name="link">
    <label for="title">Title</label>
    <input :class="{'input--success': validTitle, 'input--error': validTitle === false}" v-model="imageTitle" type="text" name="title">
    <button :disabled="!(validImage && validTitle)">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      imageTitle: '',
      validImage: null,
      validTitle: null,
    };
  },
  watch: {
    imageUrl(url) {
      if (this.verifyUrl(url)) {
        const img = new Image();
        img.onload = () => {
          this.validImage = true;
        };
        img.onerror = () => {
          this.validImage = false;
        };

        img.src = url;
      } else {
        this.validImage = false;
      }
    },
    imageTitle(title) {
      if (this.verifyTitle(title)) {
        this.validTitle = true;
      } else {
        this.validTitle = false;
      }
    },
  },
  methods: {
    savePin() {
      if (this.verifyUrl(this.imageUrl) && this.verifyTitle(this.imageTitle)) {
        this.$store.dispatch('savePin', {
          imageUrl: this.imageUrl,
          imageTitle: this.imageTitle,
        });
        this.$store.dispatch('setMainComponent', 'app-pins');
        this.$store.dispatch('setActiveTab', 'pins');
      }
    },
    verifyUrl(url) {
      return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    },
    verifyTitle(title) {
      return title.trim() !== '' && title.trim().length <= 100;
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
  border: 2px solid #ccc;
}

button {
  color: #fff;
  background: $primary;
  margin-top: 1rem;
  padding: 7px 14px;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
}

.input--error {
  border-color: $red;
}

.input--success {
  border-color: #8bc34a;
}
</style>
