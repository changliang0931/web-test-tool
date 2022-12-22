import create from "zustand";
import { Eos, EOS_CHAIN_ID, EOS_DEFAULT_PATH, generateMnemonic, validateMnemonic, ApiInterfaces, Action } from "wallet-web-lib"

interface EosState {
    chainIds: Array<string>;
    mnemonic: string;
    path: string;
    errorMnemonic: boolean;
    errorText: string;
    publicKey: string;
    privateKey: string;
    address: string;

    chainId: string;
    expiration: string;
    refBlockNum: number;
    refBlockPrefix: number;
    maxNetUsageWords: number;
    maxCpuUsageMs: number;
    delaySec: number;
    contextFreeActions: Action[];
    contextFreeData?: Uint8Array[];
    actions: Action[];
    errorActions: boolean;
    transactionExtensions?: [number, string][];
    signature: string;

    setMnemonic: (mnemonic: string) => void;
    setErrorMnemonic: (error: boolean) => void;
    setErrorText: (errorMsg: string) => void;

    setPath: (path: string) => void;
    setPublicKey: (pubkey: string) => void;
    setPrivateKey: (priKey: string) => void;
    setAddress: (address: string) => void;
    setChainId: (chainId: string) => void;
    setExpiration: (expiration: string) => void;
    setRefBlockNum: (refBlockNum: number) => void;
    setRefBlockPrefix: (refBlockPrefix: number) => void;
    setMaxNetUsageWords: (maxNetUsageWords: number) => void;
    setMaxCpuUsageMs: (maxCpuUsageMs: number) => void;
    setDelaySec: (delaySec: number) => void;
    setContextFreeActions: (contextFreeActions: Array<any>) => void;
    setContextFreeData: (contextFreeData: Uint8Array[]) => void;
    setActions: (actions: Action[]) => void;
    setErrorActions: (error: boolean) => void;
    setTransactionExtensions: (transactionExtensions: [number, string][]) => void;
    setSignature: (signature: string) => void;

