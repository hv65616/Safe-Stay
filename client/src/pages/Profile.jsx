import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart } from "../redux/user/userSlice";
import { updateUserSuccess } from "../redux/user/userSlice";
import { updateUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileref = useRef(null);
  const [file, setfile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handlefileupload(file);
    }
  }, [file]);
  const handlefileupload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageref = ref(storage, filename);
    const uploadtask = uploadBytesResumable(storageref, file);
    uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress);
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(res);
      // console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileref}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => {
            fileref.current.click();
          }}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        ></img>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handlechange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handlechange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}

export default Profile;
