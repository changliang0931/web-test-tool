import { Button, Divider, InputAdornment, Grid, MenuItem, Container, TextField, FormControl } from "@mui/material";
import cryptoStore from "../state/crypto-state";
function Crypto() {
  const { cryptoTypes, cryptoType, privateKey, signature, message, signMessage,
    handleChange, random
  } = cryptoStore()
  return (
    <div >
      <Container fixed>
        <Divider><h3>Message-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="cryptoType"
                label="cryptoType"
                name="cryptoType"
                value={cryptoType}
                onChange={handleChange}
              >
                {cryptoTypes.map((option: any) => (
                  <MenuItem id={option} key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="privateKey"
                label="PrivateKey"
                color="success"
                sx={{ width: 1 }}
                value={privateKey}
                onBlur={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="message"
                label="Message"
                color="secondary"
                sx={{ width: 1 }}
                multiline
                rows={3}
                value={message}
                InputProps={{
                  endAdornment: <InputAdornment id="randomBtn" position="end" onClick={random} ><h3 style={{ color: 'green' }}>Random</h3></InputAdornment>,
                }}
                onBlur={handleChange}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="messageHash"
                label="MessageHash"
                color="secondary"
                sx={{ width: 1 }}
                multiline
                rows={1}
                defaultValue={messageHash}
                InputProps={{
                  readOnly: true,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="signature"
                label="Signature"
                color="secondary"
                sx={{ width: 1 }}
                multiline
                rows={3}
                defaultValue={signature}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signMessage" onClick={signMessage} variant="contained" color="secondary" disabled={privateKey.trim() == "" || privateKey.trim().length < 64} >sign message</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Crypto