import React from "react"
import { useState } from "react"
import "./Login.css"
import Spinner from "./Spinner"

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function login(e) {
    e.preventDefault()
    setIsLoading(true)
    fetch("https://admindev.inceptia.ai/api/v1/login/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.login_status) {
          setUser(res)
        } else {
          alert("Algo ha salido mal...")
        }
        setIsLoading(false)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <form className="form-container" onSubmit={login}>
      <h1 className="form-title blue--text">Iniciar sesión</h1>

      {/* EMAIL */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>

      {/* PASSWORD */}
      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      ></input>

      {isLoading ? (
        <Spinner />
      ) : (
        <button type="submit" value="Submit">
          Ingresar
        </button>
      )}
    </form>
  )
}

export default Login
