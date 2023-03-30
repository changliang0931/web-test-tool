import create from "zustand";
import { Schnorr, Ecdsa, Ed25519, randomString } from "wallet-web-lib"
interface CryptoState {
    cryptoTypes: string[];
    cryptoType: string;
    publicKey: string;
    privateKey: string;
    signature: string;
    message: string;
    messageHash: string;
    setPublicKey: (pubKey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setCryptoType: (cryptoType: string) => void;
    setMessage: (message: string) => void;
    setMessageHash: (messageHash: string) => void;
    setSignature: (signature: string) => void;
    signMessage: () => void;
    random: () => void;
    handleChange: (event: any) => void;
}
const useStore = create<CryptoState>((set, get) => ({
    cryptoTypes: ["Schnorr", "Ecdsa", "Ed25519"],
    cryptoType: "Schnorr",
    publicKey: "03D534107F17143FD2D03476377A80A81FA9435D418D7CD0792E7547271F25D86F",
    privateKey: "4B3867D80E66A985176A4942B98D523F0E1E7DFF8203A8DB85385636090EC67F",
    signature: "",
    message: "243F6A8885A308D313198A2E03707344A4093822299F31D0082EFA98EC4E6C89",
    messageHash: "",
    setPublicKey: (pubKey: string) => set({ publicKey: pubKey }),
    setPrivateKey: (priKey: string) => set({ privateKey: priKey }),
    setCryptoType: (cryptoType: string) => set({ cryptoType: cryptoType }),
    setSignature: (signature: string) => set({ signature: signature }),
    setMessage: (message: string) => set({ message: message }),
    setMessageHash: (messageHash: string) => set({ messageHash: messageHash }),
    random: () => {
        const { setMessage } = get()
        setMessage(randomString(32).toUpperCase());
    },
    signMessage: async () => {
        const { setSignature, message, privateKey, cryptoType, setMessageHash } = get()
        setSignature("")
        setMessageHash("");
        let signature: string = "";
        if (cryptoType === "Schnorr") {
            const schoor = new Schnorr();
            signature = schoor.sign(privateKey, message);
        } else if (cryptoType === "Ecdsa") {
            const ecdsa = new Ecdsa();
            signature = ecdsa.sign(privateKey, message);
        } else if (cryptoType === "Ed25519") {
            const ed25519 = new Ed25519();
            signature = ed25519.sign(privateKey, message);
        }
        setSignature(signature.startsWith("0x") ? signature : ("0x" + signature));
    },
    handleChange: (event: any) => {
        const { setMessage, setPrivateKey, setCryptoType } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "message") {
            value = value.trim()
            setMessage(value);
        } else if (id === "privateKey") {
            value = value.trim()
            setPrivateKey(value);
        } else if (id === "cryptoType") {
            value = value.trim()
            setCryptoType(value);
        }
    }
}));
export default useStore;