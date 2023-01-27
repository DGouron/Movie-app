export const favoriteCardStyle = {
  display: "flex",
  flex: "0 1 14%",
  height: "60px",
  minWidth: "200px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  bgcolor: "#3f51b5",
  color: "white",
  textShadow: "1px 1px 1px #000000",
  "&:hover": {
    boxShadow: "0 5px 15px 0 #000000",
  },
};

export const regularCardStyle = {
  display: "flex",
  flex: "0 1 20%",
  maxHeight: "250px",
  maxWidth: "200px",
  minWidth: "200px",
  minHeight: "250px",
  textShadow: "1px 1px 1px #000000",
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

export const modalBlockStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 2,
};

export const movieListGridStyle = {
  boxShadow: 1,
  justifyContent: "center",
  gap: 3,
  p: 3,
  alignItems: "flex-start",
  wrap: "wrap",
};
export const mainTitleStyle = {
  fontSize: "1.1rem",
  letterSpacing: "0.2rem",
};
