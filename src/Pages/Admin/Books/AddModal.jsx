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
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import './addModal.css'
import { URL } from '../../../config/api'
import { useEffect } from 'react'
// import axios from '../../../api/http'
import axios from 'axios'
// import { upload } from '@testing-library/user-event/dist/upload'

const AddModal = (props) => {
  const { setAddingModal, page, setPage, total, setTotal } = props

  const { categories } = useSelector((state) => state.categories)
  const { subCategories } = useSelector((state) => state.subCategories)

  const [name, setName] = useState()
  const [author, setAuthor] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [category, setCategory] = useState()
  const [subcategory, setSubcategory] = useState()
  const [image, setImage] = useState()
  const [thumbnail, setThumbnail] = useState([])
  const [description, setDescription] = useState([])
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const message = () => toast('ish')

  // useEffect(() => {}, [total])
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

      dispatch(header())
        .unwrap()
        .then((res) => setTotal(res))
      if (total % 5 === 0) {
        setPage(total / 5)
      } else setPage(Math.ceil(total / 5) + 1)
      dispatch(fetchBooks(page))
    } else setError('!لطفا مقادیر خالی را پر نمایید.')
  }

  const handleAvatar = (e) => {
    let formData = new FormData()
    formData.append('thumbnail', e.target.files[0])

    axios
      .post('http://localhost:3001/uploads', formData)
      .then((res) => console.log(res))
    // let file = e.target.files[0]
    // let avatar = URL.createObjectURL(file)s
    // setThumbnail(avatar)
  }

  const handlePicture = (e) => {
    let file = e.target.files[0]
    let pic = URL.createObjectURL(file)
    setImage(pic)
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
      <div className="first-three-inputs">
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="عنوان"
        />
        <TextField
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="نویسنده"
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="قیمت"
        />
      </div>
      <TextField
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        placeholder="تعداد"
      />
      <Select
        label="کتگوری"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem value={category.id}>{category.name}</MenuItem>
        ))}
      </Select>
      <Select
        label="کتگوری"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      >
        {subCategories.map((subCategory) => (
          <MenuItem value={subCategory.id}>{subCategory.name}</MenuItem>
        ))}
      </Select>
      {/* <Avatar src={`${URL}/files/${thumbnail}`} /> */}
      <input
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
      />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder=" توضیحات "
      />
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
      <Typography color="error">{error}</Typography>
    </form>
  )
}

export default AddModal
