// import { TablePagination } from '@mui/material'
// import { useState } from 'react'

// const Pagination = (props) => {
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(5)

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0)
//   }

//   return (
//     <>
//     <TablePagination
//       rowsPerPageOptions={[5, 10, 25]}
//       component="div"
//       count={props.length}
//       rowsPerPage={rowsPerPage}
//       page={page}
//       onPageChange={handleChangePage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//       </>
//   )
// }

// export default Pagination
