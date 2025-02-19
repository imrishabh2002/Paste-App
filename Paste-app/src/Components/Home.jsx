import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [Title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title: Title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-#F8E1B7">
      {/* Header */}
      <h1 className="text-4xl font-semibold text-gray-700 mb-4 ">Notes</h1>

      {/* Note Input Box */}
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-4">
        <input
          type="text"
          value={Title}
          placeholder="Enter a Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-xl font-medium px-2 py-2 bg-transparent outline-none"
        />

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          className="w-full text-lg px-2 py-2 bg-transparent outline-none resize-none"
          placeholder="Enter your note..."
        />
      </div>

      {/* Save Button */}
      <button
        onClick={createPaste}
        className="mt-4 px-6 py-2 bg-yellow-700 text-white rounded-lg shadow-md text-lg transition hover:bg-yellow-600"
      >
        {pasteId ? "Update Note" : "Save Note"}
      </button>
    </div>
  );
};

export default Home;
