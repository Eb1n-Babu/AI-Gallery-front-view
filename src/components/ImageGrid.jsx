import { Link } from "react-router-dom";
import "./ImageGrid.css";

function ImageGrid({ images }) {
    const copyPrompt = (promptText) => {
        if (promptText) {
            navigator.clipboard.writeText(promptText);
            alert("✨ Prompt copied!");
        }
    };

    return (
        <>
            <div className="cosmic-bg"></div>
            <div className="stars"></div>

            <div className="heading-bar">
                <h1 className="gallery-heading">AI Prompts Gallery</h1>
                <Link to="/add" className="add-link">
                    + Add Creation
                </Link>
            </div>

            <ul className="photogallery">
                {images.map((img) => (
                    <li key={img.id} onClick={() => copyPrompt(img.prompt?.text)}>
                        <img
                            src={img.image}
                            alt="AI Generated"
                            loading="lazy"
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ImageGrid;