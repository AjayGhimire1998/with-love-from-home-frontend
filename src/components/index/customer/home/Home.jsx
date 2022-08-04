import React from "react";
import { customerLogOut } from "../../../../app/services/auth-services/auth-service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
// console.log(customerLogOut);
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    customerLogOut();
    navigate("/login");
  };
  return (
    <>
      <div>Welcome Home</div>
      <button onClick={handleLogOut}> LOGOUT</button>
    </>
  );
}
