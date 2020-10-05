import { useCallback, useReducer } from "react";

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { isLoading: true, error: null, resData: null, reqExtra: null };
    case "RESPONSE":
      return {
        ...currentHttpState,
        isLoading: false,
        resData: action.resData,
        reqExtra: action.reqExtra,
      };
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
    reqExtra: null,
    identifier: null,
  });

  const sendRequest = useCallback((url, method, body, reqExtra, identifier) => {
    httpDispatch({ type: "SEND", identifier });
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((resData) => httpDispatch({ type: "RESPONSE", resData, reqExtra }))
      .catch((err) =>
        httpDispatch({ type: "ERROR", errorMessage: err.message })
      );
  }, []);

  return {
    isLoading: httpState.isLoading,
    error: httpState.error,
    resData: httpState.resData,
    sendRequest,
    reqExtra: httpState.reqExtra,
    identifier: httpState.identifier,
  };
};

export default useHttp;
