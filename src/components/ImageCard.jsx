import "./ImageGrid.css";

function ImageCard({ image }) {
    const copyPrompt = () => {
        if (image.prompt?.text) {
            navigator.clipboard.writeText(image.prompt.text);
            alert("✨ Prompt copied to clipboard!");
        } else {
            alert("⚠️ No prompt available");
        }
    };

    return (
        <div className="image-card">
            <img
                src={image.image}
                alt="Generated"
                onClick={copyPrompt}
            />
        </div>
    );
}

export default ImageCard;
