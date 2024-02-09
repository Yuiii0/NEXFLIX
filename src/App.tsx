import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import TV from "./Pages/TV";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:movieId" element={<Home />}></Route>
        <Route path="/tv" element={<TV />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
