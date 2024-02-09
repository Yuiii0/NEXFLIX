import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";

function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default DefaultLayout;
