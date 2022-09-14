import './bank.css'
import s from '../../../Assets/pic/s.JPG'
import e from '../../../Assets/pic/e.JPG'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOrder } from '../../../Redux/orders/orders'

const BankPayment = () => {
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(searchParams.get('result'))
  const [pageState, setPageState] = useState()

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('finalizeOrder'))

    if (result === 'successful') {
      dispatch(addOrder(order))
      localStorage.removeItem('orders')
      localStorage.removeItem('finalizeOrder')
    }
  }, [])

  return (
    <div className="result">
      {result === 'successful' ? (
        <div className="successMessage" id="successMessage">
          <img
            className="successMessagePic"
            src={s}
            alt="خرید شما با موفقیت انجام شد."
          />
        </div>
      ) : (
        <div className="errorMessage" id="errorMessage">
          <img src={e} alt="خرید شما در انتظار پرداخت است" />
        </div>
      )}
      <button onClick={() => navigate('/')} className="goBack">
        بازگشت به سایت
      </button>
    </div>
  )
}

export default BankPayment
