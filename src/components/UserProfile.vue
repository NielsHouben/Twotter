<template>
  <div class="user-profile">
    <div class="user-profile_user-panel">
      <h1 class="user-profile_username">@{{ user.username }}</h1>
      <div class="user-profile_admin-badge" v-if="user.isAdmin">Admin</div>
      <div class="user-profile_follower-ocunt"><strong>Followers: </strong> {{ followers }}</div>
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
  name: 'UserProfile',
  components: { TwootItem },
  data() {
    return {
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
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(`Favourited Tweet #${id}`);
    },
  },
  mounted() {
    this.followUser();
  },
};
</script>

<style>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;
}

.user-profile_user-panel {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #dfe3e8;
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

h1 {
  margin: 0;
}
</style>
