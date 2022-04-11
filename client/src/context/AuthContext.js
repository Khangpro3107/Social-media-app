import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6252ffd62c0b51ebf67b6015",
    username: "Khang3",
    email: "khang3@gmail.com",
    profilePicture: "person/noavatar.png",
    coverPicture: "person/nocover.png",
    followers: ["6252ffb22c0b51ebf67b6013"],
    followings: ["6252ff662c0b51ebf67b6011"],
    desc: "Hello",
    city: "Melbourne",
    from: "Canberra",
    relationship: { $numberInt: "1" },
    createdAt: { $date: { $numberLong: "1649606614632" } },
    updatedAt: { $date: { $numberLong: "1649606800410" } },
  },
  isFetching: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
