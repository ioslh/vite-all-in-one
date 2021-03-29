import React, { useEffect, useState } from 'react'
import $ from './app.module.scss'

interface ServerData {
  greeting: string
  now: string
}

export default function App() {
  const [response, setResponse] = useState<ServerData | null>(null)

  useEffect(() => {
    fetch('/api/')
      .then(res => res.json())
      .then(setResponse)
  }, [])

  return (
    <div className={$.app}>
      <h3>Integrate fe & be server in one</h3>
      <div>
        {
          response ? (
            <>
              <div>Server Say: {response.greeting}</div>
              <div>Server Now: {response.now}</div>
            </>
          ) : null
        }
      </div>
    </div>
  )
}
