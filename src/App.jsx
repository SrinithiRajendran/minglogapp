import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./components/Notes";
import AddNotes from "./components/AddNotes";
import UpdateNotes from "./components/UpdateNotes";
import Navbar from "./components/Navbar";
import { FilterProvider } from "./context/FilterContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/add" element={<AddNotes />} />
            <Route path="/update/:id" element={<UpdateNotes />} />
          </Routes>
        </BrowserRouter>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
