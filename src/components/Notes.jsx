import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdEditSquare } from "react-icons/md";
import { FilterContext } from "../context/FilterContext";
import { ThemeContext } from "../context/ThemeContext";

const Notes = () => {
  const { isDark } = useContext(ThemeContext);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { searchTitle, selectedState, filterDate } = useContext(FilterContext);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  const filteredNotes = notes.filter((note) => {
    const noteDate = new Date(note.date);
    const filterDateObj = new Date(filterDate);

    return (
      note.title?.toLowerCase().includes(searchTitle?.toLowerCase() || "") &&
      (selectedState?.trim() === "" ||
        selectedState?.toLowerCase() === note.emotional_state?.toLowerCase()) &&
      (!filterDate || noteDate.toDateString() === filterDateObj.toDateString())
    );
  });

  const openModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setNoteToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setNoteToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    if (!noteToDelete) return;

    const updatedNotes = notes.filter((note) => note.id !== noteToDelete);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setIsDeleteModalOpen(false);
  };

  const stateStyles = (isDark) => ({
    happy: { bg: isDark ? "#ffff78" : "#FFE66D", emoji: "😄" },
    sad: { bg: isDark ? "#5bc9cf" : "#a8e5ff", emoji: "😞" },
    angry: { bg: isDark ? "#f26f78" : "#fca7a7", emoji: "😡" },
    excited: { bg: isDark ? "#c465e0" : "#e7b0ff", emoji: "🤩" },
    funny: { bg: isDark ? "#fc4cb9" : "#faa0d3", emoji: "😂" },
    normal: { bg: isDark ? "#61b560" : "#a1ffb0", emoji: "📝" },
    important: { bg: isDark ? "#7c72e8" : "#99A8FF", emoji: "⭐" },
    bored: { bg: isDark ? "#cfcfcf" : "#ccc8c4", emoji: "🥱" },
  });

  const getBgColor = (state, isDark) => {
    const styles = stateStyles(isDark);
    return styles[state?.toLowerCase()]?.bg || "#e8e8e8";
  };

  const getEmoji = (state, isDark) => {
    const styles = stateStyles(isDark);
    return styles[state?.toLowerCase()]?.emoji || "❔";
  };

  return (
    <div
      className={`${
        isDark ? "bg-[#1d1021]" : "bg-[#ffffff]"
      } w-full h-screen overflow-y-auto`}
    >
      <div className=" w-full  py-4 flex flex-col items-center">
        <div className="mt-[8vh] px-6 md:px-0 ">
          <div className="grid grid-cols-1  xs:grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 justify-items-center xs:gap-x-10 sm:px-10 ">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="mt-8 border-1 border-[#e8e8e8] px-4 py-2 shadow-2xl w-[80vw] xs:w-[180px] lg:w-[180px] overflow-hidden flex flex-col items-center cursor-pointer"
                  style={{
                    backgroundColor: getBgColor(note.emotional_state, isDark),
                  }}
                  onClick={() => openModal(note)}
                >
                  <div className="flex mb-6 justify-between w-full">
                    <div className="text-xl">
                      <p>{getEmoji(note.emotional_state)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(note.id);
                        }}
                        className="text-[#ff0000]
                        font-mono text-xl"
                      >
                        <MdOutlineDeleteOutline />
                      </button>

                      <Link
                        to={`/update/${note.id}`}
                        state={{ note }}
                        className="flex"
                      >
                        <button
                          className={` ${
                            isDark ? "text-[#000000]" : "text-[#635167]"
                          } font-mono text-xl`}
                        >
                          <MdEditSquare />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full text-left">
                    <h1 className="text-[#4e0956] text-md md:text-1xl font-bold">
                      {note.title}
                    </h1>
                    <p className="text-sm mt-1 mb-4 lg:text-[14px] line-clamp-2 overflow-hidden text-ellipsis">
                      {note.description}
                    </p>
                  </div>
                  <div className="w-full flex justify-end mt-auto">
                    <p className="text-xs text-[#000000] font-bold">
                      {note.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="absolute top-1/2 flex flex-col items-center justify-center">
                <h1
                  className={`${
                    isDark ? "text-[#c0a1ca]" : "text-[#2b384a]"
                  }  text-lg font-semibold text-center mt-4`}
                >
                  &quot;No notes&quot;
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 bg-[black]/80 flex justify-center items-center z-50">
          <div
            className={` ${
              isDark ? "bg-[black]" : "bg-white"
            } p-6 rounded-md text-center w-[80%] md:w-[50%] relative`}
          >
            <button
              onClick={closeModal}
              className={`absolute top-2 right-2 text-xl ${
                isDark ? "text-[#c2a2ca]" : "text-[#2e1d39]"
              }`}
            >
              <IoClose />
            </button>
            <div
              className={`border-[1px] p-4 m-1 ${
                isDark ? "border-[#483e4b]" : "border-[#5e5168]"
              }`}
            >
              <h1
                className={`${
                  isDark ? "text-[#ecfc5b]" : "text-[#2e1d39]"
                }    text-1xl md:text-xl mt-4 font-bold mb-2 text-[#4e0956]`}
              >
                {selectedNote.title}
              </h1>
              <p
                className={` ${
                  isDark ? "text-[#c2a2ca]" : "text-[#2e1d39]"
                } text-sm  md:text-base overflow-auto break-words`}
              >
                {selectedNote.description}
              </p>
              <p
                className={` ${
                  isDark ? "text-[#29b8ff]" : "text-[#2e1d39]"
                } text-right text-[12px] mt-6 font-bold`}
              >
                {selectedNote.date}
              </p>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-[black]/80 flex justify-center items-center z-50">
          <div
            className={`${
              isDark ? " bg-[black]" : "bg-[white]"
            } p-6 rounded-sm text-center w-[80%] md:w-[50%] relative`}
          >
            <button
              onClick={closeDeleteModal}
              className={` ${
                isDark ? "text-[#c2a2ca]" : "text-[#2e1d39]"
              } absolute top-2 right-2 text-xl text-[#2e1d39]`}
            >
              <IoClose />
            </button>

            <h1
              className={` ${
                isDark ? "text-[#c2a2ca]" : "text-[#2e1d39]"
              } text-sm md:text-lg my-4`}
            >
              Are you sure you want to delete this note?
            </h1>

            <div>
              <button
                onClick={handleDelete}
                className="bg-[red] hover:bg-[#c40303] text-white font-semibold text-xs md:text-lg py-2 px-3 mx-2 rounded-sm"
              >
                Delete
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-[#5c4165] hover:bg-[#3b2241] text-white rounded-sm font-semibold py-2 px-3 md:text-lg text-xs mx-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
