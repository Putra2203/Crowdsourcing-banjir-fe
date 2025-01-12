const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null; 
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // Klik area luar modal untuk menutup
      >
        <div
          className="bg-white p-4 rounded-lg shadow-lg max-w-full max-h-full"
          onClick={(e) => e.stopPropagation()} 
        >
          <button
            className="absolute top-4 right-4 text-white bg-red-500 px-3 py-1 rounded-lg"
            onClick={onClose}
          >
            Tutup
          </button>
          <img
            src={imageUrl}
            alt="Gambar Modal"
            className="max-w-full max-h-[80vh] rounded-md"
          />
        </div>
      </div>
    );
  };
  
  export default ImageModal;
  