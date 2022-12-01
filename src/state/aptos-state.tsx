import create from "zustand";
import {
    AptosAccount, AptosClient, CoinClient, HexString, BCS, TxnBuilderTypes, TransactionBuilder,
} from "aptos";
import { generateMnemonic, validateMnemonic } from "bip39";
//https://aptos.dev/
interface EthereumState {
    typeTags: [string];
    coinTypes: [string];
    mnemonic: string;
    path: string;
    errorMnemonic: boolean;
    errorText: string;
    publicKey: string;
    privateKey: string;
    address: string;

    coin: string;
    type: string;
    to: string;
    amount: number;
    gasUnitPrice: number;
    maxGasAmount: number;
    sequenceNumber: number;
    expTimeStamp: number;
    chainId: number;
    payload: string;

    txRaw: string;
    errorTo: boolean;

    signature: string;
    message: string;

    setMnemonic: (mnemonic: string) => void;
    genMnemonic: () => void;
    setErrorMnemonic: (error: boolean) => void;
    setErrorTo: (error: boolean) => void;
    setErrorText: (errorMsg: string) => void;

    setPath: (path: string) => void;
    setPublicKey: (pubkey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setAddress: (address: string) => void;
    obtainAccount: () => void;

    setTo: (to: string) => void;
    setAmount: (amount: number) => void;
    setGasUnitPrice: (gasUnitPrice: number) => void;
    setMaxGasAmount: (maxGasAmount: number) => void;
    setSequenceNumber: (sequenceNumber: number) => void;
    setExpTimeStamp: (expTimeStamp: number) => void;
    setChainId: (chainId: number) => void;
    setType: (type: string) => void;
    setCoin: (type: string) => void;
    setTxRaw: (txRaw: string) => void;
    setPayload: (payload: string) => void;

    signTx: () => void;
    parseTx: () => void;

    setSignature: (signature: string) => void;
    setMessage: (message: string) => void;
    signMessage: () => void;

    handleChange: (event: any) => void;
}
const useStore = create<EthereumState>((set, get) => ({
    typeTags: ["0x1::coin::transfer"],
    coinTypes: ["0x1::aptos_coin::AptosCoin"],
    mnemonic: "gauge hole clog property soccer idea cycle stadium utility slice hold chief",
    errorMnemonic: false,
    path: "m/44'/637'/0'/0'/0'",
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    to: "0x3a7b36b20e29eeed9d8ee36573c3cda92c71587a6561a0ab6facb6fcf9f2cb60",
    errorTo: false,

    amount: 1000000,
    sequenceNumber: 0,
    payload: "",
    gasUnitPrice: 5000,
    maxGasAmount: 100000,
    expTimeStamp: Math.floor(Date.now() / 1000) + 20,
    chainId: 1,
    type: "0x1::coin::transfer",
    coin: "0x1::aptos_coin::AptosCoin",
    txRaw: "",
    signature: "",
    message: "",

    setMnemonic: (mnemonic: string) => {
        const { setErrorMnemonic, setErrorText } = get()
        if (!validateMnemonic(mnemonic)) {
            setErrorMnemonic(true);
            setErrorText("Mnemonic invalid ")
        }
        set({ mnemonic: mnemonic })
    },
    setPath: (path: string) => set({ path: path }),
    setErrorMnemonic: (error: boolean) => set({ errorMnemonic: error }),
    setErrorText: (msg: string) => set({ errorText: msg }),
    genMnemonic: () => {
        const { setMnemonic, setErrorMnemonic, setErrorText } = get()
        setMnemonic(generateMnemonic())
        setErrorMnemonic(false)
        setErrorText("")
    },
    setPublicKey: (pubKey: string) => set({ publicKey: pubKey }),
    setPrivateKey: (priKey: string) => set({ privateKey: priKey }),
    setAddress: (address: string) => set({ address: address }),
    obtainAccount: () => {
        const { mnemonic, path, setErrorMnemonic, setErrorText, setPublicKey, setAddress, setPrivateKey } = get()
        try {
            if (!validateMnemonic(mnemonic)) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account = AptosAccount.fromDerivePath(path, mnemonic);
            setPublicKey(account.toPrivateKeyObject().publicKeyHex!);
            setPrivateKey(account.toPrivateKeyObject().privateKeyHex);
            setAddress(account.toPrivateKeyObject().address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    setTo: (to: string) => set({ to: to }),
    setAmount: (amount: number) => set({ amount: amount }),
    setSequenceNumber: (sequenceNumber: number) => set({ sequenceNumber: sequenceNumber }),
    setGasUnitPrice: (gasPrice: number) => set({ gasUnitPrice: gasPrice }),
    setMaxGasAmount: (maxGasAmount: number) => set({ maxGasAmount: maxGasAmount }),
    setExpTimeStamp: (expTimeStamp: number) => set({ expTimeStamp: expTimeStamp }),
    setChainId: (chainId: number) => set({ chainId: chainId }),
    setType: (type: string) => set({ type: type }),
    setCoin: (coin: string) => set({ coin: coin }),
    setPayload: (payload: string) => set({ payload: payload }),
    setTxRaw: (txRaw: string) => set({ txRaw: txRaw }),
    signTx: async () => {
        const { setTxRaw, setErrorText, sequenceNumber, setPayload, mnemonic, path, to, address, coin, amount, type,
            maxGasAmount, gasUnitPrice, expTimeStamp, chainId } = get()
        setTxRaw("");
        let node_url = "";
        if (chainId == 1) {//1
            node_url = "https://fullnode.mainnet.aptoslabs.com";
        } else if (chainId == 2) {//2
            node_url = "https://fullnode.testnet.aptoslabs.com";
        } else {//38
            node_url = "https://fullnode.devnet.aptoslabs.com";
        }

        const client = new AptosClient(node_url);
        const coinClient = new CoinClient(client);
        const account = AptosAccount.fromDerivePath(path, mnemonic);
        const payload = coinClient.transactionBuilder.buildTransactionPayload(
            type,
            [coin],
            [new HexString(to), amount]
        );

        setPayload(HexString.fromUint8Array(BCS.bcsToBytes(payload)).hex());

        const rawTx = new TxnBuilderTypes.RawTransaction(
            TxnBuilderTypes.AccountAddress.fromHex(account.address()),
            BigInt(sequenceNumber),
            payload,
            BigInt(maxGasAmount),
            BigInt(gasUnitPrice),
            BigInt(expTimeStamp),
            new TxnBuilderTypes.ChainId(Number(chainId))
        );

        // setSigningMessageWithouPrefix(
        //     HexString.fromUint8Array(BCS.bcsToBytes(rawTx)).hex()
        // );
        // setSigningMessage(
        //     HexString.fromUint8Array(
        //         TransactionBuilder.getSigningMessage(rawTx)
        //     ).hex()
        // );
        // setSignature(account.signBuffer(TransactionBuilder.getSigningMessage(rawTx)).hex());
        setErrorText("")
        setTxRaw(account.signBuffer(TransactionBuilder.getSigningMessage(rawTx)).hex())
    },
    setSignature: (signature: string) => set({ signature: signature }),
    setMessage: (message: string) => set({ message: message }),
    signMessage: async () => {
        const { setSignature, mnemonic, path, message } = get()
        setSignature("")
        const account = AptosAccount.fromDerivePath(path, mnemonic);
        setSignature(account.signHexString(message).hex());
    },
    setErrorTo: (error: boolean) => set({ errorTo: error }),
    parseTx: () => {
        const { setTxRaw, txRaw } = get();
        setTxRaw(JSON.stringify({}));
    },
    handleChange: (event: any) => {
        const { setAddress, setErrorMnemonic, setMnemonic, setGasUnitPrice, setChainId, setCoin, setType, setPath, setPrivateKey, setPublicKey, setTo, setErrorText, setMessage, setSignature, setAmount, setSequenceNumber, setExpTimeStamp } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id == "to") {
            value = value.trim()
            setTo(value);
        } else if (id == "amount") {
            setAmount(value)
        } else if (id == "chainId") {
            setChainId(value)
        } else if (id == "type") {
            setType(value)
        } else if (id == "expTimeStamp") {
            setExpTimeStamp(value)
        } else if (id == "sequenceNumber") {
            setSequenceNumber(value)
        } else if (id == "gasUnitPrice") {
            setGasUnitPrice(value)
        } else if (id == "coin") {
            setCoin(value)
        } else if (id == "path") {
            value = value.trim()
            setPath(value);
        } else if (id == "mnemonic") {
            if (validateMnemonic(value)) {
                setErrorMnemonic(false)
                setErrorText("")
            }
            setMnemonic(value);
        } else if (id == "privateKey") {
            setPrivateKey(value);
        } else if (id == "publicKey") {
            setPublicKey(value);
        } else if (id == "address") {
            setAddress(value);
        } else if (id == "message") {
            setMessage(value.trim());
            setSignature("");
        }
    }
}));
export default useStore;