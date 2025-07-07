import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    // emojiData has 'emoji' (string) and 'imageUrl' (if available)
    onSelect(emojiData?.emoji || ""); // Use emoji character as icon
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            // Show emoji character
            <span className="text-4xl">{icon}</span>
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            className="w-7 h-7 items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-12 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
