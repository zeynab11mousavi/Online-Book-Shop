import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from '../Pages/Website/Home/Home'
import Product from '../Pages/Website/Product/Product'
import ShoppingBasket from '../Pages/Website/ShoppingBasket/ShoppingBasket'
import AdminPanel from '../Pages/Admin/AdminPanel/AdminPanel'
import Books from '../Pages/Admin/Books/Books'
import Orders from '../Pages/Admin/Orders/Orders'
import GoodsAndPrices from '../Pages/Admin/GoodsAndPrices/GoodsAndPrices'
import BeforePayment from '../Pages/Bank/BeforePayment/BeforePayment'
import BankPayment from '../Pages/Bank/BankPayment/BankPayment'
import SuccessResult from '../Pages/Bank/SuccessfullResult/SuccessfulResult'
import RejectedResult from '../Pages/Bank/RejectedPrice/RejectedResult'
import ClientLayout from '../Layouts/ClientLayout/ClientLayout'
import AdminLayout from '../Layouts/AdminLayout/AdminLayout'
import Login from '../Pages/Admin/Login/Login'
import DividedProductsPage from '../Pages/Website/DividedProducts/DividedProducts'
import NotFound from '../Pages/NotFound'
const Routers = () => {
  const params = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path=":params" element={<DividedProductsPage />} />
          <Route path="books/:params" element={<Product />} />
          <Route path="shopping-basket" element={<ShoppingBasket />} />
          <Route path="before-payment" element={<BeforePayment />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="admin-panel" element={<AdminPanel />} />
          <Route path="orders" element={<Orders />} />
          <Route path="goods-and-prices" element={<GoodsAndPrices />} />
          <Route path="books" element={<Books />} />
        </Route>

        <Route path="admin-login" element={<Login />} />
        <Route path="before-payment/:params" element={<BankPayment />} />
        <Route path="successful" element={<SuccessResult />} />
        <Route path="rejected" element={<RejectedResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
