import create from "zustand";
import { utils, constants, Wallet, BigNumber } from "ethers";
import { generateMnemonic } from "bip39";
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
    transactionTypes: any;


    to: string;
    value: number;
    nonce: number;
    gasPrice: number;
    gasLimit: number;
    maxPriorityFeePerGas: number;
    maxFeePerGas: number;
    chainId: number;
    type: number;
    data: string;
    txRaw: string;
    display1559: string;
    errorTo: boolean;
    errorData: boolean;

    setMnemonic: (mnemonic: string) => void;
    genMnemonic: () => void;

    setErrorMnemonic: (error: boolean) => void;
    setErrorTo: (error: boolean) => void;
    setErrorData: (error: boolean) => void;

    setErrorText: (errorMsg: string) => void;

    setPath: (path: string) => void;
    setPublicKey: (pubkey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setAddress: (address: string) => void;
    obtainAccount: () => void;


    setTo: (to: string) => void;
    setValue: (value: number) => void;
    setNonce: (nonce: number) => void;
    setGasPrice: (gasPrice: number) => void;
    setGasLimit: (gasLimit: number) => void;
    setMaxPriorityFeePerGas: (maxPriorityFeePerGas: number) => void;
    setMaxFeePerGas: (maxFeePerGas: number) => void;
    setChainId: (chainId: number) => void;
    setType: (type: number) => void;
    setTxRaw: (txRaw: string) => void;
    setData: (data: string) => void;
    setDisplay1559: (display1559: string) => void;
    signTx: () => void;




    setSignature: (signature: string) => void;
    setMessage: (message: string) => void;
    signMessage: () => void;
    parseTx: () => void;
    handleChange: (event: any) => void;
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
    mnemonic: "gauge hole clog property soccer idea cycle stadium utility slice hold chief",
    errorMnemonic: false,
    path: utils.defaultPath,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    to: constants.AddressZero,
    value: 100000000,
    nonce: 0,
    data: "0x",
    gasPrice: 100000000,
    gasLimit: 21000,
    maxPriorityFeePerGas: 100000000,
    maxFeePerGas: 200000000,
    chainId: 1,
    type: 0,
    txRaw: "",
    display1559: "none",
    signature: "",
    message: "",
    errorTo: false,
    errorData: false,
    setMnemonic: (mnemonic: string) => {
        const { setErrorMnemonic, setErrorText } = get()
        if (!utils.isValidMnemonic(mnemonic)) {
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
        const { setErrorText, mnemonic, path, setErrorMnemonic, setPublicKey, setAddress, setPrivateKey } = get()
        const isMn = utils.isValidMnemonic(mnemonic)
        try {
            if (!isMn) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account = Wallet.fromMnemonic(mnemonic, path)
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
    setValue: (value: number) => set({ value: BigNumber.from(value).toNumber() }),
    setNonce: (nonce: number) => set({ nonce: BigNumber.from(nonce).toNumber() }),
    setGasPrice: (gasPrice: number) => set({ gasPrice: BigNumber.from(gasPrice).toNumber() }),
    setGasLimit: (gasLimit: number) => set({ gasLimit: BigNumber.from(gasLimit).toNumber() }),
    setMaxPriorityFeePerGas: (maxPriorityFeePerGas: number) => set({ maxPriorityFeePerGas: BigNumber.from(maxPriorityFeePerGas).toNumber() }),
    setMaxFeePerGas: (maxFeePerGas: number) => set({ maxFeePerGas: BigNumber.from(maxFeePerGas).toNumber() }),
    setChainId: (chainId: number) => set({ chainId: BigNumber.from(chainId).toNumber() }),
    setType: (type: number) => set({ type: type }),
    setTxRaw: (txRaw: string) => set({ txRaw: txRaw }),
    setData: (data: string) => set({ data: data }),
    setDisplay1559: (display1559: string) => set({ display1559: display1559 }),
    signTx: async () => {
        const { setTxRaw, setErrorText, setErrorTo, setErrorData, mnemonic, path, to, address, nonce, gasLimit, gasPrice, maxFeePerGas, maxPriorityFeePerGas, data, value, type, chainId } = get()
        setTxRaw("");
        const wallet = Wallet.fromMnemonic(mnemonic, path);
        const isTo = utils.isAddress(to);
        if (to.length > 0 && !isTo) {
            setErrorTo(true);
            setErrorText("To invalid ")
            return
        }
        const isData = utils.isHexString(data)
        if (!isData) {
            setErrorData(true);
            setErrorText("Data invalid")
            return
        }
        if (to.length == 0 && data.length < 3) {
            setErrorText("Data and To cannot be empty at the same time.");
            setErrorData(true)
            return
        }
        let unSigTx = {
            to: to || constants.AddressZero,
            from: address,
            nonce: nonce || 1,
            gasLimit: gasLimit || 1000000000,
            data: data || "0x",
            value: value || 1000000000,
            chainId: chainId || 1,
            type: type || 0,
        }

        if (type == 2) {
            unSigTx = Object.assign(unSigTx, { maxPriorityFeePerGas: maxPriorityFeePerGas || 100000, ßmaxFeePerGas: maxFeePerGas || 100000 });
        } else {
            unSigTx = Object.assign(unSigTx, { gasPrice: gasPrice || 21000 });
        }
        let sigTx = await wallet.signTransaction(unSigTx);
        setErrorText("")
        setTxRaw(sigTx)
    },
    setSignature: (signature: string) => set({ signature: signature }),
    setMessage: (message: string) => set({ message: message }),
    signMessage: async () => {
        const { setSignature, mnemonic, path, message } = get()
        setSignature("")
        const wallet = Wallet.fromMnemonic(mnemonic, path);
        const signature = await wallet.signMessage(message);
        setSignature(signature)
    },
    setErrorData: (error: boolean) => set({ errorData: error }),
    setErrorTo: (error: boolean) => set({ errorTo: error }),
    parseTx: () => {
        const { setTxRaw, txRaw } = get();
        setTxRaw(JSON.stringify(utils.parseTransaction(txRaw)));
    }, 
    handleChange: (event: any) => {
        const { setSignature, setErrorTo, setTo, setErrorData, setData, setValue, setChainId, setType, setAddress, setDisplay1559,
            setMaxFeePerGas, setMaxPriorityFeePerGas, setErrorMnemonic, setNonce, setGasLimit, setGasPrice, setMessage, setMnemonic, setPath, setPrivateKey, setPublicKey, setErrorText } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id == "to") {
            value = value.trim()
            if (utils.isAddress(value)) {
                setErrorTo(false);
            }
            setTo(value);
        } else if (id == "data") {
            value = value.trim()
            if (utils.isHexString(value)) {
                setErrorData(false);
            }
            setData(value);
        } else if (id == "value") {
            setValue(value)
        } else if (id == "chainId") {
            setChainId(value)
        } else if (id == "type") {
            setType(value)
            setDisplay1559("none")
            if (value == 2) {
                setDisplay1559("block")
            }
        } else if (id == "maxFeePerGas") {
            setMaxFeePerGas(value)
        } else if (id == "maxPriorityFeePerGas") {
            setMaxPriorityFeePerGas(value)
        } else if (id == "nonce") {
            setNonce(value)
        } else if (id == "gasPrice") {
            setGasPrice(value)
        } else if (id == "gasLimit") {
            setGasLimit(value)
        } else if (id == "path") {
            value = value.trim()
            setPath(value);
        } else if (id == "mnemonic") {
            if (utils.isValidMnemonic(value)) {
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