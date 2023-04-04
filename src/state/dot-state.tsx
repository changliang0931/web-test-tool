import create from "zustand";
import { Polkadot, POLKADOT_DEFAULT_PATH, validateMnemonic } from "wallet-web-lib";
import { MainState, MainStore } from '../state/main-state';
interface DotState extends MainState {
    // 'ed25519' | 'sr25519' | 'ecdsa' | 'ethereum';
    keypairTypes: Array<string>;
    keypairType: string;
    // expiration: string;
    // refBlockNum: number;
    // refBlockPrefix: number;
    // maxNetUsageWords: number;
    // maxCpuUsageMs: number;
    // delaySec: number;
    // contextFreeActions: Action[];
    // contextFreeData?: Uint8Array[];
    // actions: Action[];
    // errorActions: boolean;
    // transactionExtensions?: [number, string][];
    messageHash: string;
    setKeypairType: (keypairType: string) => void;
    // setExpiration: (expiration: string) => void;
    // setRefBlockNum: (refBlockNum: number) => void;
    // setRefBlockPrefix: (refBlockPrefix: number) => void;
    // setMaxNetUsageWords: (maxNetUsageWords: number) => void;
    // setMaxCpuUsageMs: (maxCpuUsageMs: number) => void;
    // setDelaySec: (delaySec: number) => void;
    // setContextFreeActions: (contextFreeActions: Array<any>) => void;
    // setContextFreeData: (contextFreeData: Uint8Array[]) => void;
    // setActions: (actions: Action[]) => void;
    // setErrorActions: (error: boolean) => void;
    // setTransactionExtensions: (transactionExtensions: [number, string][]) => void;
}
const useStore = create<DotState>((set: any, get: any) => ({
    ...MainStore(set),
    keypairTypes: ['ed25519', 'sr25519', 'ecdsa'],
    keypairType: "ed25519",
    path: POLKADOT_DEFAULT_PATH,
    messageHash: "",
    // expiration: "2020-08-06T09:50:56",
    // refBlockNum: 13949,
    // refBlockPrefix: 241701672,
    // maxNetUsageWords: 0,
    // maxCpuUsageMs: 0,
    // delaySec: 0,
    // contextFreeActions: [],
    // contextFreeData: [],
    // actions: [{"account":"eosio.token","name":"transfer","authorization":[{"actor":"zijunzimo555","permission":"active"}],"data":{"from":"zijunzimo555","to":"jubitertest4","quantity":"50.0000 EOS","memo":"from jwallet_core"}}],
    // errorActions: false,
    // transactionExtensions: [],
    setKeypairType: (keypairType: string) => set({ keypairType: keypairType }),
    // setExpiration: (expiration: string) => set({ expiration: expiration }),
    // setRefBlockNum: (refBlockNum: number) => set({ refBlockNum: refBlockNum }),
    // setRefBlockPrefix: (refBlockPrefix: number) => set({ refBlockPrefix: refBlockPrefix }),
    // setMaxNetUsageWords: (maxNetUsageWords: number) => set({ maxNetUsageWords: maxNetUsageWords }),
    // setMaxCpuUsageMs: (maxCpuUsageMs: number) => set({ maxCpuUsageMs: maxCpuUsageMs }),
    // setDelaySec: (delaySec: number) => set({ delaySec: delaySec }),
    // setContextFreeActions: (contextFreeActions: Action[]) => set({ contextFreeActions: contextFreeActions }),
    // setContextFreeData: (contextFreeData: Uint8Array[]) => set({ contextFreeData: contextFreeData }),
    // setActions: (actions: Action[]) => set({ actions: actions }),
    // setErrorActions: (error: boolean) => set({ errorActions: error }),
    // setTransactionExtensions: (transactionExtensions: [number, string][]) => set({ transactionExtensions: transactionExtensions }),
    signTx: async () => {
        // const { setErrorText, setSignature, mnemonic, path, 
        //     // expiration, refBlockNum, refBlockPrefix, maxNetUsageWords, maxCpuUsageMs, delaySec, actions, contextFreeActions, contextFreeData, transactionExtensions 
        // } = get()
        // const account = new Tron(mnemonic, path);
        // // let transaction: ApiInterfaces.Transaction = {
        // //     expiration: expiration,
        // //     ref_block_num: refBlockNum,
        // //     ref_block_prefix: refBlockPrefix,
        // //     max_net_usage_words: maxNetUsageWords || 0,
        // //     max_cpu_usage_ms: maxCpuUsageMs || 0,
        // //     delay_sec: delaySec || 0,
        // //     actions: actions,
        // // }
        // setSignature("")
        // const { signatures } = await account.signTransaction(transaction);
        // setSignature(signatures)
        // setErrorText("");
    },
    signMessage: () => {
        const { mnemonic, path, keypairType, setErrorText, message, setSignature } = get()
        try {
            const account = new Polkadot(mnemonic, path, keypairType);
            const signature = account.signMessage(message);
            setSignature(signature);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
        }
    },
    obtainAccount: () => {
        const { mnemonic, path, setErrorMnemonic, keypairType, setErrorText, setPublicKey, setAddress, setPrivateKey } = get()
        try {
            if (!validateMnemonic(mnemonic)) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account = new Polkadot(mnemonic, path, keypairType);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    }, handleChange: (event: any) => {
        const { setAddress, setErrorMnemonic, setMnemonic, setPath, setPublicKey, setErrorText, setKeypairType, setMessage, setSignature
            // setExpiration, setRefBlockNum, setRefBlockPrefix, setMaxNetUsageWords, setMaxCpuUsageMs, setDelaySec, setContextFreeActions, setContextFreeData, setActions, setErrorActions, setTransactionExtensions 
        } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "mnemonic") {
            setMnemonic(value);
        } else if (id === "path") {
            setPath(value.trim());
        } else if (id === "keypairType") {
            setKeypairType(value);
        } else if (id === "publicKey") {
            setPublicKey(value);
        } else if (id === "address") {
            setAddress(value);
        } else if (id === "message") {
            setMessage(value)
        } else if (id === "signature") {
            setSignature(value);
            // } else if (id === "refBlockNum") {
            //     setRefBlockNum(parseInt(value));
            // } else if (id === "refBlockPrefix") {
            //     setRefBlockPrefix(parseInt(value));
            // } else if (id === "maxNetUsageWords") {
            //     setMaxNetUsageWords(parseInt(value));
            // } else if (id === "maxCpuUsageMs") {
            //     setMaxCpuUsageMs(parseInt(value));
            // } else if (id === "delaySec") {
            //     setDelaySec(parseInt(value));
            // } else if (id === "actions") {
            //     try {
            //         if(value.trim() === "" ){
            //             setErrorActions(true);
            //             // setActions();
            //             setErrorText("Actions  invalid ")
            //             return
            //         }
            //         const actions = JSON.parse(value);
            //         setErrorActions(false);
            //         setActions(actions);
            //         setErrorText("")
            //     } catch (error:any) {
            //         setErrorActions(true);
            //         setErrorText("Actions  invalid "+ error.message)
            //     }
            // } else if (id === "transactionExtensions") {
            //     setTransactionExtensions(value);
            // } else if (id === "contextFreeActions") {
            //     setContextFreeActions(value);
            // } else if (id === "contextFreeData") {
            //     setContextFreeData(value);
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath, setKeypairType, setMessage
            // setExpiration, setRefBlockNum, setRefBlockPrefix, setMaxNetUsageWords, setMaxCpuUsageMs, setDelaySec, setContextFreeActions, setContextFreeData, setActions, setErrorActions, setTransactionExtensions 
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonic") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "messagec") {
            setMessage("")
            // } else if (id === "signature") {
            //     setSignature(value);
            // } else if (id === "refBlockNum") {
            //     setRefBlockNum(parseInt(value));
            // } else if (id === "refBlockPrefix") {
            //     setRefBlockPrefix(parseInt(value));
            // } else if (id === "maxNetUsageWords") {
            //     setMaxNetUsageWords(parseInt(value));
            // } else if (id === "maxCpuUsageMs") {
            //     setMaxCpuUsageMs(parseInt(value));
            // } else if (id === "delaySec") {
            //     setDelaySec(parseInt(value));
            // } else if (id === "actions") {
            //     try {
            //         if(value.trim() === "" ){
            //             setErrorActions(true);
            //             // setActions();
            //             setErrorText("Actions  invalid ")
            //             return
            //         }
            //         const actions = JSON.parse(value);
            //         setErrorActions(false);
            //         setActions(actions);
            //         setErrorText("")
            //     } catch (error:any) {
            //         setErrorActions(true);
            //         setErrorText("Actions  invalid "+ error.message)
            //     }
            // } else if (id === "transactionExtensions") {
            //     setTransactionExtensions(value);
            // } else if (id === "contextFreeActions") {
            //     setContextFreeActions(value);
            // } else if (id === "contextFreeData") {
            //     setContextFreeData(value);
        }
    },
}));
export default useStore;