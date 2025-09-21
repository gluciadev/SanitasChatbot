import React from 'react'
import { useCounterStore } from '../../../../services/zustand/counterStore'

export const MainContent = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div>
      <h2>MainContent con Zustand</h2>
      <div>
        <p>Contador: {count}</p>
        <button onClick={increment}>Incrementar</button>
        <button onClick={decrement}>Decrementar</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
