import { Route, Routes } from "react-router";
import Register from "../Components/Register";
import Login from "../Components/Login";

function Auth() {
  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Auth;
