import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageGrid from "./components/ImageGrid";
import PromptForm from "./components/PromptForm";

function App() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/images/")
            .then(res => setImages(res.data))
            .catch(err => console.error("Error fetching images:", err));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ImageGrid images={images} />} />
                <Route path="/add" element={<PromptForm setImages={setImages} />} />
            </Routes>
        </Router>
    );
}

export default App;
