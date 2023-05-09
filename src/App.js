import { Routes, Route } from "react-router-dom";
import { Home } from '../src/pages/home/Home';
import { Details } from '../src/pages/details/Details';
import  UsersPosts  from "./pages/details/UsersPosts";


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />
      <Route path="/users/:id/posts" element={<UsersPosts />} />
    </Routes>
  );
}

export default App;
