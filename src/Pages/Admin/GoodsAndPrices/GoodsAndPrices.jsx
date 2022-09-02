<<<<<<< Updated upstream
=======
import { BookOnline } from '@mui/icons-material'
>>>>>>> Stashed changes
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
<<<<<<< Updated upstream
=======
  TextField,
  Typography,
  Button,
  Box,
>>>>>>> Stashed changes
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
<<<<<<< Updated upstream
import PrimaryBtn from '../../../Components/PrimaryBtn'
import { fetchProduct } from '../../../Redux/books/books'
=======
import {
  fetchAddBook,
  fetchBooks,
  fetchEditPriceOrQuantity,
} from '../../../Redux/books/books'

const mockBookForServerPutRequest = {
  name: ' ',
  author: ' ',
  image: [],
  thumbnail: '',
  price: 0,
  quantity: 0,
  createdAt: 0,
  id: 20,
  category: 1,
  subcategory: 2,
  description: ' توضیحی درباره این کتاب وجود ندارد.',
}
>>>>>>> Stashed changes

const GoodsAndPrices = () => {
  // states for managing the data to show to user;
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [goods, setGoods] = useState([])
<<<<<<< Updated upstream

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProduct())
      .unwrap()
      .then((res) => setGoods(res))
  })
=======
  const [edit, setEdit] = useState(false)
  const [tempId, setTempId] = useState()
  const [tempPrice, setTempPrice] = useState()
  const [temptQuantity, setTempQuantity] = useState()
  const priceFormatter = new Intl.NumberFormat()
  // priceFormatter.format(book.price)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBooks())
      .unwrap()
      .then((res) => setGoods(res))
  }, [])
>>>>>>> Stashed changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
<<<<<<< Updated upstream

  return (
    <>
      <PrimaryBtn>ذخیره</PrimaryBtn>
      <TableContainer>
=======
  // :)))))))))))))))
  const [gatheredData, setGatheredData] = useState({})

  const handleEditPriceAndQuantity = (book) => {
    {
      setTempPrice(book.price)
      setTempQuantity(book.quantity)
    }
    setEdit(true)
    setTempId(book.id)
    setGatheredData({
      ...gatheredData,
      [book.id]: { price: tempPrice, quantity: temptQuantity },
    })
  }

  const handleEditData = () => {
    const keyId = Object.keys(gatheredData)
    const values = Object.values(gatheredData)

    for (let i = 0; i < keyId.length; i++) {
      dispatch(fetchEditPriceOrQuantity({ id: keyId[i], newData: values[i] }))
    }

    dispatch(fetchBooks())
      .unwrap()
      .then((res) => setGoods(res))
    setEdit(false)
  }

  return (
    <>
      <TableContainer>
        {edit && <Button onClick={() => handleEditData()}>ذخیره</Button>}
>>>>>>> Stashed changes
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">عنوان کتاب</TableCell>
              <TableCell align="right">قیمت</TableCell>
              <TableCell align="right">موجودی</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goods
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((good) => (
                <TableRow key={good.id}>
                  <TableCell align="right">{good.name}</TableCell>
<<<<<<< Updated upstream
                  <TableCell align="right">{good.price}</TableCell>
                  <TableCell align="right">{good.quantity}</TableCell>
=======
                  <TableCell align="right">
                    <Typography
                      component="div"
                      onClick={() => handleEditPriceAndQuantity(good)}
                    >
                      {edit && good.id === tempId ? (
                        <TextField
                          type="number"
                          name="price"
                          defaultValue={good.price}
                          onChange={(e) => setTempPrice(e.target.value)}
                        />
                      ) : (
                        <Typography component="p">
                          {priceFormatter.format(good.price)}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      component="div"
                      onClick={() => handleEditPriceAndQuantity(good)}
                    >
                      {edit && good.id === tempId ? (
                        <TextField
                          type="number"
                          name="quantity"
                          defaultValue={good.quantity}
                          onChange={
                            (e) => setTempQuantity(e.target.value)
                            // onChange={(e) => setTempQuantity(e.target.value)
                          }
                        />
                      ) : (
                        <Typography component="p">
                          {priceFormatter.format(good.quantity)}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                  {/* {edit && good.id === tempId ? (
                    <TableCell>
                      <Button onClick={() => handleEditData(good.id, good)}>
                        ذخیره
                      </Button>
                    </TableCell>
                  ) : null} */}
>>>>>>> Stashed changes
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={goods.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default GoodsAndPrices
