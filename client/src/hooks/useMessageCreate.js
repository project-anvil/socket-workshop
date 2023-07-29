import { useState } from "react";
import { API_HOST } from "../constants";

export const useMessageCreate = (channelId) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function postMessage(message) {
    fetch(`${API_HOST}/messages/${channelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsSuccess(true);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }

  return { data, isFetching, isError, isSuccess, postMessage };
};
