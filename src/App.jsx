import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Registration from './components/Registration'
import Dashboard from './components/Dashboard'
import AddCustomer from './components/AddCustomer'
import UserProfile from './components/UserProfile'
import ChangePassword from './components/ChangePassword'
import Sales from './components/Sales'

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path='/Login' element={<LoginPage/>}/>
            <Route exact path="/Registration" element={<Registration/>}/>
            <Route exact path="/Dashboard" element={<Dashboard/>}/>
            <Route exact path="/AddCustomer" element={<AddCustomer/>}/>
            <Route exact path="/Profile" element={<UserProfile/>}/>
            <Route exact path="/ChangePassword" element={<ChangePassword/>}/>
            <Route exact path="/Sales" element={<Sales/>}/>
            <Route path="/Logout" element={<Navigate replace to="/Login" />}/>
            <Route path="/" element={<Navigate replace to="/Login" />}/>
          </Routes>
        </Router>
        
      </div>
    </>
  )
}
export default App
