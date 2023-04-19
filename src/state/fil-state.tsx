import create from "zustand";
import { Fil, BigNumber, FIL_DEFAULT_PATH, validateMnemonic } from "wallet-web-lib";
import { MainState, MainStore } from './main-state';
interface XrpState extends MainState {
    to: string;
    nonce: string;
    value: string;
    gasLimit: string;
    gasFeeCap: string;
    gasPremium: string;
    method: string;
    params: string;

    setTo: (to: string) => void;
    setNonce: (nonce: string) => void;
    setValue: (value: string) => void;
    setGasLimit: (gasLimit: string) => void;
    setGasFeeCap: (gasFeeCap: string) => void;
    setGasPremium: (gasPremium: string) => void;
    setMethod: (method: string) => void;
    setParams: (params: string) => void;

}
const useStore = create<XrpState>((set: any, get: any) => ({
    ...MainStore(set),
    path: FIL_DEFAULT_PATH,
    to: "f1xgb73oc3s3sengf5ghvb5jzty5ftokodkibtmfa",
    nonce: "1",
    value: "10000",
    gasLimit: "10000",
    gasFeeCap: "10000",
    gasPremium: "10000",
    method: "2",
    params: "",
    setTo: (to: string) => set({ to: to }),
    setNonce: (nonce: string) => set({ nonce: nonce }),
    setValue: (value: string) => set({ value: value }),
    setGasLimit: (gasLimit: string) => set({ gasLimit: gasLimit }),
    setGasFeeCap: (gasFeeCap: string) => set({ gasFeeCap: gasFeeCap }),
    setGasPremium: (gasPremium: string) => set({ gasPremium: gasPremium }),
    setMethod: (method: string) => set({ method: method }),
    setParams: (params: string) => set({ params: params }),
    signTx: async () => {
        const { setErrorText, setSignature, mnemonic, path, setErrorMnemonic, to, nonce, value, gasLimit, gasFeeCap, gasPremium, method, params } = get()
        const account = new Fil(mnemonic, path);
        if (!validateMnemonic(mnemonic)) {
            setErrorText("Mnemonic invalid ")
            setErrorMnemonic(true)
            return;
        }
        setSignature("");
        let signature = await account.signTx(to, BigNumber.from(nonce).toNumber(), value, BigNumber.from(gasLimit).toNumber(), gasFeeCap, gasPremium, parseInt(method), params)
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
            const account = new Fil(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { setAddress, setMnemonic, setPath, setPublicKey, setPrivatKey,
            setTo, setNonce, setValue, setGasLimit, setGasFeeCap, setGasPremium, setMethod, setParams
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
        } else if (id === "to") {
            setTo(value);
        } else if (id === "nonce") {
            setNonce(value);
        } else if (id === "value") {
            setValue(value);
        } else if (id === "gasLimit") {
            setGasLimit(value);
        } else if (id === "gasFeeCap") {
            setGasFeeCap(value);
        } else if (id === "gasPremium") {
            setGasPremium(value);
        } else if (id === "method") {
            setMethod(value);
        } else if (id === "params") {
            setParams(value);
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath,
            setTo, setNonce, setValue, setGasLimit, setGasFeeCap, setGasPremium, setMethod, setParams
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "toc") {
            setTo("");
        } else if (id === "noncec") {
            setNonce("");
        } else if (id === "valuec") {
            setValue("");
        } else if (id === "gasLimitc") {
            setGasLimit("");
        } else if (id === "gasFeeCapc") {
            setGasFeeCap("");
        } else if (id === "gasPremiumc") {
            setGasPremium("");
        } else if (id === "methodc") {
            setMethod("");
        } else if (id === "paramsc") {
            setParams("");
        }
    },
}));
export default useStore;