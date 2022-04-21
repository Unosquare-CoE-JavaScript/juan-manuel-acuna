- Compose: take two or more functions and make combine them in a single new function
- Reducer: two things go in and one thing comes out. One is the "State of the World" (a JS object) and the another one is something that happened (it's also a JS object), and only one thing comes out, a new "State of the World". Aslo can be described as a fuction that takes two arguments, the state and the action, and returns a new state
- Dispatch: Literally, dispatch

- Just one store, having more than one is an anti pattern
- We can have multiple reducers, and combine in the store, so this way we can have all the data centralized, but in the flattest possible way

### LA RUTA

- Se crea un archivo donde van las constantes, las cuales definen y describen lo que queremos hacer
- Se crea un archivo donde van las acciones, es decir, donde se definen objetos que mínimo tienen un type (obligatorio), y opcionalmente pueden tener un payload (normalmente un objeto, pero no necesariamente) y puede tener otras cosas, como mensajes, errores, etc
- Se crea un archivo donde va el reducer y el store (puede ser en el mismo), y en este archivo se importan las constantes y las acciones
- El store va al final de ese archivo. Se exporta
- El reducer contiene el código que se dispara cuando una acción es invocada
- En donde se va a usar (puede ser App.js), se importa el store y se activa con un dispatch.
- Se pueden usar bindActionCreators para crear atajos a los dispatch

---

- Presentational components are basically react components with no sense of state management (they take props and do things, like pure functions)

- The data comes from the reducer
- connect can have 4 arguments, currently we only using 2
  - mapStateToProps
    - takes data that needs to be passed to the components
    - Works very similar to the useSelector
  - mapDispatchToProps
    - takes functions or actions that need to be passed to the component

Best way to remove an item from the store:
return state.filter((item) => item.uuid !== action.payload.uuid);

- Three files:
  - actions
    - takes the constants and the definitions for the actions
  - reducer
    - takes the real logic that we want to implement
  - container - takes the mapStateToProps and mapDispatchToProps, and the connect to the component(s)
    It's also needed to replace the original component with the connected component (or connect the original component)
