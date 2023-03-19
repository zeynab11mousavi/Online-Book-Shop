import { TextField, Button, MenuItem, Select, Avatar } from '@mui/material'
import { useState } from 'react'
import { fetchBooks, fetchEditBook } from '../../../Redux/books/books'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../api/http'
import './addModal.css'

// EDITOR
import CK from './ck/CK'

const EditModal = (props) => {
  const { setEditModal, tempBook, page } = props
  const { categories } = useSelector((state) => state.categories)
  const { subCategories } = useSelector((state) => state.subCategories)

  const [name, setName] = useState(tempBook.name)
  const [author, setAuthor] = useState(tempBook.author)
  const [price, setPrice] = useState(tempBook.price)
  const [quantity, setQuantity] = useState(tempBook.quantity)
  const [category, setCategory] = useState(tempBook.category)
  const [subcategory, setSubcategory] = useState(tempBook.subcategory)
  const [image, setImage] = useState([tempBook.image])
  const [thumbnail, setThumbnail] = useState([tempBook.thumbnail])
  const [description, setDescription] = useState(tempBook.description)
  const dispatch = useDispatch()
  const notify = (name) => toast.success(`محصول با موفقییت ویرایش شد!`)

  // const handleAvatar = (e) => {
  //   let file = e.target.files[0]
  //   let avatar = URL.createObjectURL(file)
  //   setThumbnail(avatar)
  // }
  // const handlePicture = (e) => {
  //   let file = e.target.files[0]
  //   let pic = URL.createObjectURL(file)
  //   setImage(pic)
  // }
  const handleAvatar = async (e) => {
    let formData = new FormData()
    let file = e.target.files[0]
    formData.append('image', file)
    await axios.post('/upload', formData).then((res) => {
      return setThumbnail(res.data.filename)
    })
  }

  const handlePicture = async (e) => {
    let formData = new FormData()
    let file = e.target.files[0]
    formData.append('image', file)
    await axios.post('/upload', formData).then((res) => {
      return setImage([res.data.filename])
    })
  }

  const handleEditBook = (e) => {
    notify(name)

    e.preventDefault()
    setEditModal(false)
    dispatch(
      fetchEditBook({
        name,
        author,
        image,
        thumbnail,
        price,
        quantity,
        createdAt: tempBook.createdAt,
        id: tempBook.id,
        category: Number(category),
        subcategory: Number(subcategory),
        description,
      }),
    )
    dispatch(fetchBooks(page))
  }

  return (
    <>
      <ToastContainer />

      <form className="addModal" onSubmit={handleEditBook}>
        <div className="modalAddEditPicWrapper">
          <img
            className="modalEditAddPic"
            alt="تصویری برای این محصول وجود ندارد"
            src={`https://storedata.onrender.com/files/${image}`}
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
              onChange={(e) => setCategory(e.target.value)}
              sx={{ m: '1rem' }}
            >
              {categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
            <Select
              label="کتگوری"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              sx={{ m: '1rem' }}
            >
              {subCategories.map((subCategory) => (
                <MenuItem value={subCategory.id}>{subCategory.name}</MenuItem>
              ))}
            </Select>
          </div>
        </div>

        {/* <input
          onChange={(e) => handleAvatar(e)}
          type="file"
          accept="image/*"
          placeholder="آواتار"
        /> */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" توضیحات "
          className="addEditModalExplanation"
        />
        {/* <CK /> */}
        {/* //EDITOR */}
        <div className="editAddModalButtonWrapper">
          <Button variant="contained" color="primary" type="submit">
            ذخیره
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditModal(false)}
          >
            انصراف
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditModal
