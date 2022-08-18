import './Footer.css'
import { Typography, IconButton } from '@mui/material'
import { Facebook, Instagram, Telegram, WhatsApp } from '@mui/icons-material'

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="suggestion">
        <h3>پیشنهادات ویژه</h3>
        <div className="suggestionLists">
          <div>
            <h5>رمان ها</h5>
            <p>بادبادک باز</p>
            <p>کولی کنار آتش</p>
            <p>بی نوایان</p>
            <p>گور به گور</p>
          </div>
          <div>
            <h5>روانشناسی</h5>
            <p>والدین سمی</p>
            <p>تفسیر خواب</p>
            <p>انسان و سمبل هایش</p>
            <p>ناخود آگاه جمعی</p>
          </div>

          <div>
            <h5>فلسفی</h5>
            <p>تسلی بخش های فلسفه</p>
            <p>چنین گفت زرتشت</p>
            <p>لذات فلسفه</p>
            <p>دزآمدی بر فلسفه</p>
          </div>

          <div>
            <h5>هنری</h5>
            <p>تذهیب در ایران</p>
            <p>تاریخچه نگارگری</p>
            <p>نمایش در ایران</p>
            <p>درآمدی بر خوشنویسی</p>
          </div>
        </div>
      </div>
      <footer className="clientFooter">
        <Typography fontSize={14} color="primary">
          کلیه حقوق مادی و معنوی این سایت متعلق به فروشگاه کتاب ماتیکان می باشد
        </Typography>
        <IconButton color="primary">
          <Telegram sx={{ mx: 2 }} />
          <Instagram sx={{ mx: 2 }} />
          <Facebook sx={{ mx: 2 }} />
          <WhatsApp sx={{ mx: 2 }} />
        </IconButton>
      </footer>
    </div>
  )
}

export default Footer
