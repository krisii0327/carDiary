import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import GaragePage from "./pages/components/GaragePage";
import FavouritesPage from "./pages/components/FavouritesPage";
import CarFormPage from "./pages/components/CarFormPage";
import NotePage from "./pages/components/NotePage";
import NoteFormPage from "./pages/components/NoteFormPage";
import IndexNotePage from "./pages/IndexNotePage";

//axios.defaults.baseURL = "http://127.0.0.1:4000/backend"
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true; //withCredentials: true will send cookies to the memory.

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/garage/:id" element={<IndexNotePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="/account/garage" element={<GaragePage />} />
          <Route path="/account/garage/new" element={<CarFormPage />} />
          <Route path="/account/garage/:id" element={<CarFormPage />} />

          <Route path="/account/garage/:id/notes/newNote" element={<NoteFormPage />} />
          <Route path="/account/garage/:id/notes/edit/:note_id" element={<NoteFormPage />} />
          <Route path="/account/garage/:id/notes" element={<NotePage />} />

          <Route path="/account/favourites" element={<FavouritesPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
