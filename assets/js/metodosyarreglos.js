//aqui tenemos nuestro array de object
let todoListTarea = [
  { id: 1, tarea: "Leer libro", completed: false },
  { id: 2, tarea: "Sacar a pasear a mi mascota", completed: false },
  { id: 3, tarea: "Estudiar", completed: false },
];

let agregarInput = document.getElementById("inputt");
let botoncito = document.getElementById("agregar");
let total = document.getElementById("total");
let realizadas = document.getElementById("realizado");
let listaDeTarea = document.getElementById("listaTarea");
let previousTittle = document.title;

//function arrow
const tareaAgregada = () => {
  const nombreDeLaTarea = agregarInput.value;
  if (!nombreDeLaTarea) {
    alert("No has agregado ninguna tarea");
    return; // esto es , si esque no se cumple la condicion, que no siga al sgt codigo sino, que retorne hasta que agregue un valor
  }

  const ultimaTareaCreada = todoListTarea[todoListTarea.length - 1]; //esto es para que me tome el ultimo elemento del array

  const nuevaTarea = {
    //si hay una ultimaTareaCreada, entonces dame el ultimo id agregado, +1 para que sea incremental y si no tengo tareas agregadas entonces comienza en 1 = ultimaTareaCreada.id +1 : 1
    id: ultimaTareaCreada ? ultimaTareaCreada.id + 1 : 1, // es un operador ternario primero la condicion ? y despues si es verdadero : false
    tarea: nombreDeLaTarea, // es importante que se busque por id, de identificador del array
    completed: false,
  };
  todoListTarea.push(nuevaTarea);
  /* console.log(todoListTarea) */ // para probar si esta funcionando bien
  renderizar();
  agregarInput.value = "";
};
//no agregar el boton todavia
botoncito.addEventListener("click", tareaAgregada);

//cambio de status: prodiamos decir eliminar o actualizar algo, es recomendable eliminar o actualizar mediante el ID
//function arrow
// lo que quiere decir esta funcion es, si esta true pasala a false o si esta false pasala a true
const cambiarEstado = (id) => {
  // con el finindex entro al array y me va a extraer lo que le estoy pidiendo en este caso el id y le pongo una condicion
  const tareaIndice = todoListTarea.findIndex(
    (todoListTarea) => todoListTarea.id === id
  );
  if (todoListTarea[tareaIndice].completed == false) {
    const nuevoObjeto = {
      id: todoListTarea[tareaIndice].id, // es para que el id no cambie y se mantenga el mismo
      tarea: todoListTarea[tareaIndice].tarea, //aca tampoco quiero que cambie el nombre
      completed: true,
    };
    todoListTarea.splice(tareaIndice, 1, nuevoObjeto);
  } else {
    const nuevoObjeto = {
      id: todoListTarea[tareaIndice].id, // es para que el id no cambie y se mantenga el mismo
      tarea: todoListTarea[tareaIndice].tarea, //aca tampoco quiero que cambie el nombre
      completed: false,
    };
    todoListTarea.splice(tareaIndice, 1, nuevoObjeto);
  }
  renderizar();
};
eliminar = (id) => {
  const tareaIndice = todoListTarea.findIndex(
    (todoListTareaM) => todoListTareaM.id === id
  );
  todoListTarea.splice(tareaIndice, 1);

  renderizar();
};

const renderizar = () => {
  let html = ""; // es para que no se multiplique
  let inputCheckear = ""; // es para que no se multiplique
  let realizadaCount = []; // esto nos va a decir las tareas relizadas
  todoListTarea.forEach((todoListTareaM) => {
    //con este forEach, estamos iterando el array, osea estamos tomando encuenta todo del array, se llama ciclo igual que el for of
    /* inputCheck = completed  */
    inputCheckear = todoListTareaM.completed
      ? //tengo que pasarle el nombre de la funcion cambiarEstado
        `<li class="listt"> 
             <div class="box_tittle">
             <h3 class="tittle">${todoListTareaM.tarea}</h3>
             
             </div>
           <div id="botonall">
           <button onclick="eliminar(${todoListTareaM.id})" id="eliminarTodo">Delete</button>
           <button onclick="cambiarEstado(${todoListTareaM.id})" id="chequear">Task completed</button>

           </div>
        </li>
             ` //aqui estoy diciendo que si el checkbost esta con el visto bueno se realizo osea true
      : `<li class="list"> 
      <div class="box_tittle">
      <h3 class="tittle">${todoListTareaM.tarea}</h3>
      
      </div>
    <div id="botonall">
    <button onclick="eliminar(${todoListTareaM.id})" id="eliminarTodo">Delete</button>
    <button onclick="cambiarEstado(${todoListTareaM.id})" id="chequear">Task completed</button>

    </div>
 </li>`; // y si no tiene el visto bueno , se cambia el status y queda false

    html += `
        <div class="caja">
            <h4>Task N°${todoListTareaM.id}</h4>
            <p>${inputCheckear}</p> 

        </div>`;
    if (todoListTareaM.completed === true) {
      realizadaCount.push(todoListTareaM);
    }
  });
  listaDeTarea.innerHTML = html; // en esta linea se renderiza la tarea en el html
  total.innerHTML = todoListTarea.length; //aqui me cuenta el total de las tareas, recorriendo el array completo
  realizadas.innerHTML = realizadaCount.length; // aqui me cuenta el total de las tareas realizadas ,recorriendo el array completo con el .length, nos dice la longitud del array
};
renderizar();

//cambiando tittle
window.addEventListener("blur", () => {
  previousTittle = document.title;
  document.title = "Tareas Pendiente😎";
});
window.addEventListener("focus", () => {
  document.title = previousTittle;
});
