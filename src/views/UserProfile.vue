
<template>
  <div class="user-profile">
    <div class="user-profile__sidebar">
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ state.user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{ state.followers }}
        </div>
      </div>
      <CreateTwootPanel @add-twoot="state.addTwoot"/>
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
          v-for="twoot in state.user.twoots"
          :key="twoot.id"
          :username="state.user.username"
          :twoot="twoot"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue"
import { useRoute } from "vue-router"
import {users} from "../assets/users"
import TwootItem from "../components/twootItem";
import CreateTwootPanel from "../components/createTwootPanel";

export default {
  thisIsTrue: true,
  name: 'UserProfile',
  components: { CreateTwootPanel, TwootItem },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId)

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0],
    })
    function addTwoot(twoot) {
      this.user.twoots.unshift( {id: this.user.twoots.length + 1, content: twoot} );
    }
    return { 
      state,
      addTwoot,
      userId,
    }
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;

  .user-profile__user-panel {
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
    
    .user-profile__admin-badge {
      background-color: green;
      color: white;
      border-radius: 5px;
      margin: auto;
      padding: 0 10px;
      font-weight: bold;
    }

    .user-profile__twoots-wrapper {
      display: grid;
      grid-gap: 10px;
      margin-bottom: auto;
    }
  }


}


</style>
