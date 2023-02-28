import create from "zustand";
import { Tron, TRON_DEFAULT_PATH, generateMnemonic, validateMnemonic ,getExpiration} from "wallet-web-lib";
interface TronState {
    mnemonic: string;
    path: string;
    errorMnemonic: boolean;
    errorText: string;
    publicKey: string;
    privateKey: string;
    address: string;

    refBlockBytes: string;
    refBlockNum: number;
    refBlockHash: string;
    expiration: string;
    timestamp: number;
    feeLimit: number;
    contracts: Object[];
    errorContracts: boolean;
    signature: string;
    payload: string;
    setMnemonic: (mnemonic: string) => void;
    setErrorMnemonic: (error: boolean) => void;
    setErrorText: (errorMsg: string) => void;

    setPath: (path: string) => void;
    setPublicKey: (pubkey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setAddress: (address: string) => void;

    setRefBlockBytes: (refBlockBytes: string) => void;
    setRefBlockNum: (refBlockNum: number) => void;
    setRefBlockHash: (refBlockHash: string) => void;
    setExpiration: (expiration: string) => void;
    setTimestamp: (timestamp: number) => void;
    setFeeLimit: (feeLimit: number) => void;
    setContracts: (contracts: []) => void;
    setErrorContracts: (errorContracts: boolean) => void;
    setSignature: (signature: string) => void;
    setPayload: (payload: string) => void;
    genMnemonic: () => void;
    obtainAccount: () => void;
    signTx: () => void;
    parseTx: () => void;
    handleChange: (event: any) => void;
}
const useStore = create<TronState>((set: any, get: any) => ({
    mnemonic: "gauge hole clog property soccer idea cycle stadium utility slice hold chief",
    errorMnemonic: false,
    path: TRON_DEFAULT_PATH,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    refBlockBytes: "9148",
    refBlockNum: 0,
    refBlockHash: "2b72b05b7674b257",
    expiration: "2021-09-28T14:46:18",
    timestamp: 1603346193445,
    feeLimit: 0,
    contracts: [{ "name": "transfer", "to_address": "TLb2e2uRhzxvrxMcC8VkL2N7zmxYyg3Vfc", "amount": 1000000000000000000 }],
    errorContracts: false,
    signature: "",
    payload: "",
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
    setPublicKey: (pubKey: string) => set({ publicKey: pubKey }),
    setPrivateKey: (priKey: string) => set({ privateKey: priKey }),
    setAddress: (address: string) => set({ address: address }),
    setRefBlockBytes: (refBlockBytes: string) => set({ refBlockBytes: refBlockBytes }),
    setRefBlockNum: (refBlockNum: number) => set({ refBlockNum: refBlockNum }),
    setRefBlockHash: (refBlockHash: string) => set({ refBlockHash: refBlockHash }),
    setExpiration: (expiration: string) => set({ expiration: expiration }),
    setTimestamp: (timestamp: number) => set({ timestamp: timestamp }),
    setFeeLimit: (feeLimit: number) => set({ feeLimit: feeLimit }),
    setSignature: (signature: string) => set({ signature: signature }),
    setPayload: (payload: string) => set({ payload: payload }),
    setContracts: (contracts: Object[]) => set({ contracts: contracts }),
    setErrorContracts: (errorContracts: boolean) => set({ errorContracts: errorContracts }),
    signTx: async () => {
        const { setErrorText, setPayload, setSignature, mnemonic, path,
            refBlockBytes, refBlockNum, refBlockHash, expiration, timestamp, feeLimit, contracts
        } = get()
        const account = new Tron(mnemonic, path);
        let transaction = {
            ref_block_bytes: refBlockBytes || "9148",
            ref_block_num: refBlockNum || 0,
            ref_block_hash: refBlockHash || "2b72b05b7674b257",
            expiration: getExpiration(expiration || "2021-09-28T14:46:18"),
            timestamp: timestamp || 1603346193445,
            fee_limit: feeLimit || 0,
            contracts: contracts
        }
        setSignature("")
        const signaturer = await account.signTransaction(transaction);
        setPayload(signaturer.raw_data_hex)
        setSignature(JSON.stringify(signaturer))
        setErrorText("");
    },
    genMnemonic: () => {
        const { setMnemonic, setErrorMnemonic, setErrorText } = get()
        const mnemoic = generateMnemonic()
        setMnemonic(mnemoic)
        setErrorMnemonic(false)
        setErrorText("")
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
    parseTx: () => {
    },
    handleChange: (event: any) => {
        const { setAddress, setErrorMnemonic, setMnemonic, setPath, setPrivateKey, setPublicKey, setErrorText,
            setRefBlockBytes, setRefBlockNum, setRefBlockHash, setExpiration, setTimestamp, setFeeLimit, setErrorContracts, setContracts
        } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "mnemonic") {
            if (validateMnemonic(value)) {
                setErrorMnemonic(false)
                setErrorText("")
            }
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
            setRefBlockNum(parseInt(value));
        } else if (id === "refBlockBytes") {
            setRefBlockBytes(value);
        } else if (id === "refBlockHash") {
            setRefBlockHash(value);
        } else if (id === "timestamp") {
            setTimestamp(parseInt(value));
        } else if (id === "feeLimit") {
            setFeeLimit(parseInt(value));
        } else if (id === "contracts") {
            try {
                if (value.trim() === "") {
                    setErrorContracts(true);
                    setErrorText("Contracts  invalid ")
                    return
                }
                const contracts = JSON.parse(value);
                setErrorContracts(false);
                setContracts(contracts);
                setErrorText("")
            } catch (error: any) {
                setErrorContracts(true);
                setErrorText("Contracts  invalid " + error.message)
            }
        }
    }
}));
export default useStore;