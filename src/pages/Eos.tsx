import { Tooltip, Button, Divider, Grid, MenuItem, Container, TextField, FormControl,FormHelperText ,IconButton} from "@mui/material";
import eosStore from "../state/eos-state";
import ClearIcon from "@mui/icons-material/Clear";
function Eos() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address, chainIds, chainId, maxNetUsageWords, maxCpuUsageMs, delaySec, expiration, refBlockNum, refBlockPrefix, actions, errorActions, contextFreeActions, transactionExtensions, contextFreeData, handleChange, obtainAccount, signTx,handleClear, signature,
  } = eosStore()
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
                helperText="Default Path: m/44'/194'/0'/0/0"
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
              <Button id="obtainAccount" onClick={obtainAccount} variant="contained" color="success" disabled={!(mnemonic.trim() != "" && path.trim() != "")}  >Get Account</Button>
            </FormControl>
          </Grid>
        </Grid>
        <Divider><h3>Transaction-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="chainId"
                label="ChainId"
                name="chainId"
                value={chainId}
                helperText=" Tip : Mainnet: aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
                onChange={handleChange}
              >
                {chainIds.map((option: any) => (
                  <MenuItem id={option} key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="maxNetUsageWords"
                label="MaxNetUsageWords"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                value={maxNetUsageWords}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="maxNetUsageWordsc" sx={{ visibility: maxNetUsageWords ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="maxCpuUsageMs"
                label="MaxCpuUsageMs"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                value={maxCpuUsageMs}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="maxCpuUsageMsc" sx={{ visibility: maxCpuUsageMs ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="delaySec"
                label="DelaySec"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 0
                }}
                value={delaySec}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="delaySecc" sx={{ visibility: delaySec ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
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
                id="refBlockNum"
                label="RefBlockNum"
                color="info"
                type="number"
                inputProps={{
                  min: 10000,
                  max: 99999
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
                id="refBlockPrefix"
                label="RefBlockPrefix"
                color="info"
                type="number"
                inputProps={{
                  min: 100000000,
                  max: 999999999
                }}
                value={refBlockPrefix}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="refBlockPrefixc" sx={{ visibility: refBlockPrefix ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} error={errorActions} variant="standard">
              <TextField
                id="actions"
                label="Actions"
                color="info"
                error={errorActions}
                sx={{ width: 1 }}
                multiline
                rows={3}
                value={actions}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <Tooltip title="Clear" placement="right-end"><IconButton id="actionsc" sx={{ visibility: actions ? "visible" : "hidden" }} onClick={handleClear}><ClearIcon /></IconButton></Tooltip>,
                }}
              />
              <FormHelperText>{errorText}</FormHelperText>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="contextFreeActions"
                label="ContextFreeActions"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={contextFreeActions}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="contextFreeData"
                label="ContextFreeData"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={contextFreeData}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="transactionExtensions"
                label="TransactionExtensions"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={1}
                value={transactionExtensions}
                onChange={handleChange}
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="signature"
                label="Signature"
                color="info"
                sx={{ width: 1 }}
                multiline
                rows={3}
                // value={signature}
                InputProps={{
                  value: signature,
                  readOnly: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Button id="signTx" onClick={signTx} variant="contained" color="info" disabled={publicKey.trim() == "" && !errorActions} >sign transation</Button>
        </FormControl>
      </Container>
    </div>
  );
}
export default Eos