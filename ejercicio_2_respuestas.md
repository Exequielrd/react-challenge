2.1 Crearía una store,

```bash
import { createStore, combineReducers } from "redux"
import loginReducer from "./loginReducer"
import clientsReducer from "./clientsReducer"
import dataReducer from "./clientsReducer"

const rootReducer = combineReducers({
  basket: basketReducer,
  likes: likesReducer,
})

const store = createStore(rootReducer)
export default store

```

luego los reducers para manejar el estado

```bash

reducer(state = store, action) {
  switch (action.type) {
    case "@login":
      return {
        ...state,
        {
            user: action.payload.user,
        }
    }
    case "@clients":
      return {
        ...state,
        {
            clients: action.payload.clients,
        }
    }
    case "@data":
      return {
        ...state,
        {
            data: action.payload.data,
        }
    }

```

por ultimo las actions para dejar el codigo mas limpio

```bash
export function login(data) {
  return {
    type: "@login",
    payload: {
      user: data,
    },
  }
}

export function setClients(data) {
  return {
    type: "@clients",
    payload: {
      clients: data,
    },
}

export function setData(data) {
  return {
    type: "@data",
    payload: {
      data,
    },
}


```

luego utilizaria el dispatch y el susbscribe en los componentes que sea necesario

2.2 Para agregar nuevas rutas utilizaría react-router y con los componentes BrowserRouter, Routes y route configuraría la vista con sus respectivos componentes.

```bash

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}>
      </Route>
        <Route path="/home" element={<ClientSection />} />
    </Routes>
    </BrowserRouter>,
  document.getElementById("root")
)

```
