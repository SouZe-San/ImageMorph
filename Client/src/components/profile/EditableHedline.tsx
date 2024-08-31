import { useEffect, useState } from "react";
const EditableHeadline = () => {
  // State to hold the header text
  const [headerText, setHeaderText] = useState("Collection");
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle editing mode

  useEffect(() => {
    const savedHeaderText = localStorage.getItem("headerText");
    if (savedHeaderText) {
      setHeaderText(savedHeaderText);
    }
  }, []);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    localStorage.setItem("headerText", headerText);
  };
  return (
    <div className="editableBox">
      {isEditing ? (
        <input
          type="text"
          value={headerText}
          onChange={(e) => setHeaderText(e.target.value)}
          onBlur={toggleEditing} // Stop editing when input loses focus
          autoFocus // Automatically focus the input when editing
        />
      ) : (
        <h2 onClick={toggleEditing}>{headerText}</h2> // Click to edit
      )}
    </div>
  );
};

export default EditableHeadline;
