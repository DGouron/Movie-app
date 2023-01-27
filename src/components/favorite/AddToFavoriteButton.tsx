import * as React from "react";
import Icon from "@mui/material/Icon";
import { Box, Tooltip } from "@mui/material";
import { MoviePicker } from "../../MoviePicker/MoviePicker";
import { setNeedToUpdateFavorites } from "../../data/slices/coreSlice";

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
  const handleClick = async () => {
    await dispatch(setNeedToUpdateFavorites(false));
    await moviePicker.pick(movieTitle);
    dispatch(setNeedToUpdateFavorites(true));
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
    </Box>
  );
}
