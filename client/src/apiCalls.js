import { LoginFailure, LoginStart, LoginSuccess } from "./context/AuthActions"
import axios from "axios"

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(LoginStart())
  try {
    const res = await axios.post("/auth/login", userCredentials)
    dispatch(LoginSuccess(res.data))
  } catch (error) {
    dispatch(LoginFailure(error))
  }
}