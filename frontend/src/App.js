import React from "react"
import { useState, useEffect } from "react"
import "./App.css"

// COMPONENTS
import Login from "./components/Login"
import ClientSection from "./components/ClientSection"

function App() {
  const [user, setUser] = useState(null)
  const [clients, setClients] = useState([])

  useEffect(() => {
    if (user) {
      fetch("https://admindev.inceptia.ai/api/v1/clients/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((response) => setClients(response))
        .catch((err) => alert(err))
    }
  }, [user])

  return (
    <div className="App">
      {!user && <Login setUser={setUser} />}
      {user && <ClientSection clients={clients} user={user} />}
    </div>
  )
}

export default App
