import { useState } from "react";
import { useChannels } from "./hooks/useChannels";
import { ThreadList, Thread } from "./components";
import "./App.css";

function App() {
  const { data: threads } = useChannels();
  const [selectedThread, setSelectedThread] = useState(null);

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
  };

  return (
    <>
      <h1>Sports Fans</h1>
      <ThreadList threads={threads} onThreadSelect={handleThreadSelect} />
      {selectedThread && <Thread thread={selectedThread} />}
    </>
  );
}

export default App;
