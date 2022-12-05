import { useState } from "react"

export const CounterButton = () => {
  const [value, setValue] = useState(0)
  return (
    <div>
      <button onClick={() => setValue((previous) => previous + 1)}>Click to increase: {value}</button>
    </div>
  )
}

