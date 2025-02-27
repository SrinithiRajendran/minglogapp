import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../context/ThemeContext";

const AddNotes = () => {
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    emotional_state: "Normal",
    date: "",
  });
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.title || !note.description || !note.date) {
      alert("Please fill all fields");
      return;
    }

    try {
      const newNote = {
        ...note,
        id: uuidv4(),
      };

      const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      storedNotes.push(newNote);
      localStorage.setItem("notes", JSON.stringify(storedNotes));

      console.log("Note Added: ", newNote);
      navigate("/");
    } catch (err) {
      console.error("Error Adding Note: ", err);
      alert("An error occurred while adding the note. Please try again.");
    }
  };

  const labeltextColor = isDark ? "text-[#c2a2ca]" : "text-[#1d1021]";
  const inputBoxColor = isDark
    ? "bg-[#453b47] text-[white]"
    : " text-[#1d1021]";

  return (
    <div
      className={` ${isDark ? "bg-[#1d1021]" : "bg-white"}
      min-h-screen flex flex-col items-center md:pt-[11vh] pt-[8vh] md:pb-6`}
    >
      <form
        className={` ${
          isDark ? "bg-[#1d1021]" : "bg-white"
        }  md:shadow-lg   p-6 w-full max-w-md`}
        onSubmit={handleSubmit}
      >
        <h1
          className={`text-center font-bold mb-4 font-mono ${
            isDark ? "text-[#c2a2ca]" : "text-[#635167]"
          }`}
        >
          Add New Note
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className={`block ${labeltextColor} font-medium mb-1`}
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Enter a Title"
              className={` ${inputBoxColor} w-full text-[14px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block ${labeltextColor} font-medium mb-1`}
            >
              Note
            </label>
            <textarea
              rows="4"
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Write your notes here..."
              className={` ${inputBoxColor} w-full text-[14px]  px-4  py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
            />
          </div>

          <div>
            <label
              htmlFor="emotional_state"
              className={`block ${labeltextColor} font-medium mb-1`}
            >
              Emotion
            </label>
            <select
              id="emotional_state"
              name="emotional_state"
              onChange={handleChange}
              value={note.emotional_state}
              className={` ${inputBoxColor} text-[14px] w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
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
              className={`block ${labeltextColor} font-medium mb-1`}
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              onChange={handleChange}
              className={`${inputBoxColor} w-full px-4 text-[14px]  cursor-pointer py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#5a4761]`}
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
            Add Note
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

export default AddNotes;
