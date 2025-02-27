import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ThemeContext } from "../context/ThemeContext";

const UpdateNotes = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const noteId = location.pathname.split("/")[2];

  const noteData = location.state?.note || null;

  const [updateNote, setUpdateNote] = useState({
    title: noteData?.title || "",
    description: noteData?.description || "",
    emotional_state: noteData?.emotional_state || "Normal",
    date: noteData?.date || "",
  });

  useEffect(() => {
    if (!noteData) {
      const storedNote = JSON.parse(localStorage.getItem("notes"))?.find(
        (note) => note.id === noteId
      );
      if (storedNote) {
        setUpdateNote(storedNote);
      } else {
        console.error("Note not found in localStorage");
      }
    }
  }, [noteId, noteData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updateNote.title || !updateNote.description || !updateNote.date) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = notes.map((note) =>
        note.id === noteId ? { ...note, ...updateNote } : note
      );

      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      alert("Note updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating note", err);
      alert("Failed to update note. Please try again.");
    }
  };
  const labeltextColor = isDark ? "text-[#c2a2ca]" : "text-[#1d1021]";
  const inputBoxColor = isDark
    ? "bg-[#453b47] text-[white]"
    : " text-[#1d1021]";

  return (
    <div
      className={` ${
        isDark ? "bg-[#1d1021]" : "bg-white"
      } min-h-screen flex flex-col items-center md:pt-[11vh] pt-[8vh] md:pb-10`}
    >
      <form
        className={` ${
          isDark ? "bg-[#1d1021]" : "bg-white"
        }  shadow-md  p-6 w-full max-w-md`}
        onSubmit={handleSubmit}
      >
        <h1
          className={`text-center font-bold mb-4 font-mono ${
            isDark ? "text-[#c2a2ca]" : "text-[#635167]"
          }`}
        >
          Edit Note
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className={` ${labeltextColor} block font-medium mb-1`}
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={updateNote.title}
              onChange={handleChange}
              placeholder="Enter a Title"
              className={` ${inputBoxColor} w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className={` ${labeltextColor} block font-medium mb-1`}
            >
              Note
            </label>
            <textarea
              rows="4"
              id="description"
              name="description"
              value={updateNote.description}
              onChange={handleChange}
              placeholder="Write your notes here..."
              className={` ${inputBoxColor} w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            />
          </div>

          <div>
            <label
              htmlFor="emotional_state"
              className={` ${labeltextColor} block font-medium mb-1`}
            >
              Emotion
            </label>
            <select
              id="emotional_state"
              name="emotional_state"
              value={updateNote.emotional_state}
              onChange={handleChange}
              className={` ${inputBoxColor}  w-full px-4 text-[14px] py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            >
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Excited">Excited</option>
              <option value="Angry">Angry</option>
              <option value="Normal">None</option>
              <option value="Important">Important</option>
              <option value="Bored">Bored</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className={` ${labeltextColor} block font-medium mb-1`}
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={updateNote.date}
              onChange={handleChange}
              className={` ${inputBoxColor} w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            />
          </div>
        </div>

        <div className="flex gap-10 text-xs">
          <button
            type="submit"
            className={`w-full mt-6 ${
              isDark ? "bg-[#635167]" : "bg-[#1d1021]"
            } text-[white] py-2 px-4 rounded-sm hover:bg-[#3f3649]`}
          >
            Save Note
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 bg-[#f91c03] text-[white] py-2 px-4 rounded-sm hover:bg-[#cd2e0a]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNotes;
