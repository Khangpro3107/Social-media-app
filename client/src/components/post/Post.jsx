import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js"

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
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
      console.log(post, currentUser);
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
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
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={pf + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={pf + "like.png"}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={pf + "heart.png"}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">
              {like} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
