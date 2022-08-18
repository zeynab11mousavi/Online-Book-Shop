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
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
// import ReactPaginate from 'react-paginate'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../../../Redux/books/books'

const Orders = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // states for managing the data to show to user;
  const [books, setBooks] = useState([])
  const dispatch = useDispatch()

  // const { list } = useSelector((state) => state.list)
  useEffect(() => {
    dispatch(fetchProduct())
      .unwrap()
      .then((res) => setBooks(res))
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
      <Paper>
        <Button sx={{ mb: '1rem' }} variant="contained" color="primary">
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <TableRow key={book.id}>
                    <TableCell align="right">
                      <Avatar
                        alt="تصویری برای این محصول وجود ندارد"
                        src={`http://localhost:3001/files/${book.image}`}
                      />
                    </TableCell>
                    <TableCell align="right">{book.name}</TableCell>
                    <TableCell align="right">{book.author}</TableCell>
                    <TableCell align="right">{`${book.category}/${book.subcategory}`}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ m: '20px' }}
                      >
                        {' '}
                        حذف{' '}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ m: '20px' }}
                      >
                        ویرایش
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={books.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default Orders
