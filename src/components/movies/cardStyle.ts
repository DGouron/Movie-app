export const favoriteCardStyle = {
  display: "flex",
  flex: "0 1 14%",
  height: "60px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 0 10px 0 #000000",
  },
};

export const regularCardStyle = {
  display: "flex",
  flex: "0 1 20%",
  maxHeight: "250px",
  maxWidth: "200px",
  minWidth: "200px",
  minHeight: "250px",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 0 10px 0 #000000",
  },
};

export const regularCardMediaStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const titleStyle = { p: 1, flex: "1 1 100%", textOverflow: "ellipsis" };
