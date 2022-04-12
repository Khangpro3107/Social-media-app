import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AddRounded, RemoveRounded } from "@material-ui/icons";
import {Follow, Unfollow} from "../../context/AuthActions"

export default function Rightbar({ user }) {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser.followings, user?._id]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + user._id);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [user?._id]);

  const handleFollow = async () => {
    const temp = followed
    setFollowed(!followed)
    try {
      if (temp) {
        await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id});
        dispatch(Unfollow(user._id))
      } else {
        await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id});
        dispatch(Follow(user._id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={pf + "gift.png"} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={pf + "ad.png"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? (
              <>
                Unfollow <RemoveRounded />
              </>
            ) : (
              <>
                Follow <AddRounded />
              </>
            )}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        {friends.map((friend) => (
          <Link
            to={`/profile/${friend.username}`}
            style={{ textDecoration: "none" }}
            key={friend._id}
          >
            <div className="rightbarFollowings">
              <div className="rightbarFollowing">
                <img
                  src={pf + friend.profilePicture}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
