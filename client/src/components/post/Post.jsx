import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { ThumbUpOffAlt, ThumbUpAlt, CleaningServices } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import PostPanel from "../postpanel/PostPanel";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showPanel, setShowPanel] = useState(false);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users?userId=" + post.userId);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = async () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePanelClick = () => {
    setShowPanel(!showPanel);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          {console.log(111111111111111, user)}
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={pf + user.profilePicture}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <button onClick={handlePanelClick} className="showPanelButton">
              <MoreVert />
            </button>
          </div>
          {showPanel && <PostPanel postId={post._id} userId={post.userId} showPanel={showPanel} setShowPanel={setShowPanel}/>}
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={pf + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <button onClick={likeHandler} className="likeButton">
              {isLiked ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            </button>
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
