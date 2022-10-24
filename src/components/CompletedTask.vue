<template>
  <div class="todo-list">
    <ul v-if="isAuthenticated">
      <li v-for="todo in doneTodos" :key="todo.id">
        <span>{{ todo.title }}</span>
      </li>
    </ul>
    <p v-else style="text-align: center">Not authorised</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "completed-task-component",
  computed: mapGetters(["doneTodos", "isAuthenticated"]),
  methods: {
    ...mapActions(["getTodoAction"]),
  },
  created() {
    this.getTodoAction();
  },
};
</script>

<style scoped>
.todo-list ul {
  padding: 0 10px 10px 10px;
  list-style-type: none;
}
.todo-list ul li {
  padding: 10px;
  cursor: pointer;
  margin: 10px 0;
  color: white;
  border-radius: 4px;
  align-items: center;
  background-color: cadetblue;
}
</style>
