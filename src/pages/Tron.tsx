import { Button, Divider, Tooltip, Grid, FormHelperText, Container, TextField, FormControl,  IconButton } from "@mui/material";
import tronStore from "../state/tron-state";
import ClearIcon from "@mui/icons-material/Clear";
function Tron() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address,
    refBlockBytes, refBlockNum, refBlockHash, expiration, timestamp, feeLimit, contracts, errorContracts, payload, signature,
    handleClear, handleChange, obtainAccount, signTx,
  } = tronStore()
  return (
    <div >
      <Container fixed>
        <Divider><h3>Mnemonic-Key-Derivation-Address</h3></Divider>
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
                  endAdornment: <Tooltip title="Clear" placement="right-end" onClick={handleClear} ><IconButton id="mnemonicc" sx={{ visibility: mnemonic ? "visible" : "hidden" }} ><ClearIcon /></IconButton></Tooltip>,
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
                helperText="Default Path: m/44'/195'/0'/0/0"
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
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="address"
                label="Address"
                color="success"
                sx={{ width: 1 }}
                InputProps={{
                  value: address,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Button id="obtainAccount" onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() !== "" && path.trim() !== "")}  >Get Account</Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider><h3>Transaction-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="refBlockHash"
                label="RefBlockHash"
                color="info"
                sx={{ width: 1 }}
                value={refBlockHash}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="refBlockHashc" sx={{ visibility: refBlockHash ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="refBlockBytes"
                label="RefBlockBytes"
                color="info"
                sx={{ width: 1 }}
                value={refBlockBytes}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="refBlockBytesc" sx={{ visibility: refBlockBytes ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="refBlockNum"
                label="RefBlockNum"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                value={refBlockNum}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="refBlockNumc" sx={{ visibility: refBlockNum ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="expiration"
                label="Expiration"
                color="info"
                value={expiration}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="expirationc" sx={{ visibility: expiration ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="timestamp"
                label="Timestamp"
                color="info"
                type="number"
                value={timestamp}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="timestampc" sx={{ visibility: timestamp ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="feeLimit"
                label="FeeLimit"
                color="info"
                type="number"
                inputProps={{
                  min: 0,
                  max: 999999999
                }}
                value={feeLimit}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="feeLimitc" sx={{ visibility: feeLimit ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorContracts} variant="standard">
              <TextField
                id="contracts"
                label="Contracts"
                color="info"
                error={errorContracts}
                sx={{ width: 1 }}
                multiline
                rows={3}
                value={contracts}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="contractsc" sx={{ visibility: contracts ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="payload"
                label="Payload"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={3}
                InputProps={{
                  value: payload,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="signature"
                label="Signature"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={3}
                InputProps={{
                  value: signature,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signTx" onClick={signTx} variant="contained" color="info" disabled={publicKey.trim() === "" && !errorContracts} >sign transation</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Tron