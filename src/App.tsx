import React from "react";
import { useState } from "react";
import { AptosAccount } from "aptos";
import "./App.css";
import { Mytextarea } from "./components/Mytextarea";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [path, setPath] = useState("m/44'/637'/0'/0'/0'");
  const [ed25519PubKey, setEd25519PubKey] = useState("");
  const [ed25519PriKey, setEd25519PriKey] = useState("");
  const [aptosAddress, setAptosAddress] = useState("");
  const [errorTip, setErrorTip] = useState("");
  const handleMessageChange_mnemonic = (event: any) => {
    // 👇️ update textarea value
    setMnemonic(event.target.value);
    try {
      calcAddress(path, event.target.value);
      setErrorTip("");
    } catch {
      setErrorTip("Ivalid mnemnoic.");
    }
  };

  const handleMessageChange_path = (event: any) => {
    setPath(event.target.value);
    try {
      calcAddress(event.target.value, mnemonic);
      setErrorTip("");
    } catch {
      setErrorTip("Ivalid Path.");
    }
  };

  function calcAddress(path: string, mnemonics: string) {
    const account = AptosAccount.fromDerivePath(path, mnemonics);
    setEd25519PubKey(account.toPrivateKeyObject().publicKeyHex!);
    setEd25519PriKey(account.toPrivateKeyObject().privateKeyHex);
    setAptosAddress(account.toPrivateKeyObject().address!);
  }
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <h1>Aptos Wallet Test Tool</h1>
          <p>
            gauge hole clog property soccer idea cycle stadium utility slice
            hold chief
          </p>
          <h3>Aptos Mnemonic-Key-Derivation-Address test </h3>
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>BIP39 Mnemonic:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="message"
            name="message"
            value={mnemonic}
            onChange={handleMessageChange_mnemonic}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>SLIP-0010 Path:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="path"
            value={path}
            onChange={handleMessageChange_path}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>ED25519 PrivateKey:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="ed25519Privatekey" value={ed25519PriKey} />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>ED25519 PublicKey:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="ed25519Pubkey" value={ed25519PubKey} />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>Aptos Address:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="address" value={aptosAddress} />
        </Grid>
        <Grid xs={12}>
          <p style={{ color: "red" }}>{errorTip}</p>
        </Grid>
        <Grid xs={12}>
          <h3>Aptos TransferTransaction-Sign test </h3>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
export default App;
