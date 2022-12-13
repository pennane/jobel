import { useState } from "react"
import { Button } from "../Button"

export const CounterButton = () => {
  const [value, setValue] = useState(0)
  return (
    <div>
      <Button onClick={() => setValue((previous) => previous + 1)}>Click to increase: {value}</Button>
    </div>
  )
}

