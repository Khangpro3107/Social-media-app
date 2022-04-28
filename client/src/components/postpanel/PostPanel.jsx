import { Edit, Info, Delete, Flag } from "@mui/icons-material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./postpanel.css";

const PostPanel = ({ postId, userId, showPanel, setShowPanel }) => {
  const { user: currentUser } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + postId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="panelContainer">
      <button className="panelItem">
        <Info /> Info
      </button>
      {currentUser._id === userId && (
        <>
          <button className="panelItem">
            <Edit /> Edit
          </button>
          <button className="panelItem" onClick={handleDelete}>
            <Delete /> Delete
          </button>
        </>
      )}
      {currentUser._id !== userId && (
        <button className="panelItem">
          <Flag /> Report
        </button>
      )}
    </div>
  );
};

export default PostPanel;
