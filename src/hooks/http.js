import { useCallback, useReducer } from "react";

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoading: true, error: null, resData: null };
    case "RESPONSE":
      return { ...currentHttpState, isLoading: false, resData: action.resData };
    case "ERROR":
      return {
        ...currentHttpState,
        isLoading: false,
        error: action.errorMessage,
      };
    default:
      return new Error("Should not be reached!");
  }
};

const useHttp = () => {
  const [httpState, httpDispatch] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    resData: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    httpDispatch({ type: "SEND" });
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((resData) => httpDispatch({ type: "RESPONSE", resData }))
      .catch((err) =>
        httpDispatch({ type: "ERROR", errorMessage: err.message })
      );
  }, []);

  return {
    isLoading: httpState.isLoading,
    error: httpState.error,
    resData: httpState.resData,
    sendRequest,
  };
};

export default useHttp;
