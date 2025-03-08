import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import ChoosePage from "./pages/ChoosePage.jsx";
import AddItem from "./pages/AddItem.jsx";
import ManageItems from "./pages/ManageItems.jsx";
import EditItemPage from "./pages/EditItemPage.jsx";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/choose" element={<ChoosePage />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/manage-items" element={<ManageItems />} />
                <Route path="/edit-item/:id" element={<EditItemPage />} />
            </Routes>
        </Router>
    );
};

export default App;