    genMnemonic: () => void;
    obtainAccount: () => void;
    signTx: () => void;
    parseTx: () => void;
    handleChange: (event: any) => void;
}
const useStore = create<EosState>((set, get) => ({
    chainIds: ["aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"],
    mnemonic: "gauge hole clog property soccer idea cycle stadium utility slice hold chief",
    errorMnemonic: false,
    path: EOS_DEFAULT_PATH,
    errorText: "",
    publicKey: "",
    privateKey: "",
    address: "",
    chainId: EOS_CHAIN_ID.mainnet,
    expiration: "2020-08-06T09:50:56",
    refBlockNum: 13949,
    refBlockPrefix: 241701672,
    maxNetUsageWords: 0,
    maxCpuUsageMs: 0,
    delaySec: 0,
    contextFreeActions: [],
    contextFreeData: [],
    actions: [
        {
            "account": "eosio.token",
            "name": "transfer",
            "authorization": [
                {
                    "actor": "zijunzimo555",
                    "permission": "active"
                }
            ],
            "data": {
                "from": "zijunzimo555",
                "to": "jubitertest4",
                "quantity": "50.0000 EOS",
                "memo": "from jwallet_core"
            }
        }
    ],
    errorActions: false,
    transactionExtensions: [],
    signature: "",
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
    setPublicKey: (pubKey: string) => set({ publicKey: pubKey }),
    setPrivateKey: (priKey: string) => set({ privateKey: priKey }),
    setAddress: (address: string) => set({ address: address }),
    setChainId: (chainId: string) => set({ chainId: chainId }),
    setExpiration: (expiration: string) => set({ expiration: expiration }),
    setRefBlockNum: (refBlockNum: number) => set({ refBlockNum: refBlockNum }),
    setRefBlockPrefix: (refBlockPrefix: number) => set({ refBlockPrefix: refBlockPrefix }),
    setMaxNetUsageWords: (maxNetUsageWords: number) => set({ maxNetUsageWords: maxNetUsageWords }),
    setMaxCpuUsageMs: (maxCpuUsageMs: number) => set({ maxCpuUsageMs: maxCpuUsageMs }),
    setDelaySec: (delaySec: number) => set({ delaySec: delaySec }),
    setContextFreeActions: (contextFreeActions: Action[]) => set({ contextFreeActions: contextFreeActions }),
    setContextFreeData: (contextFreeData: Uint8Array[]) => set({ contextFreeData: contextFreeData }),
    setActions: (actions: Action[]) => set({ actions: actions }),
    setErrorActions: (error: boolean) => set({ errorActions: error }),
    setTransactionExtensions: (transactionExtensions: [number, string][]) => set({ transactionExtensions: transactionExtensions }),
    setSignature: (signature: string) => set({ signature: signature }),
    signTx: async () => {
        const { setErrorText, setSignature, mnemonic, path, expiration, refBlockNum, refBlockPrefix, maxNetUsageWords, maxCpuUsageMs, delaySec, actions, contextFreeActions, contextFreeData, transactionExtensions } = get()
        const account = new Eos(mnemonic, path);
        let transaction: ApiInterfaces.Transaction = {
            expiration: expiration,
            ref_block_num: refBlockNum,
            ref_block_prefix: refBlockPrefix,
            max_net_usage_words: maxNetUsageWords || 0,
            max_cpu_usage_ms: maxCpuUsageMs || 0,
            delay_sec: delaySec || 0,
            actions: actions,
            // context_free_actions: contextFreeData, 
            // transaction_extensions: transactionExtensions || []
        }
        setSignature("")
        const { signatures } = await account.signTransaction(transaction);
        setSignature(signatures)
        setErrorText("");
    },

    genMnemonic: () => {
        const { setMnemonic, setErrorMnemonic, setErrorText } = get()
        setMnemonic(generateMnemonic())
        setErrorMnemonic(false)
        setErrorText("")
    },
    obtainAccount: () => {
        const { mnemonic, path, setErrorMnemonic, setErrorText, setPublicKey, setAddress, setPrivateKey } = get()
        try {
            if (!validateMnemonic(mnemonic)) {
                setErrorText("Mnemonic invalid ")
                setErrorMnemonic(true)
                return
            }
            const account: Eos = new Eos(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    parseTx: () => {
    },
    handleChange: (event: any) => {
        const { setAddress, setErrorMnemonic, setMnemonic, setChainId, setPath, setPrivateKey, setPublicKey, setErrorText, setExpiration, setRefBlockNum, setRefBlockPrefix, setMaxNetUsageWords, setMaxCpuUsageMs, setDelaySec, setContextFreeActions, setContextFreeData, setActions, setErrorActions, setTransactionExtensions } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id == "mnemonic") {
            if (validateMnemonic(value)) {
                setErrorMnemonic(false)
                setErrorText("")
            }
            setMnemonic(value);
        } else if (id == "path") {
            setPath(value.trim());
        } else if (id == "privateKey") {
            setPrivateKey(value);
        } else if (id == "publicKey") {
            setPublicKey(value);
        } else if (id == "address") {
            setAddress(value);
        } else if (id == "chainId") {
            setChainId(value)
        } else if (id == "expiration") {
            setExpiration(value);
        } else if (id == "refBlockNum") {
            setRefBlockNum(value);
        } else if (id == "refBlockPrefix") {
            setRefBlockPrefix(value);
        } else if (id == "maxNetUsageWords") {
            setMaxNetUsageWords(value);
        } else if (id == "maxCpuUsageMs") {
            setMaxCpuUsageMs(value);
        } else if (id == "delaySec") {
            setDelaySec(value);
        } else if (id == "actions") {
            try {
                JSON.parse(value);
                setErrorActions(false);
                setActions(JSON.parse(value));
            } catch (error) {
                setErrorActions(true);
                setErrorText("Actions  invalid ")
            }
        } else if (id == "transactionExtensions") {
            setTransactionExtensions(value);
        } else if (id == "contextFreeActions") {
            setContextFreeActions(value);
        } else if (id == "contextFreeData") {
            setContextFreeData(value);
        }
    }
}));
export default useStore;