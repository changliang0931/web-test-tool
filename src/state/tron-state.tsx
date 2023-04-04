import create from "zustand";
import { Tron, TRON_DEFAULT_PATH, BigNumber, validateMnemonic } from "wallet-web-lib";
import { MainState, MainStore } from '../state/main-state';
interface TronState  extends MainState {
    refBlockBytes: string;
    refBlockNum: string;
    refBlockHash: string;
    expiration: string;
    timestamp: string;
    feeLimit: string;
    contracts: string;
    errorContracts: boolean;
    payload: string;
    
    setRefBlockBytes: (refBlockBytes: string) => void;
    setRefBlockNum: (refBlockNum: string) => void;
    setRefBlockHash: (refBlockHash: string) => void;
    setExpiration: (expiration: string) => void;
    setTimestamp: (timestamp: string) => void;
    setFeeLimit: (feeLimit: string) => void;
    setContracts: (contracts: string) => void;
    setErrorContracts: (errorContracts: boolean) => void;
    setPayload: (payload: string) => void;
}
const useStore = create<TronState>((set: any, get: any) => ({
    ...MainStore(set),
    path: TRON_DEFAULT_PATH,
    refBlockBytes: "9148",
    refBlockNum: "0",
    refBlockHash: "2b72b05b7674b257",
    expiration: "2021-09-28T14:46:18",
    timestamp: "1603346193445",
    feeLimit: "0",
    contracts: `[{ "name": "transfer", "to_address": "TLb2e2uRhzxvrxMcC8VkL2N7zmxYyg3Vfc", "amount": 1000000000000000000 }]`,
    errorContracts: false,
    payload: "",
    setRefBlockBytes: (refBlockBytes: string) => set({ refBlockBytes: refBlockBytes }),
    setRefBlockNum: (refBlockNum: string) => set({ refBlockNum: refBlockNum }),
    setRefBlockHash: (refBlockHash: string) => set({ refBlockHash: refBlockHash }),
    setExpiration: (expiration: string) => set({ expiration: expiration }),
    setTimestamp: (timestamp: string) => set({ timestamp: timestamp }),
    setFeeLimit: (feeLimit: string) => set({ feeLimit: feeLimit }),
    setPayload: (payload: string) => set({ payload: payload }),
    setContracts: (contracts: string) => set({ contracts: contracts }),
    setErrorContracts: (errorContracts: boolean) => set({ errorContracts: errorContracts }),
    signTx: async () => {
        const { setErrorText, setErrorMnemonic, setErrorContracts, setPayload, setSignature, mnemonic, path,
            refBlockBytes, refBlockNum, refBlockHash, expiration, timestamp, feeLimit, contracts
        } = get()
        if (!validateMnemonic(mnemonic)) {
            setErrorMnemonic(true);
            setErrorText("Mnemonic invalid ")
            return;
        }
        if (contracts.trim() === "") {
            setErrorContracts(true);
            setErrorText("Contracts  invalid ")
            return
        }
        try {
            JSON.parse(contracts);
        } catch (error: any) {
            setErrorContracts(true);
            setErrorText("Contracts  invalid " + error.message)
            return;
        }
        const account = new Tron(mnemonic, path);
        let transaction = {
            ref_block_bytes: refBlockBytes || "9148",
            ref_block_num: BigNumber.from(refBlockNum).toNumber() || 0,
            ref_block_hash: refBlockHash || "2b72b05b7674b257",
            expiration: expiration || "2021-09-28T14:46:18",
            timestamp: BigNumber.from(timestamp).toNumber() || 1603346193445,
            fee_limit: BigNumber.from(feeLimit).toNumber() || 0,
            contracts: JSON.parse(contracts)
        }
        setSignature("")
        const signaturer = await account.signTransaction(transaction);
        setPayload(signaturer.raw_data_hex)
        setSignature(JSON.stringify(signaturer))
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
            const account = new Tron(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { setAddress, setMnemonic, setPath, setPrivateKey, setPublicKey,
            setRefBlockBytes, setRefBlockNum, setRefBlockHash, setExpiration, setTimestamp, setFeeLimit, setContracts
        } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "mnemonic") {
            setMnemonic(value);
        } else if (id === "path") {
            setPath(value.trim());
        } else if (id === "privateKey") {
            setPrivateKey(value);
        } else if (id === "publicKey") {
            setPublicKey(value);
        } else if (id === "address") {
            setAddress(value);
        } else if (id === "expiration") {
            setExpiration(value);
        } else if (id === "refBlockNum") {
            setRefBlockNum(value);
        } else if (id === "refBlockBytes") {
            setRefBlockBytes(value);
        } else if (id === "refBlockHash") {
            setRefBlockHash(value);
        } else if (id === "timestamp") {
            setTimestamp(value);
        } else if (id === "feeLimit") {
            setFeeLimit(value);
        } else if (id === "contracts") {
            setContracts(value);
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath,
            setRefBlockBytes, setRefBlockNum, setRefBlockHash, setExpiration, setTimestamp, setFeeLimit, setContracts
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "expirationc") {
            setExpiration("");
        } else if (id === "refBlockNumc") {
            setRefBlockNum("");
        } else if (id === "refBlockBytesc") {
            setRefBlockBytes("");
        } else if (id === "refBlockHashc") {
            setRefBlockHash("");
        } else if (id === "timestampc") {
            setTimestamp("");
        } else if (id === "feeLimitc") {
            setFeeLimit("");
        } else if (id === "contractsc") {
            setContracts("");
        }
    }
}));
export default useStore;