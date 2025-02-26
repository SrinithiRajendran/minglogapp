import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdEditSquare } from "react-icons/md";
import { FilterContext } from "../context/FilterContext";

const Notes = () => {
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

  const stateStyles = {
    happy: { bg: "#FFE66D", emoji: "😄" },
    sad: { bg: "#a8e5ff", emoji: "😞" },
    angry: { bg: "#fca7a7", emoji: "😡" },
    excited: { bg: "#e7b0ff", emoji: "🤩" },
    normal: { bg: "#a1ffb0", emoji: "📝" },
    important: { bg: "#99A8FF", emoji: "⭐" },
    bored: { bg: "#ccc8c4", emoji: "🥱" },
  };

  const getBgColor = (state) =>
    stateStyles[state?.toLowerCase()]?.bg || "bg-gray-200";
  const getEmoji = (state) => stateStyles[state?.toLowerCase()]?.emoji || "❔";

  return (
    <>
      <div className="bg-[#ffffff] w-full h-full py-4 flex flex-col items-center">
        <div className="mt-[10vh]">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center xs:gap-x-10 px-10 pb-4">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="mt-10 border-1 border-[#e8e8e8] px-4 py-2 shadow-xl w-[180px] lg:w-[170px] overflow-hidden flex flex-col items-center cursor-pointer"
                  style={{ backgroundColor: getBgColor(note.emotional_state) }}
                  onClick={() => openModal(note)}
                >
                  <div className="flex mb-6 justify-between w-full">
                    <div className="text-xl">
                      <p>{getEmoji(note.emotional_state)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(note.id);
                        }}
                        className="text-[red] font-mono text-xl"
                      >
                        <MdOutlineDeleteOutline />
                      </button>

                      <Link
                        to={`/update/${note.id}`}
                        state={{ note }}
                        className="flex"
                      >
                        <button className="text-[#635167] font-mono text-xl">
                          <MdEditSquare />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="w-full text-left">
                    <h1 className="text-[#4e0956] text-md md:text-1xl font-semibold">
                      {note.title}
                    </h1>
                    <p className="text-sm mt-1 mb-4 lg:text-[14px] line-clamp-2 overflow-hidden text-ellipsis">
                      {note.description}
                    </p>
                  </div>
                  <div className="w-full flex justify-end mt-auto">
                    <p className="text-xs text-[#000000]">{note.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="fixed inset-0 flex flex-col items-center justify-center z-[-1]">
                <h1 className="text-[#5e0909] text-lg font-semibold text-center">
                  &quot;No notes match your search!&quot;
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedNote && (
        <div className="fixed inset-0 bg-[black]/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md text-center w-[80%] md:w-[50%] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-[#2e1d39]"
            >
              <IoClose />
            </button>

            <h1 className="text-1xl md:text-xl mt-4 font-bold mb-2 text-[#4e0956]">
              {selectedNote.title}
            </h1>
            <p className="text-sm md:text-base">{selectedNote.description}</p>
            <p className="text-right text-[12px] mt-6 font-bold text-[#2d1f34]">
              {selectedNote.date}
            </p>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-[black]/80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-sm text-center w-[80%] md:w-[50%] relative">
            <button
              onClick={closeDeleteModal}
              className="absolute top-2 right-2 text-xl text-[#2e1d39]"
            >
              <IoClose />
            </button>

            <h1 className="text-sm md:text-lg my-4">
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
    </>
  );
};

export default Notes;
