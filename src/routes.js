import Todos from "./components/Todos.vue";
import CompletedTask from "./components/CompletedTask.vue";
import IncompletedTask from "./components/IncompletedTask.vue";

export const routes = [
    {
        path: "/",
        name: "todos-component",
        component: Todos
    },
    {
        path: "/completed",
        name: 'name:"completed-task-component"',
        component: CompletedTask,
    },
    {
        path: "/incompleted",
        name: "incompleted-task-component",
        component: IncompletedTask,
    },
];
