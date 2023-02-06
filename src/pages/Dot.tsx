import { Button, Divider, Grid, FormHelperText, Container, TextField, FormControl, InputAdornment, MenuItem, } from "@mui/material";
import dotStore from "../state/dot-state";

function Dot() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address,

    // maxNetUsageWords, maxCpuUsageMs, delaySec, expiration, refBlockNum, refBlockPrefix, actions, errorActions, contextFreeActions, transactionExtensions, contextFreeData, 

    // signature,
    genMnemonic, handleChange, obtainAccount,
    // signTx, 
  } = dotStore()
  return (
    <div >
      <Container fixed>
        {/* <Divider>
          <h1>Dot Wallet Test Tool</h1>
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
                  endAdornment: <InputAdornment position="end" onClick={genMnemonic}>Gen</InputAdornment>,
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
                helperText="Default Path: //polkadot//0 "
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          <Grid item xs={6}>
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
        {/* <Divider><h3>Transaction-Sign</h3></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="chainId"
                label="ChainId"
                name="chainId"
                defaultValue={chainId}
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
                defaultValue={maxNetUsageWords}
                onChange={handleChange}
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
                defaultValue={maxCpuUsageMs}
                onChange={handleChange}
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
                defaultValue={delaySec}
                onChange={handleChange}
              />

            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="expiration"
                label="expiration"
                color="info"
                defaultValue={expiration}
                onChange={handleChange}
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
                defaultValue={refBlockNum}
                onChange={handleChange}
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
                defaultValue={refBlockPrefix}
                onChange={handleChange}
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
                defaultValue={JSON.stringify(actions)}
                onChange={handleChange}
              />
              <FormHelperText>{errorText}</FormHelperText>
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
                // defaultValue={signature}
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
        </FormControl> */}
      </Container>
    </div>
  );
}
export default Dot