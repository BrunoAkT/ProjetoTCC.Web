import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login.jsx';
import Dashboard from '../pages/dashboard/dashboard.jsx';

function RoutesOpen() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}


export default RoutesOpen
