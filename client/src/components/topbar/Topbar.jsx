import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from "../../context/AuthActions";
import { useNavigate } from "react-router"

export default function Topbar() {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleLogout = () => {
    dispatch(Logout())
    localStorage.removeItem("user")
    navigate("/login")
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Fakebook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <div className="topbarButtons">
          <button className="topbarButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={pf + user.profilePicture} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
