import { Todo } from './todo.class.js';
import { crearTodoHTML } from './../componentes.js';

export class TodoList {

    constructor() {
        // Esto no existe, da error
        // this.todos = Todo[0];
        //this.todos = [];
        this.todos = this.loadFromLocalStorage().map(Todo.fromJson);
        // this.todos = this.todos.map( Todo.fromJson );

    }

    nuevo(todo) {
        this.todos.push(todo);
        this.saveInLocalStorage();
    }

    nuevoTodo(tarea) {
        this.todos.push(new Todo(tarea));
        this.saveInLocalStorage();
    }

    eliminarTodo(id) {
        // for( const todo of this.todos){
        //     if(todo.id == id) {
        //         this.todos.pop(todo.index);
        //         break;
        //     }
        // }
        /**
         * El método filter() crea un nuevo array 
         * con todos los elementos que cumplan la condición
         * implementada por la función dada.
         */
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveInLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            /**
             * El elemento que llega originalmente es de tipo literal
             * .getAttribute('data-id') literal
             * .attributes[1] / .attributes['data-id'] literal
             * Por ello, NO comparamos el tipo, no usamos ===
             */
            // console.log({id}, todo.id);
            if (todo.id == id) {
                console.log(todo.completado);
                todo.completado = !todo.completado;
                this.saveInLocalStorage();
                break;
            }
        }
    }

    noExisteTodo(id) {
        const result = this.todos.filter(todo => todo.id == id);
        // console.log('Número de elementos con ese id ', result.length);
        return result.length === 0;
    }

    todoCompletado(id) {
        // Una manera
        for (const todo of this.todos) {
            if (todo.id == id) {
                return todo.completado;
            }
        }
        return false;

        // Otra manera
        // const elementos = this.todos.filter(todo => todo.id == id);
        // return elementos.length ===1 ? elementos[0].completado : false;
    }

    eliminarCompletados() {
        /**
         * Se utiliza como condición del filter el no estar completados
         * por que son esos los que nos interesa quedarnos.
         */
        this.todos = this.todos.filter(todo => !todo.completado);
        // console.log('Lista sin completados ', this.todos);
        this.saveInLocalStorage()
    }

    saveInLocalStorage() {
        // Si lo guardamos de la siguiente manera, no habrñia lugar a recuperar la forma
        // se guarda de la siguiente manera "[object Object]"
        // localStorage.setItem('todo-list', this.todos);
        localStorage.setItem('todo-list', JSON.stringify(this.todos));
    }

    loadFromLocalStorage() {
        // if(localStorage.getItem('todo-list')){
        //     this.todos = JSON.parse(localStorage.getItem('todo-list'));
        // } else{
        //     this.todos = [];
        // }
        // this.todos = localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];

        /**
         * Al recuperar elementos del localStorage no se indroma el tipo de objeto (la clase),
         * en este caso de tipo Todo.
         * No es un gran problema, pero si por ejemplo llamariamos a un método propieo de la clase Todo,
         * produciría un error, se pierden los métodos al desconocer la clase del obejeto.
         */
        return localStorage.getItem('todo-list') ? JSON.parse(localStorage.getItem('todo-list')) : [];
    }
}