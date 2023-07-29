/* eslint-disable react/prop-types */
import { ThreadPreview } from "./ThreadPreview";

export const ThreadList = ({ threads, onThreadSelect }) => (
  <ul id="channel-list">
    {threads?.map((thread) => (
      <ThreadPreview
        key={thread.id}
        thread={thread}
        onSelect={onThreadSelect}
      />
    ))}
  </ul>
);
