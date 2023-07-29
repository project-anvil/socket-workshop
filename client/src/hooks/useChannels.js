import { useEffect, useState } from "react";
import { API_HOST } from "../constants";

export const useChannels = () => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_HOST}/channels`)
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
  }, []);

  return { data, isFetching, isError, isSuccess };
};
