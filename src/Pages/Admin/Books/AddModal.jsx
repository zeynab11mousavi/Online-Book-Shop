import {
  TextField,
  Button,
  MenuItem,
  Select,
  Avatar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { fetchAddBook, header, fetchBooks } from '../../../Redux/books/books'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import './addModal.css'
import axios from '../../../api/http'

const AddModal = (props) => {
  const { setAddingModal, page, setPage, total, setTotal } = props

  const { categories } = useSelector((state) => state.categories)
  const { subCategories } = useSelector((state) => state.subCategories)
  const defaultPic = '8533b15d6b2453d879ede35145575c08'
  const [name, setName] = useState()
  const [author, setAuthor] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [category, setCategory] = useState()
  const [subcategory, setSubcategory] = useState()
  const [image, setImage] = useState([defaultPic])
  const [thumbnail, setThumbnail] = useState([])
  const [description, setDescription] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const notify = () => toast.success('محصول با موفقیت اضافه شد.')

  const handleAddNewBook = (e) => {
    e.preventDefault()

    if (
      name &&
      author &&
      price &&
      quantity &&
      category &&
      subcategory &&
      description
    ) {
      setAddingModal(false)
      dispatch(fetchAddBook(makeNewBook()))
      notify()

      dispatch(header())
        .unwrap()
        .then((res) => setTotal(res))
      if (total % 5 === 0) {
        setPage(total / 5)
      } else setPage(Math.ceil(total / 5))
      dispatch(fetchBooks(page))
    } else setError('!لطفا مقادیر خالی را پر نمایید.')
  }

  const handleAvatar = async (e) => {
    let formData = new FormData()
    let file = e.target.files[0]
    formData.append('image', file)
    await axios.post('/upload', formData).then((res) => {
      return setThumbnail(res.data.filename)
    })
  }

  const handlePicture = async (e) => {
    // let file = e.target.files[0]
    // let pic = URL.createObjectURL(file)
    // setImage(pic)
    let formData = new FormData()
    let file = e.target.files[0]
    formData.append('image', file)
    await axios.post('/upload', formData).then((res) => {
      return setImage([res.data.filename])
    })
  }

  const makeNewBook = () => {
    const newBook = {
      name,
      author,
      image,
      thumbnail,
      price,
      quantity,
      category: Number(category),
      subcategory: Number(subcategory),
      description,
    }
    return newBook
  }

  return (
    <form className="addModal" onSubmit={(e) => handleAddNewBook(e)}>
      <div className="modalAddEditPicWrapper">
        <img
          className="modalEditAddPic"
          alt="تصویری برای این محصول وجود ندارد"
          src={`http://localhost:3001/files/${image}`}
        />
        <input
          onChange={(e) => handlePicture(e)}
          type="file"
          accept="image/*"
          placeholder="تصاویر"
        />
      </div>
      <div className="editAddModalCols">
        <div className="firstColEditAddModal">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="عنوان"
            sx={{ m: '1rem' }}
          />
          <TextField
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="نویسنده"
            sx={{ m: '1rem' }}
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="قیمت"
            sx={{ m: '1rem' }}
          />
        </div>
        <div className="secondColEditAddModal">
          <TextField
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            placeholder="تعداد"
            sx={{ m: '1rem' }}
          />
          <Select
            label="کتگوری"
            value={category}
            sx={{ m: '1rem' }}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
          <Select
            label="ساب کتگوری"
            value={subcategory}
            sx={{ m: '1rem' }}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            {subCategories.map((subCategory) => (
              <MenuItem value={subCategory.id}>{subCategory.name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      {/* <Avatar src={`${URL}/files/${thumbnail}`} /> */}
      {/* <input
        onChange={(e) => handlePicture(e)}
        type="file"
        accept="image/*"
        placeholder="تصاویر"
      />
      <input
        onChange={(e) => handleAvatar(e)}
        type="file"
        accept="image/*"
        placeholder="آواتار"
      /> */}
      <textarea
        value={description}
        className="addEditModalExplanation"
        onChange={(e) => setDescription(e.target.value)}
        placeholder=" توضیحات "
      />
      <div className="editAddModalButtonWrapper">
        <Button variant="contained" color="primary" type="submit">
          اضافه کردن
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setAddingModal(false)}
        >
          انصراف
        </Button>
      </div>
      <Typography sx={{ backgroundColor: '#fff' }} color="error">
        {error}
      </Typography>
    </form>
  )
}

export default AddModal
