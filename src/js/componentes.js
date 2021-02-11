// import { TodoList } from "./classes";
import { Todo, TodoList } from "./classes";
import { todoList } from "./../index.js";

// Referencia al HTMl
const divTodoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo");
const btnClearCompleted = document.querySelector(".clear-completed");
const ulFilters = document.querySelector(".filters");
const filtros = document.querySelectorAll(".filtro");

export const crearTodoHTML = (todo) => {

    /** 
     * Se puede crear un elemento y devolver solo su primer hijo,
     * que al final es el html metido a pelo
     */
    // const htmlTodo = `
    // <li class=${ todo.completado ? '"completed"' : "" } data-id="${ todo.id }">
    //     <div class="view">
    //         <input class="toggle" type="checkbox" ${ todo.seleccionado ? 'checked' : '' }>
    //         <label>${ todo.tarea }</label>
    //         <button class="destroy"></button>
    //     </div>
    //     <input class="edit" value="Create a TodoMVC template">
    // </li>`;
    // const div = document.createElement('div');
    // div.innerHTML = htmlTodo;
    // divTodoList.appendChild(div.firstElementChild);

    const htmlTodo = `
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`;
    const li = document.createElement('li');
    li.classList = todo.completado ? 'completed' : '';
    li.dataset.id = todo.id;
    li.innerHTML = htmlTodo;
    divTodoList.appendChild(li);
};

// Eventos
newTodo.addEventListener('keyup', (e) => {
    // debugger;
    // if (e.key === 'Enter') {
    // if (e.code === 'Enter') {
    if (e.keyCode === 13) {
        console.log({ e });
        if (newTodo.value) {
            const nuevoTodo = new Todo(newTodo.value);
            todoList.nuevo(nuevoTodo);
            crearTodoHTML(nuevoTodo);
            newTodo.value = '';
        }
    }
});

btnClearCompleted.addEventListener('click', (e) => {
    // Borrar los elementos del html
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        // Esta es una manera, comprobando si está en la lista
        if (todoList.noExisteTodo(elemento.getAttribute('data-id')))
            divTodoList.removeChild(divTodoList.children[i]);
        // Otra manera, comprobando la clase del HTML, no me parece seguro
        // if(elemento.classList.contains('completed'))
        //     divTodoList.removeChild( divTodoList.children[i]);

    }
});

divTodoList.addEventListener('click', (e) => {
    // console.log(e);
    // console.log(e.target);
    // console.log(e.target.parentElement.parentElement);
    // console.log(e.target.parentElement.parentElement.id);
    // console.log(e.target.parentElement.parentElement.dataId);
    // console.log(e.target.localName);

    const todoElement = e.target.parentElement.parentElement;
    if (e.target.localName.includes('button')) {
        // Eliminar elemento
        /** 
         * O parsemao el valor a number y comporamaos después con !== 
         * o no parseamos y realizamos el if sin comprobar el tipo !=
         */
        // todoList.eliminarTodo( parseInt(todoElement.getAttribute('data-id')) );
        btnClearCompleted.eliminarTodo(todoElement.getAttribute('data-id'));
        divTodoList.removeChild(todoElement);
    } else if (e.target.localName.includes('input')) {
        // Marcar elemento como completado
        // todoList.marcarCompletado( todoElement.attributes[1] );
        // todoList.marcarCompletado( todoElement.attributes['data-id'] );
        /** 
         * O parsemao el valor a number y comporamaos después con !== 
         * o no parseamos y realizamos el if sin comprobar el tipo !=
         */
        // todoList.marcarCompletado( parseInt(todoElement.getAttribute('data-id')) );
        todoList.marcarCompletado(todoElement.getAttribute('data-id'));
        // Si existe la quita y si no existe la pone
        todoElement.classList.toggle('completed');
    }
});

ulFilters.addEventListener('click', (event) => {
    console.log(event);
    const eventTarget = event.target;
    const eventTargetText = event.target.text;
    if (!eventTargetText) { return; }

    console.log(eventTargetText);
    
    // for (const filtro of filtros) {
    //     filtro.classList.remove('selected');
    // }
    filtros.forEach( (filtro) => filtro.classList.remove('selected'));
    
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        // Otra manera, comprobando la clase del HTML, no me parece seguro
        // let completado = false;
        // if (elemento.classList.contains('completed'))
        //     completado = true;
        const completado = todoList.todoCompletado(elemento.getAttribute('data-id'));

        switch (eventTargetText) {
            case 'Pendientes':
                eventTarget.classList.add('selected');
                if (completado)
                    elemento.classList.add('hidden')
                break;
            case 'Completados':
                eventTarget.classList.add('selected');
                if (!completado)
                    elemento.classList.add('hidden')
                break;
            default:
                break;
        }
    }

});
