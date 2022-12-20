import Divider from "@mui/material/Divider";
import { Button, Grid, FormHelperText, Container, TextField, FormControl, InputAdornment, MenuItem } from "@mui/material";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import myStore from "../state/ethereum-state"
function Ethereum() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address,
    to, nonce, data, value, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas,
    type, chainId, txRaw, errorTo, errorData, transactionTypes, display1559, message, signature,
    signMessage, genMnemonic, handleChange, obtainAccount, signTx, parseTx } = myStore()
  return (
    <div >
      <Container fixed>
        {/* <Divider>
          <h1>Ethereum Wallet Test Tool</h1>
        </Divider>>
          <h1>Ethereum Wallet Test Tool</h1>
        </Divider> */}
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
                defaultValue={mnemonic}
                error={errorMnemonic}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end" onClick={genMnemonic} >Gen</InputAdornment>,
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
                defaultValue={path}
                onChange={handleChange}
                helperText="Default Path: m/44'/60'/0'/0/0"
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
                // value={address}
                InputProps={{
                  value: address,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <Button  id="obtainAccount"  onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() != "" && path.trim() != "")} >Get Account</Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider><h3>Transaction-Sign</h3></Divider>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="from"
                label="From"
                color="info"
                sx={{ width: 1 }}
                InputProps={{
                  value: address,
                  readOnly: true,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorTo} variant="standard">
              <TextField
                id="to"
                label="To"
                color="info"
                error={errorTo}
                sx={{ width: 1 }}
                defaultValue={to}
                onChange={handleChange}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="chainId"
                label="ChainId"
                color="info"
                type="number"
                inputProps={{
                  min: 1,
                }}
                defaultValue={chainId}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="type"
                label="Type"
                type="number"
                name="type"
                inputProps={{
                  min: 0,
                  max: 2
                }}
                defaultValue={type}
                helperText=" Tip : 0: legacy; 1:eip2930 ; 2:eip1559"
                onChange={handleChange}
              >
                {transactionTypes.map((option: any) => (
                  <MenuItem id={option.value} key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={6} >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="value"
                label="Value"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                defaultValue={value}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Wei</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
                defaultValue={nonce}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasPrice"
                label="GasPrice"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                defaultValue={gasPrice}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Wei/Gas</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasLimit"
                label="GasLimit"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 21000
                }}
                defaultValue={gasLimit}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Gas</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} display={display1559}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="maxPriorityFeePerGas"
                label="MaxPriorityFeePerGas"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                defaultValue={maxPriorityFeePerGas}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Wei</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} display={display1559} >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="maxFeePerGas"
                label="maxFeePerGas"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 1
                }}
                defaultValue={maxFeePerGas}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Wei</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorData} variant="standard">
              <TextField
                id="data"
                label="Data"
                color="info"
                error={errorData}
                sx={{ width: 1 }}
                multiline
                rows={3}
                defaultValue={data}
                onChange={handleChange}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="txRaw"
                label="TxRaw"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={3}
                defaultValue={txRaw}
                InputProps={{
                  readOnly: true,
                  endAdornment: <InputAdornment position="end" onClick={parseTx} ><PsychologyAltOutlinedIcon fontSize="large" color="success"></PsychologyAltOutlinedIcon></InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signTx" onClick={signTx} variant="contained" color="info" disabled={address.trim() == ""} >sign transation</Button>
        </FormControl>
        <Divider><h3>Message-Sign</h3></Divider>
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
                defaultValue={message}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
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
          <Button id="signMessage"  onClick={signMessage} variant="contained" color="secondary" disabled={address.trim() == ""} >sign message</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Ethereum;