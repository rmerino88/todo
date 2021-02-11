import './css/styles.css';
// Cuando no indicamos la clase, el webapack busca el index.js
import { TodoList } from './js/classes';
// import { } from './js/classes/index.js';
// import { Todo } from './js/classes/todo.class.js';
// import { TodoList } from './js/classes/todo-list.class.js';
import { crearTodoHTML } from './js/componentes.js';

export { todoList };

const todoList = new TodoList();
// Cuando hacemos uso de forEach podemos enviar cada uno de los elementos
// a una función sin necesidad de => y ponemos el nombre del método sin ().
// Solo para métodos de un solo argumento.
todoList.todos.forEach( crearTodoHTML );
console.log(todoList);
/**
 * SessionStorage, la información alamcenada se borra en cuanto se cierra por completo elnavegador
 * LocalStorage, la información se mantine incluso aunque se reinicie la computadora
 * No se puede almaacenar anda que no sea un String, aunque se peude solventar
 */
// Para eliminar un valor
// localStorage.removeItem('todo-list');