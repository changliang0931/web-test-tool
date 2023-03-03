
import * as React from 'react';
import { Box, Grid, CardContent, Typography, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@mui/material';
import WalletIcon from '@mui/icons-material/Wallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import { generateMnemonic, validateMnemonic } from "wallet-web-lib";
import storage from '../state/storage';
export default function BasicCard() {
  const [open, setOpen] = React.useState(false);
  const [mn, setMn] = React.useState("");
  const [errmsg, setErrMsg] = React.useState("");
  const [err, setErr] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setMn("")
    setErr(false)
    setErrMsg("")
    setOpen(false)
  };
  const handleChange = (event: any) => {
    setMn(event.target.value)
  }
  const genMnemonic = () => {
    storage.set("LOCAL_TEST_MNEMONIC", generateMnemonic())
    window.location.reload()
  }
  const importMnemonic = () => {
    if (!mn.trim()) {
      setErr(true)
      setErrMsg("Can not be empty.")
      return;
    }
    if (!validateMnemonic(mn)) {
      setErr(true)
      setErrMsg("Invalid mnemonic.")
      return;
    }
    storage.set("LOCAL_TEST_MNEMONIC", mn)
    setMn("")
    window.location.reload()
  }
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      justifyContent="space-evenly">
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          paddingTop: 2,
          borderRadius: 5
        }}
      >
        <WalletIcon color="secondary" sx={{
          ml: 14, width: 60,
          height: 60,
        }} />
        <CardContent>
          <Typography variant="h5" component="div">
            Import Mnemonic
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            If you already have a mnemonic code,
            you can directly import it.
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', mr: 2 }}>
          <Button variant="contained" size="large" color='success' onClick={handleClickOpen} sx={{ width: 170 }}>
            Import
          </Button>
        </CardActions>
      </Box>
      <Box
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
          paddingTop: 2,
          borderRadius: 5
        }}
      >
        <AddCardIcon color="secondary" sx={{
          ml: 14, width: 60,
          height: 60,
        }} />
        <CardContent>
          <Typography variant="h5" component="div">
            Gen Mnemonic
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Help you randomly generate <br />12-digit mnemonic code.<br />
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', mr: 2 }}>
          <Button variant="contained" size="large" color='success' onClick={genMnemonic} sx={{ width: 170, marginRight: 1 }}>
            Gen
          </Button>
        </CardActions>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Import Mnemonic</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Please Enter Mnemonic Code
          </DialogContentText>
          <TextField
            error={err}
            autoFocus
            fullWidth variant="standard"
            id="localMnemonic"
            label="Mnemonic"
            type="text"
            value={mn}
            placeholder="Mnemonic are for testing use only !!"
            helperText={errmsg}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='error' onClick={importMnemonic}>Confirm</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>


  );
}