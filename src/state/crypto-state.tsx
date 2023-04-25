import create from "zustand";
import { Schnorr, Ecdsa, Ed25519, validateMnemonic, Bip32, ETHEREUM_DEFAULT_PATH } from "wallet-web-lib"
import { MainState, MainStore } from '../state/main-state';
interface CryptoState extends MainState {
    cryptoTypes: string[];
    cryptoType: string;
    auxRand: string;
    setAuxRand: (auxRand: string) => void;
    setCryptoType: (cryptoType: string) => void;
}
const useStore = create<CryptoState>((set, get) => ({
    ...MainStore(set),
    cryptoTypes: ["Schnorr", "Ecdsa", "Ed25519"],
    cryptoType: "Schnorr",
    path: ETHEREUM_DEFAULT_PATH,
    auxRand: "C87AA53824B4D7AE2EB035A2B5BBBCCC080E76CDC6D1692C4B0B62D798E6D906",
    signature: "",
    message: "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
    setAuxRand: (auxRand: string) => set({ auxRand: auxRand }),
    setCryptoType: (cryptoType: string) => set({ cryptoType: cryptoType }),
    signMessage: async () => {
        const { setSignature, message, privateKey, auxRand, cryptoType } = get()
        setSignature("")
        let signature: string = "";
        if (!message || !privateKey) {
            return;
        }
        if (cryptoType === "Schnorr") {
            const schoor = new Schnorr();
            signature = schoor.sign(privateKey, message, auxRand);
        } else if (cryptoType === "Ecdsa") {
            const ecdsa = new Ecdsa();
            signature = ecdsa.sign(privateKey, message);
        } else if (cryptoType === "Ed25519") {
            const ed25519 = new Ed25519();
            signature = ed25519.sign(privateKey, message);
        }
        setSignature(signature.startsWith("0x") ? signature : ("0x" + signature));
    },
    obtainAccount: () => {
        const { setErrorText, mnemonic, path, setErrorMnemonic, setPublicKey, setPrivateKey } = get()
        const isMn = validateMnemonic(mnemonic)
        try {
            if (!isMn) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const bip32 = new Bip32()
            const account = bip32.deriveFromMnemonicAndPath(mnemonic, path)
            setPublicKey(account.publicKey)
            setPrivateKey(account.privateKey)
            setErrorText("")
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { setMessage, setPrivateKey, setAuxRand, setCryptoType, setPath, setMnemonic } = get()
        let value = event.target.value.trim();
        let id = event.target.id || event.target.name;
        if (id === "message") {
            setMessage(value);
        } else if (id === "privateKey") {
            setPrivateKey(value);
        } else if (id === "auxRand") {
            setAuxRand(value);
        } else if (id === "cryptoType") {
            setCryptoType(value);
        } else if (id === "path") {
            value = value.trim()
            setPath(value);
        } else if (id === "mnemonic") {
            setMnemonic(event.target.value);
        }
    },
    handleClear: (event: any) => {
        const { setMessage, setPrivateKey, setAuxRand, setPath, setMnemonic } = get()
        let id = event.currentTarget.id;
        if (id === "messagec") {
            setMessage("");
        } else if (id === "privateKeyc") {
            setPrivateKey("");
        } else if (id === "auxRandc") {
            setAuxRand("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "mnemonicc") {
            setMnemonic("");
        }
    }
}));
export default useStore;