import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PromptForm.css";

function PromptForm({ setImages }) {
    const [promptText, setPromptText] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const promptRes = await axios.post("http://127.0.0.1:8000/prompts/", {
                text: promptText,
            });
            const promptId = promptRes.data.id;

            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                formData.append("prompt_id", promptId);

                await axios.post("http://127.0.0.1:8000/images/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            const res = await axios.get("http://127.0.0.1:8000/images/");
            setImages(res.data);

            alert("✅ Creation uploaded successfully!");
            setPromptText("");
            setImageFile(null);
        } catch (err) {
            alert("⚠️ Upload failed: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Add New Creation</h2>
                <form className="prompt-form" onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Describe your vision... (Be as detailed as possible)"
                        value={promptText}
                        onChange={(e) => setPromptText(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        required
                    />
                    <button type="submit">Upload to Gallery</button>
                </form>
                <Link to="/" className="back-link">← Back to Gallery</Link>
            </div>
        </div>
    );
}

export default PromptForm;