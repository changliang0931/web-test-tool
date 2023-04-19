import { Button, Divider, Tooltip, Grid, FormHelperText, Container, TextField, FormControl, IconButton } from "@mui/material";
import myStore from "../state/fil-state";
import ClearIcon from "@mui/icons-material/Clear";
function Fil() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address,
    to, value, nonce, gasLimit, gasFeeCap, gasPremium, method, params,
    signature, handleClear, handleChange, obtainAccount, signTx
  } = myStore()
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
                helperText="Default Path: m/44'/461'/0'/0/0"
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
              <Button id="obtainAccount" onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() !== "" && path.trim() !== "")} >Get Account</Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider><h3>Transaction-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="account"
                label="Account"
                color="info"
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
              <TextField
                id="to"
                label="To"
                color="info"

                sx={{ width: 1 }}
                value={to}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="toc" sx={{ visibility: to ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="nonce"
                label="Nonce"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                value={nonce}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="noncec" sx={{ visibility: nonce ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="value"
                label="Value"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                value={value}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="valuec" sx={{ visibility: value ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="method"
                label="Method"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                value={method}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="methodc" sx={{ visibility: method ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasLimit"
                label="GasLimit"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                value={gasLimit}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="gasLimitc" sx={{ visibility: gasLimit ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasFeeCap"
                label="GasFeeCap"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                value={gasFeeCap}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="gasFeeCapc" sx={{ visibility: gasFeeCap ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasPremium"
                label="GasPremium"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                value={gasPremium}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="gasPremiumc" sx={{ visibility: gasPremium ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="params"
                label="Params"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={2}
                value={params}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end" onClick={handleClear} ><IconButton id="paramsc" sx={{ visibility: params ? "visible" : "hidden" }} ><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              {/* <FormHelperText sx={{ wordWrap: "break-word" }} id="demoTx"><Typography variant="overline" display="block" color='black'  >Demo Transaction</Typography>{jsonTransaction}</FormHelperText> */}
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
                rows={2}
                InputProps={{
                  value: signature,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signTx" onClick={signTx} variant="contained" color="info" disabled={address.trim() === ""} >sign transation</Button>
        </FormControl>

      </Container>
    </div>
  );
}
export default Fil