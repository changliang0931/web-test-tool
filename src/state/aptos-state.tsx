import create from "zustand";
import { Aptos, HexString, APTOS_TYPE_TAGS, APTOS_DEFAULT_PATH, APTOS_FUNCS, APTOS_MODULE, generateMnemonic, validateMnemonic } from "wallet-web-lib"
//https://aptos.dev/
interface EthereumState {
    typeTags: Array<string>;
    modules: Array<string>;
    funcs: Array<string>;
    
    mnemonic: string;
    path: string;
    errorMnemonic: boolean;
    errorText: string;
    publicKey: string;
    privateKey: string;
    address: string;

    
    module: string;
    func: string;
    typeTag: string;
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

    setModule: (module: string) => void;
    setFunc: (func: string) => void;
    setTypeTag: (typeTag: string) => void;

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
    typeTags: ["",APTOS_TYPE_TAGS.aptos_coin],
    modules: [APTOS_MODULE["0x1::aptos_account"], APTOS_MODULE["0x1::coin"]],
    funcs: [APTOS_FUNCS.transfer],
    mnemonic: "gauge hole clog property soccer idea cycle stadium utility slice hold chief",
    errorMnemonic: false,
    path: APTOS_DEFAULT_PATH,
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
    module: APTOS_MODULE["0x1::aptos_account"],
    typeTag: "",
    txRaw: "",
    signature: "",
    message: "",
    func: APTOS_FUNCS.transfer,

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
            const account = new Aptos(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
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
    setModule: (module: string = APTOS_MODULE["0x1::aptos_account"]) => set({ module: module }),
    setFunc: (func: string = APTOS_FUNCS.transfer) => set({ func: func }),
    setTypeTag: (typeTag: string = "") => set({ typeTag: typeTag }),
    setPayload: (payload: string) => set({ payload: payload }),
    setTxRaw: (txRaw: string) => set({ txRaw: txRaw }),
    signTx: async () => {
        const { setTxRaw, setErrorText, module, func, typeTag, sequenceNumber, setPayload, mnemonic, path, to, amount,
            maxGasAmount, gasUnitPrice, expTimeStamp, chainId } = get()
        setTxRaw("");
        const account = new Aptos(mnemonic, path);
        const payload = account.getPayload(module, func, typeTag, to, amount);
        setPayload(account.payload2Hex(payload));
        const tx = await account.signTransaction({ sequenceNumber: sequenceNumber, payload: payload, maxGasAmount: maxGasAmount, gasUnitPrice: gasUnitPrice, expTimeStamp: expTimeStamp, chainId: chainId, typeTag: typeTag, module: module,func:func, to: to, amount: amount });
        setTxRaw(tx.raw);
        setErrorText("");
    },
    setSignature: (signature: string) => set({ signature: signature }),
    setMessage: (message: string) => set({ message: message }),
    signMessage: async () => {
        const { setSignature, mnemonic, path, message } = get()
        setSignature("")
        const account = new Aptos(mnemonic, path);
        setSignature(account.signMessage(message));
    },
    setErrorTo: (error: boolean) => set({ errorTo: error }),
    parseTx: () => {
        const { setTxRaw, txRaw } = get();
        setTxRaw(JSON.stringify({}));
    },
    handleChange: (event: any) => {
        const { setAddress, setErrorMnemonic, setMnemonic, setGasUnitPrice, setChainId, setModule, setTypeTag, setPath, setPrivateKey, setPublicKey, setTo, setErrorText, setFunc,setMessage, setSignature, setAmount, setSequenceNumber, setExpTimeStamp } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id == "to") {
            value = value.trim()
            setTo(value);
        } else if (id == "amount") {
            setAmount(value)
        } else if (id == "chainId") {
            setChainId(value)
        } else if (id == "typeTag") {
            setTypeTag(value)
        } else if (id == "expTimeStamp") {
            setExpTimeStamp(value)
        } else if (id == "sequenceNumber") {
            setSequenceNumber(value)
        } else if (id == "gasUnitPrice") {
            setGasUnitPrice(value)
        }  else if (id == "module") {
            setModule(value)
        } else if (id == "func") {
            setFunc(value)
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