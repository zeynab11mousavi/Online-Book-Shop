import admin from '../../../Assets/pic/admin.png'
import './adminPanel.css'
const AdminPanel = () => {
  return (
    <div className="adminPanelContainer">
      <img src={admin} alt="پنل ادمین" className="adminPanelPic" />
      <div className="adminTitlesWrapper">
        <h2>شما وارد پنل مدیریتی شدید</h2>
        <h2>با کلیک بر هر گزینه، وارد بخش مربوطه خواهید شد.</h2>
      </div>
    </div>
  )
}

export default AdminPanel
