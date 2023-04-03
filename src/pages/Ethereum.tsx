
import Divider from "@mui/material/Divider";
import { Button, Tooltip,  Grid, FormHelperText, Container, TextField, FormControl, InputAdornment, MenuItem } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import myStore from "../state/ethereum-state"
import storage from '../state/storage';
function Ethereum() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address,
    to, nonce, data, value, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas,
    type, chainId, txRaw, errorTo, errorData, transactionTypes, display1559, message, messageHash, signature, errorTypedData, typedData, signatureTypedData,
    signMessage, handleChange, handleClear,obtainAccount, signTx, parseTx, signTypedData } = myStore()
  if (storage.get(storage.keys.LOCAL_TEST_MNEMONIC)) {
    //    obtainAccount();
  }
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
                helperText="Default Path: m/44'/60'/0'/0/0"
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
              <Button id="obtainAccount" onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() != "" && path.trim() != "")} >Get Account</Button>
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
                value={to}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="toc" sx={{ visibility: to ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
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
                value={chainId}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="chainIdc" sx={{ visibility: chainId ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
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
                value={type}
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
                value={value}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Wei</InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="valuec" sx={{ visibility: value ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                value={nonce}
                onChange={handleChange}
                
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="noncec" sx={{ visibility: "visible" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
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
                value={gasPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Wei/Gas</InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="gasPricec" sx={{ visibility: gasPrice ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                value={gasLimit}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Gas</InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="gasLimitc" sx={{ visibility: gasLimit ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                value={maxPriorityFeePerGas}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Wei</InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="maxPriorityFeePerGasc" sx={{ visibility: maxPriorityFeePerGas ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                value={maxFeePerGas}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Wei</InputAdornment>,
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="maxFeePerGasc" sx={{ visibility: maxFeePerGas ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                value={data}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="datac" sx={{ visibility: data ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
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
                value={txRaw}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start" onClick={parseTx} ><PsychologyAltOutlinedIcon fontSize="large" color="success"></PsychologyAltOutlinedIcon></InputAdornment>,
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
                value={message}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="messagec" sx={{ visibility: message ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="messageHash"
                label="MessageHash"
                color="secondary"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={messageHash}
                InputProps={{
                  readOnly: true,
                }}
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
                value={signature}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signMessage" onClick={signMessage} variant="contained" color="secondary" disabled={address.trim() == ""} >sign message</Button>
        </FormControl>

        <Divider><h3>Typed-Data-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorTypedData} variant="standard">
              <TextField
                id="typedData"
                label="TypedData"
                color="warning"
                sx={{ width: 1 }}
                multiline
                rows={3}
                error={errorTypedData}
                value={typedData}
                onChange={handleChange} 
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="typedDatac" sx={{ visibility: typedData ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="messageHash"
                label="MessageHash"
                color="warning"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={messageHash}
                InputProps={{
                  readOnly: true,
                }}
                onChange={handleChange}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" >
              <TextField
                id="signatureTypedData"
                label="SignatureTypedData"
                color="warning"
                sx={{ width: 1 }}
                multiline
                rows={3}
                value={signatureTypedData}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signTypedData" onClick={signTypedData} variant="contained" color="warning" disabled={address.trim() == ""} >sign type data</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Ethereum;