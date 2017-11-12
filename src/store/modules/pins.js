import firebase from 'firebase';
import _ from 'lodash';

export default {
  state: {
    pins: [],
    initialPins: [
      {
        imageUrl: 'http://i.dailymail.co.uk/i/pix/2016/10/24/00/39A5CB6800000578-3865438-Blonde_ambition_Former_Maxim_cover_girl_Tegan_Martin_ranked_well-a-25_1477264278960.jpg',
        imageTitle: 'Margot Robbie',
        author: 'bob',
      },
      {
        imageUrl: 'https://i.pinimg.com/736x/25/cb/fa/25cbfae90383f49967861b12dacb51d8--emely-blunt-emily-blunt-movies.jpg',
        imageTitle: 'Emily Blunt',
        author: 'bob',
      },
      {
        imageUrl: 'http://dailyman40.com/wp-content/uploads/2013/07/emmy-rossum-hot-pic.jpg',
        imageTitle: 'Emily Rossum',
        author: 'bob',
      },
      {
        imageUrl: 'http://www.reckontalk.com/wp-content/uploads/2016/07/emilia-clarke-hot-photos-4.jpg',
        imageTitle: 'Emilia Clarke',
        author: 'bob',
      },
      {
        imageUrl: 'http://1.bp.blogspot.com/-3KXhWlQSnAk/UMrMgKb3kRI/AAAAAAAABi0/k1FZMK7jEoY/s1600/emma-stone-vogue-july2012-hot.jpg',
        imageTitle: 'Emma Stone',
        author: 'bob',
      },
      {
        imageUrl: 'https://i.pinimg.com/736x/b6/86/59/b686592baa67a6cee9ff80eb6b241fbd--gag-game-of.jpg',
        imageTitle: 'Emilia Clarke',
        author: 'bob',
      },
      {
        imageUrl: 'https://images-production.global.ssl.fastly.net/uploads/photos/file/230058/kendall-jenner-boys-lie-instagram-fhm-3.png',
        imageTitle: 'Kendall Jenner',
        author: 'bob',
      },
      {
        imageUrl: 'http://www.ozzienews.com/wp-content/uploads/2013/01/Megan-Fox-has-some-dignity.jpg',
        imageTitle: 'Megan Fox',
        author: 'bob',
      },
    ],
  },
  mutations: {
    CREATE_PINS_LIST: (state, pins) => {
      state.pins = pins;
    },
  },
  actions: {
    fetchPins: ({ commit }) => {
      firebase.database().ref('pins')
        .once('value', (snap) => {
          commit('CREATE_PINS_LIST', snap.val());
        });
    },
    savePin: (context, pin) => {
      const newPinRef = firebase.database().ref('pins').push();
      newPinRef.set(pin);
    },
  },
  getters: {
    pins: state => _.values(state.pins).reverse().concat(state.initialPins),
  },
};
