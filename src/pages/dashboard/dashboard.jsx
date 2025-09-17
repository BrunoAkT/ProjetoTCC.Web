import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavTab.jsx";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <NavBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
