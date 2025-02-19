import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => String(p._id) === id);

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8E1B7]">
        <h2 className="text-2xl font-semibold text-red-500">Paste not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-[#F8E1B7]">
      {/* Header */}
      <h1 className="text-4xl font-semibold text-gray-700 mb-6">Paste</h1>

      {/* Title Input */}
      <input
        type="text"
        value={paste.title}
        disabled
        className="w-full max-w-xl text-2xl font-medium px-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-700 outline-none shadow-sm"
      />

      {/* Content Box */}
      <textarea
        value={paste.content}
        disabled
        rows={10}
        className="w-full max-w-xl text-lg px-4 py-2 mt-4 bg-white border border-gray-300 rounded-xl text-gray-700 outline-none shadow-sm resize-none"
      />
    </div>
  );
};

export default ViewPaste;

