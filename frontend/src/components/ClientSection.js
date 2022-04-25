import React, { useState } from "react"
import "./ClientSection.css"
import Spinner from "./Spinner"

const ClientSection = ({ clients, user }) => {
  const [client, setClient] = useState(null)
  const [from, setFrom] = useState("2021-03-01")
  const [to, setTo] = useState("2022-10-04")
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function getData(c, f, t) {
    setIsLoading(true)
    fetch(
      `https://admindev.inceptia.ai/api/v1/inbound-case/?client=${c.id}&local_updated__date__gte=${f}&local_updated__date__lte=${t}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `JWT ${user.token}`,
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className="container">
      <ul className="client-section blue--text">
        Clientes
        {clients.map((c) => (
          <li
            key={c.id}
            className={`client-item ${
              client && c.id === client.id && "item-active"
            }`}
            onClick={() => {
              setClient(c)
              getData(c, from, to)
            }}
          >
            {c.name}
          </li>
        ))}
      </ul>
      <div className="dashboard ">
        <div className="dashboard-header">
          <div className="dashboard-header-top">
            <span className="blue--text">Reportes</span>
            <input placeholder="Caso ID Cliente o TEL"></input>
          </div>
          <div className="dashboard-header-bottom">
            <span className="blue--text">Detalle Dashboard</span>
            <div className="dashboard-filters">
              {/* FROM DATE FILTER */}
              <div style={{ marginRight: "20px" }}>
                <label htmlFor="from">Desde</label>
                <input
                  type="date"
                  id="from"
                  onChange={(e) => {
                    setFrom(e.target.value)
                    getData(client, e.target.value, to)
                  }}
                ></input>
              </div>

              {/* TO DATE FILTER */}
              <div>
                <label htmlFor="to">Hasta</label>
                <input
                  type="date"
                  id="to"
                  onChange={(e) => {
                    setTo(e.target.value)
                    getData(client, from, e.target.value)
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>

        {/* DATA VIEW */}
        <div className="data-view">
          <table>
            <thead>
              <tr className="table-head blue">
                <th>Gestionado</th>
                <th>ID caso</th>
                <th>Teléfono</th>
                <th>DNI</th>
                <th>Grupo</th>
                <th>Orden</th>
                <th>Llamada</th>
                <th>Estado</th>
              </tr>
            </thead>
            {data && (
              <tbody>
                {data.results.map((item) => (
                  <tr className="blue--text" key={item.id}>
                    <td>{item.last_updated}</td>
                    <td>{item.case_uuid}</td>
                    <td>{item.phone}</td>
                    <td>{item.extra_metadata.dni}</td>
                    <td>{item.extra_metadata.grupo}</td>
                    <td>{item.extra_metadata.orden}</td>
                    <td>{item.case_duration}</td>
                    <td
                      className={
                        item.case_result.is_final ? "complete" : "not-complete"
                      }
                    >
                      {item.case_result.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          <div style={{ padding: "5rem" }}></div>
          {!data && !isLoading && (
            <p className="no-data blue--text">No hay datos disponibles</p>
          )}
          {isLoading && <Spinner />}
        </div>
      </div>
    </div>
  )
}

export default ClientSection
