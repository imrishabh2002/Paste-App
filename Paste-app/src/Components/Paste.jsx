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
    <div className="min-h-screen bg-[#F8E1B7] p-6 flex flex-col items-center">
      {/* Search Bar */}
      <input
        type="search"
        placeholder="Search paste here..."
        className="w-full max-w-3xl px-4 py-2 mb-6 bg-white border border-gray-400 rounded-xl text-gray-700 text-lg focus:outline-none focus:border-gray-500 shadow-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Header */}
      <h1 className="text-4xl font-semibold text-gray-700 mb-4">All Pastes</h1>

      {/* Paste List */}
      <div className="w-full max-w-3xl space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste?._id} className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 text-left">{paste.title}</h2>
              <p className="text-gray-600 text-sm mt-1 truncate text-left">{paste.content}</p>

              <div className="flex gap-4 mt-4 text-lg text-gray-600 justify-end">
                <NavLink to={`/?pasteId=${paste?._id}`} className="hover:text-blue-700"><FaEdit /></NavLink>
                <button onClick={() => handleDelete(paste?._id)} className="hover:text-red-500"><FaTrash /></button>
                <NavLink to={`/pastes/${paste?._id}`} className="hover:text-green-500"><FaEye /></NavLink>
                <button onClick={() => handleShare(paste?._id)} className="hover:text-yellow-500"><FaShareAlt /></button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast("Content copied to clipboard", { icon: "👌" });
                  }}
                  className="hover:text-gray-500"
                >
                  <FaCopy />
                </button>
              </div>
              <div className="flex items-center justify-end mt-3 text-gray-500 text-sm">
                <span>{new Date(paste.createdAt).toDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
