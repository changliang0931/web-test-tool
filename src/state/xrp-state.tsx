import create from "zustand";
import { Xrp, BigNumber, XRP_DEFAULT_PATH, validateMnemonic } from "wallet-web-lib";
import { MainState, MainStore } from './main-state';
interface XrpState extends MainState {
    // 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';
    // keypairTypes: Array<string>;
    // keypairType: string;
    // genesisHash: string;
    // blockHash: string;
    // nonce: string;
    // specVersion: string;
    // transactionVersion: string;
    // tip: string;
    // call: string;
    // messageHash: string;
    // setKeypairType: (keypairType: string) => void;
    // setGenesisHash: (genesisHash: string) => void;
    // setBlockHash: (blockHash: string) => void;
    // setNonce: (nonce: string) => void;
    // setSpecVersion: (specVersion: string) => void;
    // setTransactionVersion: (transactionVersion: string) => void;
    // setTip: (tip: string) => void;
    // setCall: (call: string) => void;
}
const useStore = create<XrpState>((set: any, get: any) => ({
    ...MainStore(set),
    keypairTypes: ['ed25519', 'sr25519', 'ecdsa'],
    keypairType: "ed25519",
    path: XRP_DEFAULT_PATH,
    messageHash: "",
    genesisHash: "91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    blockHash: "5d2143bb808626d63ad7e1cda70fa8697059d670a992e82cd440fbb95ea40351",
    nonce: "0",
    specVersion: "9130",
    transactionVersion: "8",
    tip: "",
    call: `{"name":"transfer_keep_alive","transfer_keep_alive":{"keep_alive":true,"dest":"5FCAiG8aXJBYh4QLMViWhn8ZHBM3VjX2D6DK1uWvZC43wG2P","value":"100000"}}
    `,
    // setKeypairType: (keypairType: string) => set({ keypairType: keypairType }),
    // setGenesisHash: (genesisHash: string) => set({ genesisHash: genesisHash }),
    // setBlockHash: (blockHash: string) => set({ blockHash: blockHash }),
    // setNonce: (nonce: string) => set({ nonce: nonce }),
    // setSpecVersion: (specVersion: string) => set({ specVersion: specVersion }),
    // setTransactionVersion: (transactionVersion: string) => set({ transactionVersion: transactionVersion }),
    // setTip: (tip: string) => set({ tip: tip }),
    // setCall: (call: string) => set({ call: call }),
    signTx: async () => {
        const { setErrorText, setSignature, mnemonic, path, blockHash, nonce, specVersion, transactionVersion, tip, call, setErrorMnemonic, getGenesisHash } = get()
        const account = new Xrp(mnemonic, path);
        if (!validateMnemonic(mnemonic)) {
            setErrorText("Mnemonic invalid ")
            setErrorMnemonic(true)
            return;
        }
        if (call.trim() === "") {
            return;
        }
        let callObj;
        try {
            callObj = JSON.parse(call);
            if (call.indexOf("transfer") > -1) {
                callObj = { balances_call: callObj };
            } else {
                callObj = { staking_call: callObj };
            }
        } catch (error) {
            return;
        }
        let transaction = {
            "genesisHash": getGenesisHash("Polkadot"),
            "blockHash": blockHash || "",
            "nonce": BigNumber.from(nonce).toNumber() || 1,
            "specVersion": BigNumber.from(specVersion).toNumber() || 9130,
            "transaction_version": BigNumber.from(transactionVersion).toNumber() || 8,
            "tip": tip || "",
            "era": {
                "blockNumber": 0,
                "eraPeriod": 64
            },
            ...callObj,
        }
        setSignature("");
        let signature = await account.signTransaction(transaction);
        setSignature(signature);
        setErrorText("");
    },
    obtainAccount: () => {
        const { mnemonic, path, setErrorMnemonic, setErrorText, setPublicKey, setAddress, setPrivateKey } = get()
        try {
            if (!validateMnemonic(mnemonic)) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account = new Xrp(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { setAddress, setMnemonic, setPath, setPublicKey, setPrivatKey, setSignature, setNonce, setSpecVersion, setGenesisHash, setBlockHash, setTransactionVersion, setTip, setCall
        } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "mnemonic") {
            setMnemonic(value);
        } else if (id === "path") {
            setPath(value.trim());
        } else if (id === "publicKey") {
            setPublicKey(value);
        } else if (id === "privatKey") {
            setPrivatKey(value);
        } else if (id === "address") {
            setAddress(value);
        }else if (id === "signature") {
            setSignature(value);
        } 
        
        else if (id === "nonce") {
            setNonce(value);
        } else if (id === "genesisHash") {
            setGenesisHash(value);
        } else if (id === "blockHash") {
            setBlockHash(value);
        } else if (id === "specVersion") {
            setSpecVersion(value);
        } else if (id === "transactionVersion") {
            setTransactionVersion(value);
        } else if (id === "tip") {
            setTip(value);
        } else if (id === "call") {
            setCall(value);
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath, setNonce, setSpecVersion, setGenesisHash, setBlockHash, setTransactionVersion, setTip, setCall
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } 
        
        else if (id === "noncec") {
            setNonce("")
        }  else if (id === "genesisHashc") {
            setGenesisHash("");
        } else if (id === "blockHashc") {
            setBlockHash("");
        } else if (id === "specVersionc") {
            setSpecVersion("");
        } else if (id === "transactionVersionc") {
            setTransactionVersion("");
        } else if (id === "tipc") {
            setTip("");
        } else if (id === "callc") {
            setCall("");
        }
    },
}));
export default useStore;