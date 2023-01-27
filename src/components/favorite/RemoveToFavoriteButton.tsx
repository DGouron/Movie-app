import * as React from "react";
import Icon from "@mui/material/Icon";
import { Box, Button, Collapse, Tooltip } from "@mui/material";
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
export default function RemoveToFavoritesButton({
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
      .remove(movieTitle)
      .then(() => {
        setAlertMessage("Movie removed from the list");
        setOpenSuccessAlert(true);
      })
      .catch((error: any) => {
        setAlertMessage(error);
        setOpenErrorAlert(true);
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
      <Tooltip title="Remove of the list" placement="top">
        <Box sx={{ width: "100%" }}>
          <Button onClick={handleClick}>Remove it ?</Button>
          <Collapse in={openErrorAlert}>
            <ErrorAlert
              message={alertMessage}
              closeFunction={closeErrorAlert}
            />
          </Collapse>
          <Collapse in={openSuccessAlert}>
            <SuccessAlert
              message={alertMessage}
              closeFunction={closeSuccessAlert}
            />
          </Collapse>
        </Box>
      </Tooltip>
    </Box>
  );
}
