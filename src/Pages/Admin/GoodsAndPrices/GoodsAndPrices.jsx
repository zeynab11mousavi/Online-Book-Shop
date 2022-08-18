import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PrimaryBtn from '../../../Components/PrimaryBtn'
import { fetchProduct } from '../../../Redux/books/books'

const GoodsAndPrices = () => {
  // states for managing the data to show to user;
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [goods, setGoods] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProduct())
      .unwrap()
      .then((res) => setGoods(res))
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <PrimaryBtn>ذخیره</PrimaryBtn>
      <TableContainer>
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
                  <TableCell align="right">{good.price}</TableCell>
                  <TableCell align="right">{good.quantity}</TableCell>
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
