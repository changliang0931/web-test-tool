import { randomString } from "wallet-web-lib"
import storage from './storage';
export interface MainState {
    mnemonic: string;
    path: string;

    publicKey: string;
    privateKey: string;
    address: string;

    message: string;
    signature: string;
    msgSignature: string;
    errorMnemonic: boolean;
    errorText: string;
    setMnemonic: (mnemonic: string) => void;
    setPath: (path: string) => void;

    setErrorMnemonic: (error: boolean) => void;
    setErrorText: (errorMsg: string) => void;

    setPublicKey: (publicKey: string) => void;
    setPrivateKey: (privateKey: string) => void;
    setAddress: (address: string) => void;

    setMessage: (message: string) => void;
    setSignature: (signature: string) => void;
    setMsgSignature: (msgSignature: string) => void;

    handleChange?: (event: any) => void;
    handleClear?: (event: any) => void;
    random: (len?: number) => string;

    obtainAccount?: () => void;
    signTx?: () => void;
    signMessage?: () => void;
}
const MainStore = (set: any) => ({
    mnemonic: !storage.get(storage.keys.LOCAL_TEST_MNEMONIC) ? storage.CONSTANTS.DEFAULT_MNEMONIC : storage.get(storage.keys.LOCAL_TEST_MNEMONIC),
    path: "",
    errorMnemonic: false,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    message: "",
    signature: "",
    msgSignature: "",
    setMnemonic: (mnemonic: string) => set({ mnemonic: mnemonic }),
    setErrorMnemonic: (error: boolean) => set({ error: error }),
    setErrorText: (errorMsg: string) => set({ errorMsg: errorMsg }),
    setPath: (path: string) => set({ path: path }),
    setPublicKey: (publicKey: string) => set({ publicKey: publicKey }),
    setPrivateKey: (privateKey: string) => set({ privateKey: privateKey }),
    setAddress: (address: string) => set({ address: address }),
    setMessage: (message: string) => set({ message: message }),
    setSignature: (signature: string) => set({ signature: signature }),
    setMsgSignature: (msgSignature: string) => set({ msgSignature: msgSignature }),
    handleChange: (event: any) => { },
    handleClear: (event: any) => { },
    random: (len: number = 32) => {
        return randomString(len).toUpperCase()
    },
});
export {
    MainStore
};
