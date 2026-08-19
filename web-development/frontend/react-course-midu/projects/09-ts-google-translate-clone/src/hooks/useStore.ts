import { AUTO_LANGUAGUE } from "../constants";
import {
  type FromLanguage,
  type Language,
  type State,
  type Action,
} from "../types.d";
import { useReducer } from "react";

const initialState: State = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === "INTERCHANGE_LANGUAGES") {
    if (state.fromLanguage === AUTO_LANGUAGUE) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      loading,
      result: "",
    };
  }
  if (type === "SET_FROM_LANGUAGE") {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      fromLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== "";

    return {
      ...state,
      toLanguage: action.payload,
      result: "",
      loading,
    };
  }

  if (type === "SET_FROM_TEXT") {
    const loading = action.payload !== "";
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }
  return state;
}

export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
