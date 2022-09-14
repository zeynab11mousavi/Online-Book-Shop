import './goodAndPrice.css'
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TextField,
  Typography,
  Button,
  Box,
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchPriceAndQuantity,
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

const GoodsAndPrices = () => {
  // states for managing the data to show to user;
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [goods, setGoods] = useState([])
  const [edit, setEdit] = useState(false)
  const [tempId, setTempId] = useState()
  const [tempPrice, setTempPrice] = useState()
  const [temptQuantity, setTempQuantity] = useState()
  const priceFormatter = new Intl.NumberFormat()
  // priceFormatter.format(book.price)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPriceAndQuantity())
      .unwrap()
      .then((res) => setGoods(res))
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  // :)))))))))))))))
  const [gatheredData, setGatheredData] = useState({})

  const handleEditPriceAndQuantity = (e, book) => {
    e.target.classList.add('border')
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

    dispatch(fetchPriceAndQuantity())
      .unwrap()
      .then((res) => setGoods(res))
    setEdit(false)

    const inputs = document.getElementsByClassName('border')
    // inputs.map((input) => input.classList.remove('border'))
    console.log(inputs)
  }

  return (
    <>
      <TableContainer>
        {edit && <Button onClick={() => handleEditData()}>ذخیره</Button>}
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
                  <TableCell align="right">
                    <input
                      type="number"
                      id={good.id}
                      defaultValue={good.price}
                      onClick={(e) => handleEditPriceAndQuantity(e, good)}
                      onChange={(e) => setTempPrice(e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <input
                      id={good.id}
                      type="number"
                      defaultValue={good.quantity}
                      onClick={(e) => handleEditPriceAndQuantity(e, good)}
                      onChange={(e) => setTempQuantity(e.target.value)}
                    />
                  </TableCell>
                  {/* {edit && good.id === tempId ? (
                    <TableCell>
                      <Button onClick={() => handleEditData(good.id, good)}>
                        ذخیره
                      </Button>
                    </TableCell>
                  ) : null} */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ position: 'absolute', bottom: '0' }}
        rowsPerPageOptions={[5, 10]}
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
