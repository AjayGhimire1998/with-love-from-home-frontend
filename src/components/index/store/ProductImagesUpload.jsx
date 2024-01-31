import React from "react";
import { useEffect } from "react";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import S3FileUpload from "react-s3";
import { v4 as uuidv4 } from "uuid";
import {
  pushToProductImages,
  getEachImage,
} from "../../../features/dashboard/productSlice";
// import Loader from "../../static_pages/Loader";
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
    checkLoader(2000);
    await S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        // console.log(data.location);
        dispatch(getEachImage(data.location));
      })
      .catch((error) => console.log(error));

  };
  // console.log(productImages);
  useEffect(() => {
    dispatch(pushToProductImages(eachImage));
  }, [eachImage, dispatch]);

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
          disabled={productImages.length === 4}
          id="embedpollfileinput"
          style={{ display: "none" }}
          onChange={(event) => {
            uploadToS3(event);
          }}
        />

        <label htmlFor="embedpollfileinput" className="ui medium button">
          <i className="ui upload icon"></i>
          Choose image
        </label>
        <br />
        <br />
        {/* {eachImage !== "" ? ( */}
        <div className="ui horizontal segments">
          {productImages.slice(1).map((image) => {
            return (
              <div className="ui segment" key={uuidv4()}>
                <img
                  className="image-preview"
                  alt="logo"
                  src={`${image}`}
                  style={{ height: "150px", width: "160px" }}
                />
              </div>
            );
          })}
        </div>
        {/* ) : (
          <Loader />
        )} */}
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
