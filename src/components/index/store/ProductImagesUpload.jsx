import React from "react";
import { useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import { v4 as uuid } from "uuid";
import {
  pushToProductImages,
  getEachImage,
} from "../../../features/dashboard/productSlice";
window.Buffer = window.Buffer || require("buffer").Buffer;

const ProductImagesUpload = ({ checkLoader }) => {
  const dispatch = useDispatch();
  const { eachImage, productImages } = useSelector((store) => store.product);

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  };

  const uploadToS3 = async (e) => {
    await S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data.location);
        dispatch(getEachImage(data.location));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    dispatch(pushToProductImages([...productImages, eachImage]));
    if (productImages.length === 3) {
      const choosefile = document.querySelector("#embedpollfileinput");
      choosefile.setAttribute("disabled", "");
      alert("Cannot choose more than 3 images");
    }
  }, [eachImage]);

  return (
    <div className="ui middle aligned center aligned grid flex">
      <div className="ui fluid segment">
        <label style={{ textAlign: "left", fontWeight: "bolder" }}>
          Product Images
        </label>
        <br />
        <br />
        <input
          type="file"
          className="inputfile"
          name="image"
          accept="image/*"
          multiple={true}
          id="embedpollfileinput"
          style={{ display: "none" }}
          onChange={(event) => {
            uploadToS3(event);
            checkLoader(2000);
          }}
        />

        <label htmlFor="embedpollfileinput" className="ui medium button">
          <i className="ui upload icon"></i>
          Choose image
        </label>
        <br />
        <br />
        <div className="ui horizontal segments">
          {productImages.slice(1).map((image) => {
            return (
              <div className="ui segment">
                <img
                  id={uuid()}
                  className="image-preview"
                  alt="logo"
                  src={`${image}`}
                  style={{ height: "150px", width: "160px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
export default ProductImagesUpload;
