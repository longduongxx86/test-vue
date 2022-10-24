<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="title" />
    <div class="btn-group">
      <input type="submit" value="Add new" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "todo-form-component",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["addTodoAction"]),
    onSubmit() {
      if (this.title.trim() === "") {
        alert("Khong duoc de trong");
      } else {
        this.addTodoAction({
          id: Date.now(),
          title: this.title,
          completed: false,
          isShow: false,
        });

        this.title = "";
      }
    },
  },
};
</script>

<style scoped>
form {
  padding: 10px;
}
.btn-group {
  display: flex;
  justify-content: space-evenly;
}
input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
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
