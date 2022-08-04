import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoChanger } from "../../../features/auth/storeSlice";
import S3FileUpload from "react-s3";
// import dotenv from  'dotenv'
window.Buffer = window.Buffer || require("buffer").Buffer;

function StoreLogo() {
  const dispatch = useDispatch();

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const showLogoPreview = (event) => {
    const src = URL.createObjectURL(event.target.files[0]);
    const coverPreview = document.querySelector(".image-preview");
    coverPreview.src = src;
    coverPreview.style.display = "block";
  };

  const uploadToS3 = (e) => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        dispatch(logoChanger(data.location));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ui middle aligned center aligned grid ">
      <div className="ui fluid segment">
        <label style={{ textAlign: "left", fontWeight: "bolder" }}>
          Store Logo
        </label>
        <br />
        <br />
        <input
          type="file"
          className="inputfile"
          name="image"
          accept="image/*"
          multiple={false}
          id="embedpollfileinput"
          style={{ display: "none" }}
          onChange={(event) => {
            showLogoPreview(event);
            uploadToS3(event);
          }}
        />

        <label
          htmlFor="embedpollfileinput"
          className="ui medium right floated button"
        >
          <i className="ui upload icon"></i>
          Choose image
        </label>
        <br />
        <br />
        <div>
          <img
            className="image-preview"
            alt="logo"
            style={{ display: "none", height: "120px", width: "150px" }}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default StoreLogo;
