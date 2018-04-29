<template>
  <section class="todoapp" v-cloak>
    <header>
      <!-- <h1>todos</h1> -->
      <input class="toggle-all" type="checkbox" v-model="allDone" style="z-index:10;">
      <input class="new-todo" :class="{'index-new-todo':where=='index'}" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newTodo" @keyup.enter="addTodo">
    </header>
    <section class="main" :class="{'index-main':where=='index'}" v-show="todos.length" v-cloak>
      <!-- <ul class="todo-list"> -->
        <transition-group name="list-complete" class="todo-list" tag="ul">
          <li v-for="todo in filteredTodos" class="todo list-complete-item" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
          </li>
        </transition-group>
      <!-- </ul> -->
    </section>
    <footer v-if="where=='index'" class="footer clearfix" v-show="todos.length">
      <div style="display: flex;justify-content: space-between;">
        <span class="todo-count">
          <strong v-text="remaining"></strong> {{pluralize(remaining)}} left
        </span>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </div>
      <ul class="filters">
        <li>
          <a @click="filterByStatus('all')" :class="{ selected: visibility == 'all' }">All</a>
        </li>
        <li>
          <a @click="filterByStatus('active')" :class="{ selected: visibility == 'active' }">Active</a>
        </li>
        <li>
          <a @click="filterByStatus('completed')" :class="{ selected: visibility == 'completed' }">Completed</a>
        </li>
      </ul>
    </footer>
    <footer v-if="where=='index'" class="info">
      <p>DATA IS STORED LOCALLY</p>
      <p>Double-click to edit a todo</p>
      {{where}}
      <p>Written by
        <a href="http://evanyou.me">Evan You,</a>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </section>
</template>

<script>
// http://todomvc.com/examples/vue/
// Full spec-compliant TodoMVC with localStorage persistence

// localStorage persistence
const STORAGE_KEY = 'todos-vuejs-2.0'
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => (todo.id = index))
    todoStorage.uid = todos.length
    return todos
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
const filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed)
  }
}

export default {
  props: ['where'],
  // app initial state
  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return filters.active(this.todos).length
    },
    allDone: {
      get() {
        return this.remaining === 0
      },
      set(value) {
        this.todos.forEach(todo => (todo.completed = value))
      }
    }
  },

  filters: {
    pluralize(n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo() {
      let value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.unshift({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted() {
      this.todos = filters.active(this.todos)
    },

    pluralize(n) {
      return n === 1 ? 'item' : 'items'
    },
    filterByStatus(visibility) {
      if (filters[visibility]) {
        this.visibility = visibility
      } else {
        this.visibility = 'all'
      }
    }
  },

  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.list-complete-item {
  transition: all .3s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(-24px);
}
.list-complete-leave-active {
  position: absolute;
}

html,
body {
  margin: 0;
  padding: 0;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
  font-weight: 300;
}

button,
input[type="checkbox"] {
  outline: none;
}

.hidden {
  display: none;
}

.todoapp {
  max-width: 30vw;
  /* background: #fff; */
  /* margin: 100px 0 40px 0; */
  position: relative;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1); */
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  /* color: #666; */
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  /* color: #666; */
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  /* color: #666; */
}

.todoapp h1 {
  /* position: absolute;
  top: -155px; */
  width: 100%;
  height: 40px;
  font-size: 40px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  max-height: 50vh;
  overflow: auto;
  /* border-top: 1px solid #e6e6e6; */
}

label[for="toggle-all"] {
  display: none;
}

.toggle-all {
  position: absolute;
  top: 13px;
  left: 0px;
  width: 60px;
  height: 34px;
  text-align: center;
  border: none; /* Mobile Safari */
}

.toggle-all:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 13px 17px 12px 17px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
}

.todo-list li .toggle:checked:after {
  content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}

.todo-list li label {
  white-space: pre-line;
  word-break: break-all;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  /* display: none; */
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
  display: block;
  color: #af5b5e;
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  /* border-top: 1px solid #e6e6e6; */
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  /* float: left; */
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 10px;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a.selected,
.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  /* float: right; */
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 50px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }

  .toggle-all {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-appearance: none;
    appearance: none;
  }
}
@media (max-width: 993px) {
  .todoapp {
    max-width: 50vw;
  }
}

@media (max-width: 480px) {
  .footer {
    height: 50px;
  }

  .filters {
    /* bottom: 10px; */
  }

  .todoapp {
    max-width: 100vw;
  }

  .main {
    max-height: 30vh;
  }

  .new-todo {
    font-size: 16px;
  }
}
[v-cloak] {
  display: none;
}

.index-new-todo {
  border: 1px solid #ddd;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.index-main {
  max-height: fit-content;
  border: 1px solid #e6e6e6;
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>