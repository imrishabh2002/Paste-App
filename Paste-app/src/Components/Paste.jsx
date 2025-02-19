import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash, FaEye, FaShareAlt, FaCopy } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast("Link copied to clipboard", { icon: "🔗" });
  }

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-6 transition-all 
      ${theme === "light" ? "bg-[#F8E1B7] text-black" : "bg-[#121212] text-white"}
    `}
    >
      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search paste here..."
        className={`w-full max-w-2xl px-4 py-2 mb-6 text-lg rounded-xl transition-all outline-none 
        ${theme === "light" ? "bg-white border border-gray-400 text-black" : "bg-[#1E1E1E] border border-gray-700 text-white"}
      `}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">All Pastes</h1>

      {/* Paste List */}
      <div className="w-full max-w-2xl space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className={`p-4 rounded-lg border shadow-md transition-all 
              ${theme === "light" ? "bg-white border-gray-400" : "bg-[#1E1E1E] border-gray-700"}
            `}
            >
              <h2 className="text-xl font-semibold text-left">{paste.title}</h2>
              <p className="text-gray-500 text-sm mt-1 truncate text-left">{paste.content}</p>

              {/* Buttons */}
              <div className="flex gap-4 mt-4 text-lg text-gray-500 justify-end">
                <NavLink to={`/?pasteId=${paste?._id}`} className="hover:text-blue-400">
                  <FaEdit />
                </NavLink>
                <button onClick={() => handleDelete(paste?._id)} className="hover:text-red-500">
                  <FaTrash />
                </button>
                <NavLink to={`/pastes/${paste?._id}`} className="hover:text-green-400">
                  <FaEye />
                </NavLink>
                <button onClick={() => handleShare(paste?._id)} className="hover:text-yellow-400">
                  <FaShareAlt />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast("Content copied to clipboard", { icon: "👌" });
                  }}
                  className="hover:text-gray-400"
                >
                  <FaCopy />
                </button>
              </div>

              {/* Date */}
              <div className="flex items-center justify-end mt-3 text-gray-400 text-sm">
                <span>{new Date(paste.createdAt).toDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
