import { Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./ddfStyle.css";

import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
import UploadIcon from "@mui/icons-material/Upload";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import IconButton from "@mui/material/IconButton";

import { storage, updateIlan } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function DragDropFile({ ilanId, imgURL }) {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [url, setUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [imageURL, setImageURL] = useState(imgURL);

  const inputRef = useRef(null);

  const getURL = () => {
    const urlRef = ref(storage, `image/${ilanId}`);
    getDownloadURL(urlRef).then((url) => {
      setDownloadUrl(url);
    });
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      //   handleFiles(e.dataTransfer.files);
      setImage(e.dataTransfer.files[0]);
    }
    console.log(e.dataTransfer.files);
    // if (e.target.files[0]) {
    //     setImage(e.target.files[0]);
    //   }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const cancelUpload = () => {
    setImage(null);
  };
  const handleUpload = async () => {
    const imageRef = ref(storage, `image/${ilanId}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            setUrl(url);
            setImageURL(url);
          })
          .catch((error) => {
            console.error(error.message, " error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const updateUrl = async (url) => {
    await updateIlan(ilanId, {
      imageURL,
    });
  };

  useEffect(() => {
    if (image != null) {
      setImageSize((image.size / 1048576).toFixed(2));
    }
    getURL();
    updateUrl(imageURL);
  }, [imageURL, image]);

  if (image != null) {
    return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          maxWidth: "100vw",
          py: 1,
          px: 1,
          borderRadius: 3,
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={URL.createObjectURL(image)}
            alt={image.name}
            sx={{ width: "100%", maxHeight: "300px" }}
          ></CardMedia>
        </Card>
        <Grid
          container
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageIcon />
          <Typography variant="body1">{image.name}</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{imageSize} MB</Typography>
          <IconButton onClick={cancelUpload}>
            <ClearIcon color="error" />
          </IconButton>
          <IconButton onClick={handleUpload}>
            <UploadIcon sx={{ color: "black" }} />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  if (downloadUrl != null) {
    return (
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          maxWidth: "100vw",
          py: 1,
          px: 1,
          borderRadius: 3,
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        }}
      >
        <Card elevation={0} sx={{ borderRadius: 2 }}>
          <CardMedia
            component="img"
            image={downloadUrl}
            sx={{ width: "100%", maxHeight: "300px" }}
          ></CardMedia>
        </Card>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Resmi Değiştir</Typography>
          <IconButton>
            <ChangeCircleIcon
              sx={{ color: "black" }}
              onClick={(e) => {
                setDownloadUrl(null);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  } else if (image === null) {
    return (
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Fotoğrafı Sürükleyip Bırakın</p>
            <button className="upload-button" onClick={onButtonClick}>
              Veya Alana Tıklayın
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
    );
  }
}

export default DragDropFile;
