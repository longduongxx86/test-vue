<template>
  <div class="navbar">
    <h2>My Vuex To do list App</h2>
    <ul>
      <li><router-link to="/">All task</router-link></li>
      <li><router-link to="/completed">Completed task</router-link></li>
      <li><router-link to="/incompleted">Incompleted task</router-link></li>
      <li v-if="isAuthenticated">
        <button @click="toogleAuthMutation">Logout</button>
      </li>
      <li v-else><button @click="toogleAuthMutation">Login</button></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "navbar-component",
  computed: mapGetters(["isAuthenticated", "todos"]),
  methods: mapMutations(["toogleAuthMutation"]),
};
</script>

<style scoped>
h2{
  color:cadetblue;
  padding-bottom: 20px;
}
.navbar {
  padding: 5px;
  text-align: center;
  background: rgb(240, 240, 240);
  color: black;
}

.navbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  padding: 0;
}

a {
  text-decoration: none;
  padding: 10px;
  background-color: white;
  color: cadetblue;
  border-radius: 5px;
}
a.router-link-exact-active {
  color: white;
  background-color: cadetblue;
}
</style>
