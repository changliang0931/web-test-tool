import create from "zustand";
import { Aptos, BigNumber, APTOS_TYPE_TAGS, APTOS_DEFAULT_PATH, APTOS_FUNCS, APTOS_MODULE, validateMnemonic } from "wallet-web-lib"
import { MainState, MainStore } from '../state/main-state';
//https://aptos.dev/
interface EthereumState extends MainState {
    typeTags: Array<string>;
    modules: Array<string>;
    funcs: Array<string>;

    module: string;
    func: string;
    typeTag: string;
    to: string;
    amount: string;
    gasUnitPrice: string;
    maxGasAmount: string;
    sequenceNumber: string;
    expTimeStamp: string;
    chainId: string;
    errorTo: boolean;

    setTo: (to: string) => void;
    setAmount: (amount: string) => void;
    setGasUnitPrice: (gasUnitPrice: string) => void;
    setMaxGasAmount: (maxGasAmount: string) => void;
    setSequenceNumber: (sequenceNumber: string) => void;
    setExpTimeStamp: (expTimeStamp: string) => void;
    setChainId: (chainId: string) => void;

    setModule: (module: string) => void;
    setFunc: (func: string) => void;
    setTypeTag: (typeTag: string) => void;

}
const useStore = create<EthereumState>((set, get) => ({
    ...MainStore(set),
    typeTags: ["", APTOS_TYPE_TAGS.aptos_coin],
    modules: [APTOS_MODULE["0x1::aptos_account"], APTOS_MODULE["0x1::coin"]],
    funcs: [APTOS_FUNCS.transfer],
    message:"0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    path: APTOS_DEFAULT_PATH,
    to: "0x3a7b36b20e29eeed9d8ee36573c3cda92c71587a6561a0ab6facb6fcf9f2cb60",
    errorTo: false,
    amount: "1000000",
    sequenceNumber: "0",
    gasUnitPrice: "5000",
    maxGasAmount: "100000",
    expTimeStamp: (Math.floor(Date.now() / 1000) + 20).toString(),
    chainId: "1",
    module: APTOS_MODULE["0x1::aptos_account"],
    typeTag: "",
    func: APTOS_FUNCS.transfer,
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
    setAmount: (amount: string) => set({ amount: amount }),
    setSequenceNumber: (sequenceNumber: string) => set({ sequenceNumber: sequenceNumber }),
    setGasUnitPrice: (gasPrice: string) => set({ gasUnitPrice: gasPrice }),
    setMaxGasAmount: (maxGasAmount: string) => set({ maxGasAmount: maxGasAmount }),
    setExpTimeStamp: (expTimeStamp: string) => set({ expTimeStamp: expTimeStamp }),
    setChainId: (chainId: string) => set({ chainId: chainId }),
    setModule: (module: string = APTOS_MODULE["0x1::aptos_account"]) => set({ module: module }),
    setFunc: (func: string = APTOS_FUNCS.transfer) => set({ func: func }),
    setTypeTag: (typeTag: string = "") => set({ typeTag: typeTag }),
    signTx: async () => {
        const { setRawTransaction, setErrorText, module, func, typeTag, sequenceNumber, setPayload, mnemonic, path, to, amount,
            maxGasAmount, gasUnitPrice, expTimeStamp, chainId } = get()
            setRawTransaction("");
        const account = new Aptos(mnemonic, path);
        const payload = account.getPayload(module, func, typeTag, to, BigNumber.from(amount).toNumber());
        setPayload(account.payload2Hex(payload));
        const tx = await account.signTransaction({ sequenceNumber: sequenceNumber, payload: payload, maxGasAmount: maxGasAmount, gasUnitPrice: gasUnitPrice, expTimeStamp: expTimeStamp, chainId: chainId, typeTag: typeTag, module: module, func: func, to: to, amount: amount });
        setRawTransaction(tx.raw);
        setErrorText("");
    },
    signMessage: async () => {
        const { setMsgSignature, mnemonic, setErrorMnemonic, setErrorText, path, message } = get()
        setMsgSignature("")
        if (validateMnemonic(mnemonic)) {
            setErrorMnemonic(false)
            setErrorText("")
        }
        const account = new Aptos(mnemonic, path);
        setMsgSignature(account.signMessage(message));
    },
    setErrorTo: (error: boolean) => set({ errorTo: error }),
    handleChange: (event: any) => {
        const { setAddress, setMnemonic, setGasUnitPrice, setChainId, setModule, setTypeTag, setPath, setPrivateKey, setPublicKey, setTo, setFunc, setMessage, setSignature, setAmount, setSequenceNumber, setExpTimeStamp, setMaxGasAmount } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "to") {
            value = value.trim()
            setTo(value);
        } else if (id === "amount") {
            setAmount(value)
        } else if (id === "maxGasAmount") {
            setMaxGasAmount(value)
        } else if (id === "chainId") {
            setChainId(value)
        } else if (id === "typeTag") {
            setTypeTag(value)
        } else if (id === "expTimeStamp") {
            setExpTimeStamp(value)
        } else if (id === "sequenceNumber") {
            setSequenceNumber(value)
        } else if (id === "gasUnitPrice") {
            setGasUnitPrice(value)
        } else if (id === "module") {
            setModule(value)
        } else if (id === "func") {
            setFunc(value)
        } else if (id === "path") {
            value = value.trim()
            setPath(value);
        } else if (id === "mnemonic") {
            setMnemonic(value);
        } else if (id === "privateKey") {
            setPrivateKey(value);
        } else if (id === "publicKey") {
            setPublicKey(value);
        } else if (id === "address") {
            setAddress(value);
        } else if (id === "message") {
            setMessage(value.trim());
            setSignature("");
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath, setGasUnitPrice, setChainId, setTo, setMessage, setAmount, setSequenceNumber, setExpTimeStamp, setMaxGasAmount } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "toc") {
            setTo("");
        } else if (id === "amountc") {
            setAmount("");
        } else if (id === "chainIdc") {
            setChainId("");
        } else if (id === "expTimeStampc") {
            setExpTimeStamp("");
        } else if (id === "sequenceNumberc") {
            setSequenceNumber("");
        } else if (id === "gasUnitPricec") {
            setGasUnitPrice("");
        } else if (id === "maxGasAmountc") {
            setMaxGasAmount("")
        } else if (id === "messagec") {
            setMessage("");
        }
    }
}));
export default useStore;