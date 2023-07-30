import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";


function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  deleteAllCookies();

  useEffect(() => {
    dispatch(checkAuthen(false));
    navigate("/");
  })

  return (
    <>
    </>
  )
}

export default Logout;