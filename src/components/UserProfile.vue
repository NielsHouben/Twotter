<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">@{{ user.username }}</h1>
      <div class="user-profile_admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile_follower-ocunt"><strong>Followers: </strong> {{ followers }}</div>
      <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
        <label for="newTwoot"><strong>New Twoot</strong> ({{newTwootCharacterCount}}/180)</label>
        <textarea id="newTwoot" rows="4" v-model="newTwootContent"/>
    
        <div class="user-profile__create-twoot-type">
          <label for="newTwootType"><strong>Type: </strong></label>
          <select id="newTwootType">
            <option :value="option.value" v-for="(option, index) in twootTypes" :key="index">
              {{option.name}}
            </option>
          </select>
        </div>
        <button>
          Twoot!
        </button>
      </form>
    </div>
    <div class="user-profile_twoots-wrapper">
      <!-- <div class="user-profile_twoot" v-for="twoot in user.twoots" :key="twoot.id">
        {{ twoot.content }}
      </div> -->
      <twootItem 
        v-for="twoot in user.twoots" 
        :key="twoot.id" 
        :username="user.username" 
        :twoot="twoot" 
        @favourite="toggleFavourite" 
      />
    </div>
  </div>
</template>

<script>
import TwootItem from './twootItem';

export default {
  thisIsTrue: true,
  name: 'UserProfile',
  components: { TwootItem },
  data() {
    return {
      newTwootContent: '',
      selectedTwootType: 'instant',
      twootTypes: [
         { value: 'draft', name: 'Draft'},
         { value: 'instant', name: 'Instant'},
         ],

      followers: 0,
      user: {
        id: 1,
        username: '_NielsHouben',
        firstName: 'Niels',
        lastName: 'Houben',
        email: 'niels.houben1@gmail.com',
        isAdmin: true,
        twoots: [
          { id: 1, content: 'Twotter is Amazing!' },
          { id: 2, content: 'Opps I killed my cat' },
        ],
      },
    };
  },
  watch: {
    followers(newC, oldC) {
      if (oldC < newC) {
        console.log(`${this.user.username} has gained a follower`);
      }
    },
  },
  computed: {
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    }
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(`Favourited Tweet #${id}`);
    },
    createNewTwoot() {
      console.log(this.newTwootContent);
      if(this.selectedTwootType && this.newTwootContent !== 'draft') {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent
        })
      this.newTwootContent = ''
      }
    }
  },
  mounted() {
    this.followUser();
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    h1 {
      margin: 0;
    }
    
    .user-profile_admin-badge {
      background: green;
      color: white;
      border-radius: 5px;
      padding: 0 10px;
      font-weight: bold;
      margin: 5px;
      margin-left: 0;
      margin-right: auto;
    }

    .user-profile__create-twoot {
      display: flex;
      flex-direction: column;
      padding-top: 20px;

      &.--exceeded {
        color: red;
        border-color: red;
        button {
          background-color: red
        }
      }
    }

  }

  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px
  }
}


</style>
