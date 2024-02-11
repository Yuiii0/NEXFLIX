import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import MyPage from "./Pages/MyPage";
import Search from "./Pages/Search";
import SignUp from "./Pages/SignUp";
import TV from "./Pages/TV";

import { Provider } from "react-redux";
import { AuthProvider } from "./contexts/auth.context";
import DefaultLayout from "./layouts/DefaultLayout";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<LogIn />} />
            <Route path="/main" element={<Home />}></Route>
            <Route path="/movies/:movieId" element={<Home />}></Route>
            <Route path="/tv" element={<TV />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-page" element={<MyPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Provider>
  );
}

export default App;
