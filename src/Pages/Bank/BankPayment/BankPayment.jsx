import { Button } from '@mui/material'
import payment from '../../../Assets/pic/payment.png'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const BankPayment = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const params = useParams()
  const [pageState, setPageState] = useState()
  useEffect(() => {
    setPageState(params.params)
  }, [params])
  return (
    <>
      <h1>{pageState}</h1>
    </>
  )
}

export default BankPayment
