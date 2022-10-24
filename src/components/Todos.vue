<template>
  <div class="todo-list">
    <TodoForm />
    <ul v-if="isAuthenticated">
      <li
        v-for="todo in todos"
        :key="todo.id"
        :class="todo.completed ? 'completed' : ''"
      >
        <span>{{ todo.title }}</span>
        <input
          type="checkbox"
          @click="markCompleteMutation(todo.id)"
          :checked="todo.completed"
        />
        <button @click="deleteTodoAction(todo.id)">Delete</button>
        <button
          @click="
            () => {
              todo.isShow = !todo.isShow;
            }
          "
        >
          Update
        </button>
        <UpdateTodo
          :titleTodo="todo.title"
          :isShow="todo.isShow"
          :id="todo.id"
          :completed="todo.completed"
        />
      </li>
    </ul>
    <p v-else class="logout">Not authorised</p>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TodoForm from "./TodoForm.vue";
import UpdateTodo from "./UpdateTodo.vue";

export default {
  name: "todos-component",
  components: { TodoForm, UpdateTodo },
  computed: mapGetters(["isAuthenticated", "todos"]),
  methods: {
    ...mapMutations(["markCompleteMutation"]),
    ...mapActions(["deleteTodoAction", "getTodoAction"]),
  },
  mounted() {
    console.log(this.$store.state.todos);
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
  overflow: scroll;
  height: 500px;
}
.todo-list ul li {
  padding: 10px;
  cursor: pointer;
  margin: 10px 0;
  border: 1px solid cadetblue;
  border-radius: 4px;
  align-items: center;
}
.todo-list li input[type="checkbox"] {
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
  float: right;
}

.todo-list li button {
  float: right;
  margin-right: 20px;
}

.todo-list li button:hover {
  cursor: pointer;
  background: red;
  color: white;
}

.todo-list li.completed {
  background: cadetblue;
  color: white;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: cadetblue;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

p.logout {
  text-align: center;
  color: cadetblue;
}
</style>
