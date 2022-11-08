import React from "react";
import { useState } from "react";
import {
  AptosAccount,
  AptosClient,
  CoinClient,
  HexString,
  BCS,
  TxnBuilderTypes,
  TransactionBuilder,
} from "aptos";
import "./App.css";
import { Mytextarea } from "./components/Mytextarea";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function App() {
  //address
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
  //transfer transaction
  const [sender, setSender] = useState(
    "0x29cf83251eba17b6043f469e60b426c945f6a6c26fba02874961ceedd62ad6c9"
  );
  const [sequenceNumber, setSequenceNumber] = useState(0);
  const [maxGasAmount, setMaxGasAmount] = useState(100000);
  const [gasUnitPrice,setGasUnitPrice] = useState(5000);
  const [expTimeStamp,setExpTimeStamp] = useState(Math.floor(Date.now() / 1000) + 20);
  const [chainID,setChainID] = useState(1);
  const [typeTag, setTypeTag] = useState("0x1::coin::transfer");
  const [coinType,setCoinType] = useState("0x1::aptos_coin::AptosCoin")
  const [signingMessage,setSigningMessage] = useState("");
  const [signingMessageWithoutPrefix,setSigningMessageWithouPrefix] = useState("");
  const [signature,setSignature] = useState("");
  const [to, setTo] = useState(
    "0x3a7b36b20e29eeed9d8ee36573c3cda92c71587a6561a0ab6facb6fcf9f2cb60"
  );
  const [amount,setAmount] = useState(10086123);
  const [payload,setPayload] = useState("");
  const handleMessageChange_sender = (event: any) => {
    setSender(event.target.value);
  };
  const handleMessageChange_snumber = (event: any) => {
    setSequenceNumber(event.target.value);
  };
  const handleMessageChange_maxgas = (event: any) => {
    setMaxGasAmount(event.target.value);
  };
  const handleMessageChange_gasprice = (event:any) => {
    setGasUnitPrice(event.target.value);
  }
  const handleMessageChange_exptime = (event:any)=>{
    setExpTimeStamp(event.target.value);
  }
  const handleMessageChange_chainID = (event:any) =>{
    setChainID(event.target.value);
  }
  const handleMessageChange_typetag = (event:any) =>{
    setTypeTag(event.target.value);
  }
  const handleMessageChange_cointype = (event:any) =>{
    setCoinType(event.target.value);
  }
  const handleMessageChange_signing = (event: any) => {
    setSigningMessage(event.target.value);
  };
  const handleMessageChange_signing_without_prefix = (event:any) =>{
    setSigningMessageWithouPrefix(event.target.value);
  }
  const handleMessageChange_signature = (event:any) =>{
    setSignature(event.target.value);
  }
  const handleMessageChange_to = (event: any) => {
    setTo(event.target.value);
  };
  const handleMessageChange_amount = (event:any) =>{
    setAmount(event.target.value);
  }
  const handleMessageChange_payload = (event:any) =>{
    setPayload(event.target.value);
  }
  function signTx(){
    const node_url = "https://fullnode.devnet.aptoslabs.com";
    const client = new AptosClient(node_url);
    const coinClient = new CoinClient(client); 
    const from = AptosAccount.fromDerivePath(path,mnemonic);
    const payload = coinClient.transactionBuilder.buildTransactionPayload(
      typeTag,
      [coinType],
      [new HexString(to), amount]
    );
    setPayload(HexString.fromUint8Array(BCS.bcsToBytes(payload)).hex());

    const rawTx = new TxnBuilderTypes.RawTransaction(
      TxnBuilderTypes.AccountAddress.fromHex(from.address()),
      BigInt(sequenceNumber),
      payload,
      BigInt(maxGasAmount),
      BigInt(gasUnitPrice),
      BigInt(expTimeStamp),
      new TxnBuilderTypes.ChainId(Number(chainID))
    );
    setSigningMessageWithouPrefix(
      HexString.fromUint8Array(BCS.bcsToBytes(rawTx)).hex()
    );
    setSigningMessage(
      HexString.fromUint8Array(
        TransactionBuilder.getSigningMessage(rawTx)
      ).hex()
    );
    setSignature(from.signBuffer(TransactionBuilder.getSigningMessage(rawTx)).hex());
  }
  function signMesage() {
    const from = AptosAccount.fromDerivePath(path, mnemonic);
    setSignature(from.signHexString(signingMessage).hex());
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
          <Mytextarea id="ed25519Privatekey" readOnly value={ed25519PriKey} />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>ED25519 PublicKey:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="ed25519Pubkey" readOnly value={ed25519PubKey} />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>Aptos Address:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="address" readOnly value={aptosAddress} />
        </Grid>
        <Grid xs={12}>
          <p style={{ color: "red" }}>{errorTip}</p>
          <h3>Aptos TransferTransaction-Sign test </h3>
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>sender address:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="sender"
            value={sender}
            onChange={handleMessageChange_sender}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>sequence number(Uint64):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="sequenceNumber"
            value={sequenceNumber}
            onChange={handleMessageChange_snumber}
            onlyNumber={true}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>max gas amount(Uint64):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="maxGasAmount"
            value={maxGasAmount}
            onChange={handleMessageChange_maxgas}
            onlyNumber={true}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>gas unit price(Uint64):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="gasUnitPrice"
            value={gasUnitPrice}
            onChange={handleMessageChange_gasprice}
            onlyNumber={true}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>expiration timestamp secs(Uint64):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="expTimeStamp"
            value={expTimeStamp}
            onChange={handleMessageChange_exptime}
            onlyNumber={true}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>chainID(Uint16):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="chainID"
            value={chainID}
            onChange={handleMessageChange_chainID}
            onlyNumber={true}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>type tag:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="typetag"
            value={typeTag}
            onChange={handleMessageChange_typetag}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>coin type:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="cointype"
            value={coinType}
            onChange={handleMessageChange_cointype}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>to:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea id="to" value={to} onChange={handleMessageChange_to} />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>amount:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="amount"
            value={amount}
            onChange={handleMessageChange_amount}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>payload:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="payload"
            value={payload}
            rows={5}
            onChange={handleMessageChange_payload}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>signing message:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="signing"
            value={signingMessage}
            rows={5}
            readOnly
            onChange={handleMessageChange_signing}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>signing message(without prefix):</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="signing2"
            value={signingMessageWithoutPrefix}
            rows={5}
            readOnly
            onChange={handleMessageChange_signing_without_prefix}
          />
        </Grid>
        <Grid xs={4} textAlign="right">
          <label>signature:</label>
        </Grid>
        <Grid xs={8}>
          <Mytextarea
            id="signature"
            value={signature}
            rows={5}
            readOnly
            onChange={handleMessageChange_signature}
          />
        </Grid>
        <Grid xs={8}>
          <button onClick={signTx}>sign transation</button>
        </Grid>
        <Grid xs={4}>
          <button onClick={signMesage}>sign message</button>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
export default App;