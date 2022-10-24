import axios from "axios";

const todos = {
  state: {
    todos: [],
  },

  getters: {
    todos: (state) => state.todos,

    doneTodos: (state) => state.todos.filter((todo) => todo.completed),

    incompletedTodos: state => state.todos.filter(todo => !todo.completed),

    progress: (state, getters) => {
      const doneTodos = getters.doneTodos;
      return Math.round((doneTodos.length * 100) / state.todos.length);
    },
  },

  mutations: {
    markCompleteMutation(state, todoId) {
      state.todos.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }

        return todo;
      });
    },

    deleteTodoMutation(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },

    addTodoMutation(state, newTodo) {
      state.todos.unshift(newTodo);
    },

    setTodoMutation(state, todos) {
      const newTodos = todos.map((todo) => {
        return { ...todo, isShow: false };
      });
      state.todos = newTodos;
    },

    updateTodoMutation(state, updateTodo) {
      let index = state.todos.findIndex((todo) => todo.id === updateTodo.id);

      state.todos[index].title = updateTodo.title;
      state.todos[index].isShow = updateTodo.isShow;
    },

    hideUpdateFormMutation(state, id) {
      let index = state.todos.findIndex((todo) => todo.id === id);
      state.todos[index].isShow = false;
    },
  },

  actions: {
    async deleteTodoAction({ commit }, todoId) {
      try {
        commit("deleteTodoMutation", todoId);
        await axios.delete(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`
        );
      } catch (error) {
        console.log(error);
      }
    },

    async addTodoAction({ commit }, newTodo) {
      try {
        const { id, title, completed } = newTodo;
        commit("addTodoMutation", newTodo);
        await axios.post(`https://jsonplaceholder.typicode.com/todos`, {
          id,
          title,
          completed,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getTodoAction({ commit }) {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=15"
        );
        commit("setTodoMutation", res.data);
      } catch (error) {
        console.log(error);
      }
    },

    async updateTodoAction({ commit }, updateTodo) {
      try {
        const { id, ...others } = updateTodo;
        commit("updateTodoMutation", updateTodo);
        await axios.put(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          others
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default todos;
