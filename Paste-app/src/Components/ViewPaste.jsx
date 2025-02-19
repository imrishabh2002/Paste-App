import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams(); // ✅ Get the ID from the URL
  const allPastes = useSelector((state) => state.paste.pastes);
  const theme = useSelector((state) => state.theme.theme);

  // ✅ Find the paste by ID
  const paste = allPastes.find((p) => String(p._id) === id);

  if (!paste) {
    return <h2 className="text-center text-red-500">Paste not found</h2>;
  }

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-6 transition-all
      ${theme === "light" ? "bg-[#F8E1B7] text-black" : "bg-[#121212] text-white"}
    `}
    >

      {/* Title Input */}
      <input
        type="text"
        value={paste.title}
        disabled
        className={`w-full max-w-xl text-2xl font-medium px-4 py-2 rounded-lg outline-none transition-all 
        ${theme === "light" ? "bg-white border border-gray-400 text-black" : "bg-[#1E1E1E] border border-gray-700 text-white"}
      `}
      />

      {/* Content Box */}
      <textarea
        value={paste.content}
        disabled
        rows={10}
        className={`w-full max-w-xl px-4 py-2 mt-4 rounded-lg outline-none resize-none transition-all
        ${theme === "light" ? "bg-white border border-gray-400 text-black" : "bg-[#1E1E1E] border border-gray-700 text-white"}
      `}
      />

      {/* Created Date */}
      <div className="mt-3 text-sm text-gray-500">
        Created on: {new Date(paste.createdAt).toDateString()}
      </div>
    </div>
  );
};

export default ViewPaste;
