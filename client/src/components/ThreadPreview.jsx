/* eslint-disable react/prop-types */
import "./previewCard.css";

export const ThreadPreview = ({ thread, onSelect }) => {
  if (!thread) return null;

  const handleButtonPress = () => {
    onSelect(thread);
  };
  return (
    <button className="preview-card" onClick={handleButtonPress}>
      <h3>
        {thread.name}
        {thread.icon}
      </h3>
    </button>
  );
};
