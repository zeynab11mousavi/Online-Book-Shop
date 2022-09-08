import './modal.css'
import { useDispatch } from 'react-redux'
import { fetchDeleteBook, fetchBooks, header } from '../Redux/books/books'

const Modal = (props) => {
  const { tempBook, setModal, page } = props
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(fetchDeleteBook(id))
    dispatch(fetchBooks(1))
    setModal(false)
  }

  return (
    <div className="modal-for-book-deleting">
      <h3>از پاک کردن {tempBook.name} مطمعن هستید ؟ </h3>
      <button className="cancel" onClick={() => setModal(false)}>
        خیر
      </button>
      <button className="delete" onClick={() => handleRemove(tempBook.id)}>
        بلی
      </button>
    </div>
  )
}

export default Modal
