import { useEffect, useState } from "react";
import { API_HOST } from "../constants";

export const useChannelMessages = (channelId) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isFetching) return;
    setIsFetching(true);
    fetch(`${API_HOST}/messages/${channelId}`)
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
  }, [channelId]);

  return { data, isFetching, isError, isSuccess };
};
