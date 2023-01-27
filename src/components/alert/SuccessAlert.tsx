import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SuccessAlert({
  message,
  closeFunction,
}: {
  message: string;
  closeFunction: () => void;
}) {
  return (
    <Alert
      severity="success"
      variant="filled"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            closeFunction();
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  );
}
