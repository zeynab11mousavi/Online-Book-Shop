import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Icon,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import { ToastContainer, toast } from 'react-toastify'

import { fetchBooks, header } from '../../../Redux/books/books'
import { fetchCategory } from '../../../Redux/category/categorySlice'
import { fetchSubCategory } from '../../../Redux/subCategory/subCategory'
import Modal from '../../../Components/Modal'
import AddModal from './AddModal'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import EditModal from './EditModa'
import DividedProducts from '../../Website/DividedProducts/DividedProducts'

const Books = () => {
  // PAGINATION STATES
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  // GENERAL STATES
  const { books } = useSelector((state) => state.books)
  const { categories } = useSelector((state) => state.categories)
  const { subCategories } = useSelector((state) => state.subCategories)

  const dispatch = useDispatch()

  // states for managing the data to show to user;
  const [modal, setModal] = useState(false)
  const [tempBook, setTempBook] = useState()
  const [addingModal, setAddingModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [total, setTotal] = useState(0)

  //  PAGINATION BUTTONS
  const [next, setNext] = useState(false)
  const [prev, setPrev] = useState(true)

  //  PRODUCTS OR BOOKS

  useEffect(() => {
    // GET ALL BOOKS
    dispatch(header())
      .unwrap()
      .then((res) => setTotal(res))

    dispatch(fetchBooks(page))
  }, [page, total])
  useEffect(() => {
    //  CATEGORY
    dispatch(fetchCategory())

    // SUBCATEGORY
    dispatch(fetchSubCategory())
  }, [])

  const handleNextPage = () => {
    if (Math.ceil(total / limit) > page) {
      setPage(page + 1)
      setPrev(false)
    }
    if (Math.round(total / limit) === page) {
      setNext(true)
    }
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
      setNext(false)
    }
    if (page === 2) setPrev(true)
  }

  const catAndSubcat = (cat, sub) => {
    let tempCat, tempSubCat
    categories.map((category) =>
      category.id === cat ? (tempCat = category.name) : null,
    )
    subCategories.map((subcategory) =>
      subcategory.id === sub ? (tempSubCat = subcategory.name) : null,
    )
    return (
      <p>
        {tempCat} / {tempSubCat}
      </p>
    )
  }

  const handleDeleteModal = (book) => {
    setModal(true)
    setTempBook(book)
  }
  const handleEditModal = (book) => {
    setEditModal(true)
    setTempBook(book)
  }
  return (
    <>
      {addingModal && (
        <AddModal
          page={page}
          setPage={setPage}
          setAddingModal={setAddingModal}
          total={total}
          setTotal={setTotal}
        />
      )}
      {editModal && (
        <EditModal
          key={tempBook.id}
          setEditModal={setEditModal}
          tempBook={tempBook}
          page={page}
        />
      )}
      <ToastContainer />
      <Paper
        sx={{
          border: 0,
          borderTop: 0,
          borderRadius: 0,
        }}
      >
        <Button
          onClick={() => setAddingModal(true)}
          sx={{ mb: '1rem' }}
          variant="contained"
          color="primary"
        >
          اضافه کردن
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">تصویر</TableCell>
                <TableCell align="right">عنوان</TableCell>
                <TableCell align="right">نام نویسنده</TableCell>
                <TableCell align="right">دسته بندی</TableCell>
                <TableCell align="right">جزییات/ حذف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell align="right">
                      <Avatar
                        alt="تصویری برای این محصول وجود ندارد"
                        src={`http://localhost:3001/files/${book.image}`}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography component={Link} to={`${book.id}`}>
                        {book.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">
                      {catAndSubcat(book.category, book.subcategory)}
                      {/* // `${book.category}/${book.subcategory}` // } */}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        variant="contained"
                        color="primary"
                        sx={{ m: '20px' }}
                        onClick={() => handleDeleteModal(book)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        variant="contained"
                        color="primary"
                        sx={{ m: '20px' }}
                        onClick={() => handleEditModal(book)}
                      >
                        <ModeEditOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {modal && (
            <Modal
              key={tempBook.id}
              setModal={setModal}
              tempBook={tempBook}
              page={page}
              setPage={setPage}
              total={total}
              setTotal={setTotal}
            />
          )}
        </TableContainer>
        {/* <TablePagination
          // rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Number(total)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        <Button disabled={next} onClick={handleNextPage}>
          بعدی
        </Button>
        <Typography>صفحه {page}</Typography>
        <Button disabled={prev} onClick={handlePrevPage}>
          قبلی
        </Button>
      </Paper>
    </>
  )
}

export default Books
