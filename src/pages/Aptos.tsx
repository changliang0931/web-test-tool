import { Button, Divider, Grid, FormHelperText, Container, TextField, FormControl, InputAdornment, MenuItem, } from "@mui/material";
import myStore from "../state/aptos-state";

function Aptos() {
  const { mnemonic, errorMnemonic, errorText, path, publicKey, privateKey, address, errorTo, to, chainId, modules, func, module, typeTag, typeTags, funcs, amount, genMnemonic, handleChange, obtainAccount, signTx, signMessage, parseTx, expTimeStamp, message, signature, gasUnitPrice,
    maxGasAmount, sequenceNumber, payload, txRaw
  } = myStore()
  return (
    <div >
      <Container fixed>
        {/* <Divider>
          <h1>Aptos Wallet Test Tool</h1>
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
                helperText="Default Path: m/44'/637'/0'/0'/0'"
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
                select
                id="typeTag"
                label="TypeTag"
                name="typeTag"
                defaultValue={typeTag}
                helperText=" Tip : 0x1::aptos_coin::AptosCoin"
                onChange={handleChange}
              >
                {typeTags.map((option: any) => (
                  <MenuItem id={option}  key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="module"
                label="Module"
                name="module"
                defaultValue={module}
                helperText=" Tip : 0x1::aptos_account"
                onChange={handleChange}
              >
                {modules.map((option: any) => (
                  <MenuItem id={option} key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                select
                id="func"
                label="Func"
                name="func"
                defaultValue={func}
                helperText=" Tip : transfer"
                onChange={handleChange}
              >
                {funcs.map((option: any) => (
                  <MenuItem id={option} key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
                helperText="ChainId  1:mainnet ;  2:testnet; 38:devnet"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="gasUnitPrice"
                label="GasUnitPrice"
                color="info"
                type="number"
                inputProps={{
                  min: 1,
                }}
                defaultValue={gasUnitPrice}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="amount"
                label="Amount"
                color="info"
                type="number"
                inputProps={{
                  min: 1,
                }}
                defaultValue={amount}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="maxGasAmount"
                label="MaxGasAmount"
                color="info"
                sx={{ width: 1 }}
                type="number"
                inputProps={{
                  min: 21000
                }}
                defaultValue={maxGasAmount}
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Gas</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="sequenceNumber"
                label="SequenceNumber"
                color="info"
                type="number"
                inputProps={{
                  min: 1,
                }}
                defaultValue={sequenceNumber}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <TextField
                id="expTimeStamp"
                label="ExpTimeStamp"
                color="info"
                type="number"
                inputProps={{
                  min: 1,
                }}
                defaultValue={expTimeStamp}
                onChange={handleChange}
              />
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
                defaultValue={payload}
                InputProps={{
                  readOnly: true,
                }}
              />
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
                rows={2}
                defaultValue={txRaw}
                InputProps={{
                  readOnly: true,
                  endAdornment: <InputAdornment position="end" onClick={parseTx} >x</InputAdornment>,
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
          <Button id="signMessage" onClick={signMessage} variant="contained" color="secondary" disabled={address.trim() == ""} >sign message</Button>
        </FormControl>

      </Container>
    </div>
  );
}
export default Aptos