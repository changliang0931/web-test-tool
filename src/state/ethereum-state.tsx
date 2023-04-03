import create from "zustand";
import { Ethereum, parseEthereumTx, validateMnemonic, isHexString, isEthereumAddress, ETHEREUM_DEFAULT_PATH, ETHEREUM_ZERO_ADDRESS, BigNumber, EthereumTypedData } from "wallet-web-lib"
import storage from '../state/storage';
interface EthereumState {
    mnemonic: string;
    path: string;
    errorMnemonic: boolean;

    errorText: string;
    publicKey: string;
    privateKey: string;
    address: string;
    signature: string;
    message: string;
    messageHash: string;
    transactionTypes: any;


    to: string;
    value: string;
    nonce: string;
    gasPrice: string;
    gasLimit: string;
    maxPriorityFeePerGas: string;
    maxFeePerGas: string;
    chainId: string;
    type: string;
    data: string;
    txRaw: string;
    display1559: string;
    errorTo: boolean;
    errorData: boolean;
    typedData: string;
    signatureTypedData: string;
    errorTypedData: boolean;
    setMnemonic: (mnemonic: string) => void;

    setErrorMnemonic: (error: boolean) => void;
    setErrorTo: (error: boolean) => void;
    setErrorData: (error: boolean) => void;

    setErrorText: (errorMsg: string) => void;
    setErrorTypedData: (errorTypedData: boolean) => void;

