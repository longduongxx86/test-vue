<template>
  <div class="todo-list">
    <ul v-if="isAuthenticated">
      <li v-for="todo in incompletedTodos" :key="todo.id">
        <span>{{ todo.title }}</span>
      </li>
    </ul>
    <p v-else style="text-align: center">Not authorised</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "incompleted-task-component",
  computed: mapGetters(["incompletedTodos", "isAuthenticated"]),
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
  border: 1px solid cadetblue;
  color: black;
}
</style>
