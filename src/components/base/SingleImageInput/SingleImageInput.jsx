import React from "react";
import Button from "../Button/Button";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./single-image-input.module.css";

function SingleImageInput({ images, setImages, disableLabel, ...props }) {
  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onError = (error) => {
    if (error.acceptType) {
      toast.error(
        "The file format is not supported. Only files with the following extensions are allowed: jpg, png.",
        {
          autoClose: 1500,
        }
      );
    }
    if (error.maxFileSize) {
      toast.error(
        "The file is too large and cannot be uploaded. The maximum file size per image is 10MB.",
        {
          autoClose: 1500,
        }
      );
    }
  };

  return (
    <>
      <ImageUploading
        value={images}
        maxFileSize={10485760}
        onChange={onChange}
        onError={onError}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({ imageList, onImageUpload }) => (
          <div className={`${styles["wrapper"]}`}>
            {images.length === 0 ? (
              <div
                className={`${styles["input"]}`}
                style={props}
                onClick={onImageUpload}
              >
                <div>
                  <img
                    style={{
                      maxWidth: "100px",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    src="https://firebasestorage.googleapis.com/v0/b/splitshare-67496.appspot.com/o/profile-image%2Fdefault-profile-image.png?alt=media&token=06c17f92-5d5c-47d6-a0a7-fb93b1782cba"
                    alt="default"
                  />
                </div>
              </div>
            ) : (
              <div className={`${styles["input"]}`}>
                {imageList.map((image, index) => (
                  <img
                    key={index}
                    className={`${styles["image"]}`}
                    src={image.data_url}
                    onClick={onImageUpload}
                    alt={`${image}-${index}`}
                  />
                ))}
              </div>
            )}
            {!disableLabel && (
              <Button
                onClick={onImageUpload}
                variant="primary"
                size="md"
                label="Upload Photo"
              ></Button>
            )}
          </div>
        )}
      </ImageUploading>
    </>
  );
}

export default React.memo(SingleImageInput);