    setPath: (path: string) => void;
    setPublicKey: (pubkey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setAddress: (address: string) => void;
    obtainAccount: () => void;


    setTo: (to: string) => void;
    setValue: (value: string) => void;
    setNonce: (nonce: string) => void;
    setGasPrice: (gasPrice: string) => void;
    setGasLimit: (gasLimit: string) => void;
    setMaxPriorityFeePerGas: (maxPriorityFeePerGas: string) => void;
    setMaxFeePerGas: (maxFeePerGas: string) => void;
    setChainId: (chainId: string) => void;
    setType: (type: string) => void;
    setTxRaw: (txRaw: string) => void;
    setData: (data: string) => void;
    setDisplay1559: (display1559: string) => void;
    signTx: () => void;




    setSignature: (signature: string) => void;
    setMessage: (message: string) => void;
    setMessageHash: (messageHash: string) => void;
    setTypedData: (typedData: string) => void;
    setSignatureTypedData: (signatureTypedData: string) => void;
    signMessage: () => void;
    signTypedData: () => void;
    parseTx: () => void;
    handleChange: (event: any) => void;
    handleClear: (event: any) => void;
}
const useStore = create<EthereumState>((set, get) => ({
    transactionTypes: [
        {
            value: 0,
            label: 'legacy',
        },
        {
            value: 1,
            label: 'eip2930',
        },
        {
            value: 2,
            label: 'eip1559',
        }
    ],
    mnemonic: !storage.get(storage.keys.LOCAL_TEST_MNEMONIC) ? "gauge hole clog property soccer idea cycle stadium utility slice hold chief" : storage.get(storage.keys.LOCAL_TEST_MNEMONIC),
    errorMnemonic: false,
    path: ETHEREUM_DEFAULT_PATH,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    to: ETHEREUM_ZERO_ADDRESS,
    value: "100000000",
    nonce: "0",
    data: "0x",
    gasPrice: "100000000",
    gasLimit: "21000",
    maxPriorityFeePerGas: "100000000",
    maxFeePerGas: "200000000",
    chainId: "1",
    type: "0",
    txRaw: "",
    display1559: "none",
    signature: "",
    message: "",
    messageHash: "",
    errorTo: false,
    errorData: false,
    typedData: `{ "types": { "Person": [{ "name": "name", "type": "string" }, { "name": "wallet", "type": "address" }], "Mail": [{ "name": "from", "type": "Person" }, { "name": "to", "type": "Person" }, { "name": "contents", "type": "string" }] }, "primaryType": "Mail", "domain": { "name": "Ether Mail", "version": "1", "chainId": 1, "verifyingContract": "0x1e0Ae8205e9726E6F296ab8869160A6423E2337E" }, "message": { "from": { "name": "Cow", "wallet": "0xc0004B62C5A39a728e4Af5bee0c6B4a4E54b15ad" }, "to": { "name": "Bob", "wallet": "0x54B0Fa66A065748C40dCA2C7Fe125A2028CF9982" }, "contents": "Hello, Bob!" } }`
    ,
    signatureTypedData: "",
    errorTypedData: false,
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
    setErrorTypedData: (errorTypedData: boolean) => set({ errorTypedData: errorTypedData }),
    setPublicKey: (pubKey: string) => set({ publicKey: pubKey }),
    setPrivateKey: (priKey: string) => set({ privateKey: priKey }),
    setAddress: (address: string) => set({ address: address }),
    obtainAccount: () => {
        const { setErrorText, mnemonic, path, setErrorMnemonic, setPublicKey, setAddress, setPrivateKey } = get()
        const isMn = validateMnemonic(mnemonic)
        try {
            if (!isMn) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account = new Ethereum(mnemonic, path)
            setPublicKey(account.publicKey)
            setPrivateKey(account.privateKey)
            setAddress(account.address)
            setErrorText("")
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    setTo: (to: string) => set({ to: to }),
    setValue: (value: string) => set({ value: value }),
    setNonce: (nonce: string) => set({ nonce: nonce }),
    setGasPrice: (gasPrice: string) => set({ gasPrice: gasPrice }),
    setGasLimit: (gasLimit: string) => set({ gasLimit: gasLimit }),
    setMaxPriorityFeePerGas: (maxPriorityFeePerGas: string) => set({ maxPriorityFeePerGas: maxPriorityFeePerGas }),
    setMaxFeePerGas: (maxFeePerGas: string) => set({ maxFeePerGas: maxFeePerGas }),
    setChainId: (chainId: string) => set({ chainId: chainId }),
    setType: (type: string) => set({ type: type }),
    setTxRaw: (txRaw: string) => set({ txRaw: txRaw }),
    setData: (data: string) => set({ data: data }),
    setDisplay1559: (display1559: string) => set({ display1559: display1559 }),
    signTx: async () => {
        const { setTxRaw, setErrorText, setErrorTo, setErrorData, mnemonic, path, to, address, nonce, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, data, value, type, chainId } = get()
        setTxRaw("");
        const wallet = new Ethereum(mnemonic, path);
        const isTo = isEthereumAddress(to);
        if (to.length > 0 && !isTo) {
            setErrorTo(true);
            setErrorText("To invalid ")
            return
        }
        const isData = isHexString(data)
        if (!isData) {
            setErrorData(true);
            setErrorText("Data invalid")
            return
        }
        if (to.length === 0 && data.length < 3) {
            setErrorText("Data and To cannot be empty at the same time.");
            setErrorData(true)
            return
        }
        let unSigTx = {
            to: to || ETHEREUM_ZERO_ADDRESS,
            from: address,
            nonce: BigNumber.from(nonce).toNumber() || 0,
            gasLimit: BigNumber.from(gasLimit).toNumber() || 1000000000,
            value: BigNumber.from(value).toNumber() || 1000000000,
            chainId: BigNumber.from(chainId).toNumber() || 1,
            type: BigNumber.from(type).toNumber() || 0,
        }

        if (type === "2") {
            unSigTx = Object.assign(unSigTx, { maxPriorityFeePerGas: BigNumber.from(maxPriorityFeePerGas).toNumber() || 100000, maxFeePerGas: BigNumber.from(maxFeePerGas).toNumber() || 100000 });
        } else {
            unSigTx = Object.assign(unSigTx, { gasPrice: BigNumber.from(gasPrice).toNumber() || 21000 });
        }
        if ((data.startsWith("0x") || data.startsWith("0X")) && data.length > 2) {
            unSigTx = Object.assign(unSigTx, { data: data });
        }
        let sigTx = await wallet.signTransaction(unSigTx);
        setErrorText("")
        setTxRaw(sigTx)
    },
    setSignature: (signature: string) => set({ signature: signature }),
    setMessage: (message: string) => set({ message: message }),
    setTypedData: (typedData: string) => set({ typedData: typedData }),
    setMessageHash: (messageHash: string) => set({ messageHash: messageHash }),
    signMessage: async () => {
        const { setSignature, mnemonic, path, message, setMessageHash } = get()
        setSignature("")
        setMessageHash("");
        const wallet = new Ethereum(mnemonic, path);
        const messageHash = await wallet.message2Hash(message);
        setMessageHash(messageHash);
        const signature = await wallet.signMessage(message);

        setSignature(signature)
    },
    signTypedData: async () => {
        const { mnemonic, path, typedData, setSignatureTypedData, setErrorTypedData, setErrorText } = get()
        setSignatureTypedData("");
        try {
            if (typedData.trim() === "") {
                setErrorTypedData(true);
                setErrorText("TypedData  invalid ")
                return
            }
            JSON.parse(typedData);
        } catch (error: any) {
            setErrorTypedData(true);
            setErrorText("TypedData  invalid " + error.message);
            return
        }
        setErrorTypedData(false);
        setErrorText("")
        let typedDat: EthereumTypedData = JSON.parse(typedData);
        const wallet = new Ethereum(mnemonic, path);
        const signature = await wallet.signTypedData(typedDat);
        setSignatureTypedData(signature);
    },
    setSignatureTypedData: (signatureTypedData: string) => set({ signatureTypedData: signatureTypedData }),
    setErrorData: (error: boolean) => set({ errorData: error }),
    setErrorTo: (error: boolean) => set({ errorTo: error }),
    parseTx: () => {
        const { setTxRaw, txRaw } = get();
        setTxRaw(parseEthereumTx(txRaw));
    },
    handleChange: (event: any) => {
        const { setSignature, setErrorTo, setTo, setErrorData, setData, setValue, setChainId, setType, setAddress, setDisplay1559,
            setMaxFeePerGas, setMaxPriorityFeePerGas, setErrorMnemonic, setNonce, setGasLimit, setGasPrice, setMessage, setMnemonic, setPath, setPrivateKey, setPublicKey, setErrorText, setTypedData, setErrorTypedData } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "to") {
            value = value.trim()
            if (isEthereumAddress(value)) {
                setErrorTo(false);
            }
            setTo(value);
        } else if (id === "data") {
            value = value.trim()
            if (isHexString(value)) {
                setErrorData(false);
            }
            setData(value);
        } else if (id === "value") {
            setValue(value)
        } else if (id === "chainId") {
            setChainId(value)
        } else if (id === "type") {
            setType(value)
            setDisplay1559("none")
            if (value === 2) {
                setDisplay1559("block")
            }
        } else if (id === "maxFeePerGas") {
            setMaxFeePerGas(value)
        } else if (id === "maxPriorityFeePerGas") {
            setMaxPriorityFeePerGas(value)
        } else if (id === "nonce") {
            setNonce(value)
        } else if (id === "gasPrice") {
            setGasPrice(value)
        } else if (id === "gasLimit") {
            setGasLimit(value)
        } else if (id === "path") {
            value = value.trim()
            setPath(value);
        } else if (id === "mnemonic") {
            if (validateMnemonic(value)) {
                setErrorMnemonic(false)
                setErrorText("")
            }
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
        } else if (id === "typedData") {
            setTypedData(value);
        }
    },
    handleClear: (event: any) => {
        const { setTo, setData, setMessage, setMnemonic, setPath, setTypedData,
            setValue, setChainId, setType,
            setMaxFeePerGas, setMaxPriorityFeePerGas, setNonce, setGasLimit, setGasPrice,
        } = get()
        let id = event.currentTarget.id;
        if (id === "pathc") {
            setPath("");
        } else if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "toc") {
            setTo("");
        } else if (id === "datac") {
            setData("");
        } else if (id === "valuec") {
            setValue("")
        } else if (id === "chainIdc") {
            setChainId("")
        } else if (id === "typec") {
            setType("")
        } else if (id === "maxFeePerGasc") {
            setMaxFeePerGas("")
        } else if (id === "maxPriorityFeePerGasc") {
            setMaxPriorityFeePerGas("")
        } else if (id === "noncec") {
            setNonce("")
        } else if (id === "gasPricec") {
            setGasPrice("")
        } else if (id === "gasLimitc") {
            setGasLimit("")
        } else if (id === "messagec") {
            setMessage("");
        } else if (id === "typedDatac") {
            setTypedData("");
        }
    },

}));
export default useStore;