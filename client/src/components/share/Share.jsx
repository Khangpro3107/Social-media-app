import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(user._id, desc.current.value)
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    console.log(newPost)
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setFile(null);
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={pf + user.profilePicture}
            alt=""
          />
          <input
            placeholder={`What is in your mind, ${user.username}?`}
            className="shareInput"
            type="text"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img alt="" src={URL.createObjectURL(file)} className="shareImg" />
            <button
              onClick={() => {
                console.log("cancel", file);
                setFile(null);
              }}
              className="shareCancelButton"
            >
              <Cancel />
            </button>
          </div>
        )}
        <form className="shareBottom" onSubmit={(e) => handleClick(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                id="file"
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => {
                  console.log("change before", file);
                  setFile(e.target.files[0]);
                  console.log("change after", file);
                }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
