<template>
  <div>
    <form @submit.prevent="onUpdate" v-bind:class="{ isShow: isShow }">
      <!-- @focusout="hideUpdateFormMutation(id)" -->
      <input type="text" v-model="updateTitle" />
      <div class="btn-group">
        <input type="submit" value="Update" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "update-todo-component",
  props: {
    titleTodo: String,
    isShow: Boolean,
    id: Number,
    completed: Boolean,
  },
  data() {
    return {
      updateTitle: this.titleTodo,
    };
  },
  methods: {
    ...mapActions(["updateTodoAction"]),
    ...mapMutations(["hideUpdateFormMutation"]),
    onUpdate() {
      if (this.updateTitle.trim() === "") {
        alert("Khong duoc de trong");
      } else {
        this.updateTodoAction({
          id: this.id,
          title: this.updateTitle,
          completed: this.completed,
          isShow: false,
        });

        this.updateTitle = "";
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 10px;
  display: none;
}
input {
  display: block;
}
form.isShow {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-group {
  padding: 10px;
}
input[type="text"] {
  width: 70%;
  box-sizing: border-box;
  padding: 0 10px;
  margin: 6px 0;
  border: 0;
}

input[type="submit"] {
  margin: 10px auto;
  padding: 10px;
  border: 3px solid cadetblue;
  border-radius: 5px;
  transition: all 0.3s ea;
  cursor: pointer;
  display: inline-block;
}
input[type="submit"]:hover {
  border: 3px solid orange;
}
</style>
