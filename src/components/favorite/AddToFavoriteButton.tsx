import * as React from "react";
import Icon from "@mui/material/Icon";
import { Box, Collapse, Tooltip } from "@mui/material";
import {
  MoviePickAlreadyExistError,
  MoviePicker,
} from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";
import { useState } from "react";
import ErrorAlert from "../alert/ErrorAlert";
import SuccessAlert from "../alert/SuccessAlert";

const iconStyle = {
  fontSize: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  rounded: "50%",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 0 10px 0 #000000",
  },
};
export default function AddToFavoritesButton({
  moviePicker,
  movieTitle,
  dispatch,
}: {
  moviePicker: MoviePicker;
  movieTitle: string;
  dispatch: any;
}) {
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const handleClick = async () => {
    await dispatch(setNeedToUpdateFavorites(false));
    await moviePicker
      .pick(movieTitle)
      .then(() => {
        setAlertMessage("This movie has been added to your list");
        setOpenSuccessAlert(true);
      })
      .catch((error) => {
        if (error instanceof MoviePickAlreadyExistError) {
          setAlertMessage("This movie is already in your list");
          setOpenErrorAlert(true);

          return;
        } else {
          setAlertMessage(
            "An error occured while adding this movie to your list"
          );
          setOpenErrorAlert(true);

          return;
        }
      });

    dispatch(setNeedToUpdateFavorites(true));
  };

  const closeErrorAlert = () => {
    setOpenErrorAlert(false);
  };
  const closeSuccessAlert = () => {
    setOpenSuccessAlert(false);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 2,
        },
      }}
    >
      <Tooltip title="Add to your list" placement="top">
        <Icon sx={iconStyle} color="action" onClick={handleClick}>
          add_circle
        </Icon>
      </Tooltip>
      <Box sx={{ width: "100%" }}>
        <Collapse in={openErrorAlert}>
          <ErrorAlert message={alertMessage} closeFunction={closeErrorAlert} />
        </Collapse>
        <Collapse in={openSuccessAlert}>
          <SuccessAlert
            message={alertMessage}
            closeFunction={closeSuccessAlert}
          />
        </Collapse>
      </Box>
    </Box>
  );
}
