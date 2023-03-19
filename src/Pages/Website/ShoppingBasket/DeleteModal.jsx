import { toast } from 'react-toastify'
import allContexts from '../../../Context/BookStoreContext'
import { useContext } from 'react'

const DeleteModal = (props) => {
  const { currentItem, setDeleteMood, total, orders, setOrders } = props
  const { baj, setBaj } = useContext(allContexts)
  const notify = (name) => toast.success(`${name} از سبد خرید حذف شد.`)

  const handleDelete = (currentItem) => {
    // orders.map((order, index) => {
    //   if (order.id === currentItem.id) {
    //     setOrders(orders.splice(index, 1))
    //   }
    // })
    setOrders(orders.filter((order) => order.id !== currentItem.id))
    const updateAfterDelete = orders.filter(
      (order) => order.id !== currentItem.id,
    )
    console.log(orders)
    localStorage.setItem('orders', JSON.stringify(updateAfterDelete))
    notify(currentItem.name)
    const updatedTotal = total - currentItem.price * currentItem.number
    const totalElement = document.getElementById('total')
    totalElement.innerText = updatedTotal
    localStorage.setItem('prices', JSON.stringify(total))
    setDeleteMood(false)
    setBaj(baj - 1)
  }
  return (
    <div className="modal-for-book-deleting">
      <h3>از پاک کردن {currentItem.name} مطمعن هستید ؟ </h3>
      <button className="cancel" onClick={() => setDeleteMood(false)}>
        خیر
      </button>
      <button className="delete" onClick={() => handleDelete(currentItem)}>
        بلی
      </button>
    </div>
  )
}

export default DeleteModal
