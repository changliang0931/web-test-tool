import { Tooltip, Button, Divider, InputAdornment, Grid, MenuItem, Container, TextField, FormControl, IconButton, FormHelperText } from "@mui/material";
import cryptoStore from "../state/crypto-state";
import ClearIcon from "@mui/icons-material/Clear";
function Crypto() {
  const { cryptoTypes, cryptoType, privateKey, auxRand, signature, message,
    errorMnemonic, mnemonic, errorText, path, publicKey, obtainAccount,
    signMessage, handleChange, handleClear, random, setMessage
  } = cryptoStore()

  return (
    <div >
      <Container fixed>
        <Divider><h3>Bip32-Mnemonic-Path-Derivation-Address</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorMnemonic} variant="standard">
              <TextField
                id="mnemonic"
                label="Mnemonic"
                color="success"
                placeholder="gauge hole clog property soccer idea cycle stadium utility slice hold chief"
                sx={{ width: 1 }}
                multiline
                rows={2}
                value={mnemonic}
                error={errorMnemonic}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="mnemonicc" sx={{ visibility: mnemonic ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="path"
                label="Path"
                color="success"
                sx={{ width: 1 }}
                value={path}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="pathc" sx={{ visibility: path ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="publicKey"
                label="PublicKey"
                color="success"
                sx={{ width: 1 }}
                InputProps={{
                  value: publicKey,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="privateKey"
                label="PrivateKey"
                color="success"
                sx={{ width: 1 }}
                InputProps={{
                  value: privateKey,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Button id="obtainAccount" onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() !== "" && path.trim() !== "")} >Get Account</Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider><h3>Message-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="cryptoType"
                label="cryptoType"
                name="cryptoType"
                color="info"
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
          <Grid item xs={12} display={cryptoType === 'Schnorr' ? 'block' : 'none'}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="auxRand"
                label="AuxRand"
                color="info"
                sx={{ width: 1 }}
                value={auxRand}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="auxRandc" sx={{ visibility: auxRand ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
                onChange={handleChange}
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
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={message}
                InputProps={{
                  startAdornment: <InputAdornment id="random" position="start" onClick={() => { setMessage(random(32)) }} ><h3 style={{ color: 'green' }}>Random</h3></InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="messagec" sx={{ visibility: message ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="signature"
                label="Signature"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={3}
                value={signature}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signMessage" onClick={signMessage} variant="contained" color="info" disabled={privateKey.trim() === "" || privateKey.trim().length < 64 || message.trim() === "" || message.trim().length < 64} >sign message</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Crypto