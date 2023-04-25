import { randomString, publicKeyConvert } from "wallet-web-lib"
import storage from './storage';
export interface MainState {
    netTypes: string[];//MAIN;TEST...
    netType: string;
    mnemonic: string;
    path: string;

    publicKey: string;
    privateKey: string;
    address: string;

    message: string;
    signature: string;
    transaction: string;
    payload: string;
    rawTransaction: string;
    jsonTransaction: string;
    msgSignature: string;
    errorMnemonic: boolean;
    errorText: string;

    setNetType: (netType: string) => void;
    setMnemonic: (mnemonic: string) => void;
    setPath: (path: string) => void;

    setErrorMnemonic: (error: boolean) => void;
    setErrorText: (errorMsg: string) => void;

    setPublicKey: (publicKey: string) => void;
    setPrivateKey: (privateKey: string) => void;
    setAddress: (address: string) => void;

    setMessage: (message: string) => void;
    setSignature: (signature: string) => void;
    setTransaction: (transaction: string) => void;
    setPayload: (payload: string) => void;
    setJsonTransaction: (jsonTransaction: string) => void;
    setRawTransaction: (rawTransaction: string) => void;
    setMsgSignature: (msgSignature: string) => void;

    handleChange?: (event: any) => void;
    handleClear?: (event: any) => void;
    random: (len?: number) => string;

    obtainAccount?: () => void;
    signTx?: () => void;
    signMessage?: () => void;
}
const MainStore = (set: any) => ({
    netTypes: [],
    netType: "",
    mnemonic: !storage.get(storage.keys.LOCAL_TEST_MNEMONIC) ? storage.CONSTANTS.DEFAULT_MNEMONIC : storage.get(storage.keys.LOCAL_TEST_MNEMONIC),
    path: "",
    errorMnemonic: false,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    message: "",
    signature: "",
    transaction: "",
    jsonTransaction: "",
    rawTransaction: "",
    payload: "",
    msgSignature: "",
    setNetType: (netType: string) => set({ netType: netType }),
    setMnemonic: (mnemonic: string) => set({ mnemonic: mnemonic }),
    setErrorMnemonic: (error: boolean) => set({ error: error }),
    setErrorText: (errorMsg: string) => set({ errorMsg: errorMsg }),
    setPath: (path: string) => set({ path: path }),
    setPublicKey: (publicKey: string) => set({ publicKey: publicKey }),
    setPrivateKey: (privateKey: string) => set({ privateKey: privateKey }),
    setAddress: (address: string) => set({ address: address }),
    setMessage: (message: string) => set({ message: message }),
    setSignature: (signature: string) => set({ signature: signature }),
    setTransaction: (transaction: string) => set({ transaction: transaction }),
    setPayload: (payload: string) => set({ payload: payload }),
    setJsonTransaction: (jsonTransaction: string) => set({ jsonTransaction: jsonTransaction }),
    setRawTransaction: (rawTransaction: string) => set({ rawTransaction: rawTransaction }),
    setMsgSignature: (msgSignature: string) => set({ msgSignature: msgSignature }),
    handleChange: (event: any) => { },
    handleClear: (event: any) => { },
    random: (len: number = 32) => {
        return randomString(len).toUpperCase()
    },
    publicKeyCompress(publicKey: string) {
        return publicKeyConvert(publicKey, true);
    }
});
export {
    MainStore
};
