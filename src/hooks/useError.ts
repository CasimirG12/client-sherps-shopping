import { useState } from "react"

const useError = () => {
  const [error, setError] = useState<string | null>();
  const updateError = (message: string) => {
    setError(message)
  }
  const resetError = () => {
    setError(null)
  }
  return [error, updateError, resetError]
}

export default useError;