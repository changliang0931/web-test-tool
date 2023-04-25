import create from "zustand";
import { Eos, BigNumber, EOS_CHAIN_ID, EOS_DEFAULT_PATH, validateMnemonic, ApiInterfaces, Action, uint8ArrayTohex } from "wallet-web-lib"
import { MainState, MainStore } from '../state/main-state';
interface EosState extends MainState {
    chainIds: Array<string>;

    chainId: string;
    expiration: string;
    refBlockNum: string;
    refBlockPrefix: string;
    maxNetUsageWords: string;
    maxCpuUsageMs: string;
    delaySec: string;
    contextFreeActions: Action[];
    contextFreeData?: Uint8Array[];
    actions: string;
    errorActions: boolean;
    transactionExtensions?: [number, string][];
    setChainId: (chainId: string) => void;
    setExpiration: (expiration: string) => void;
    setRefBlockNum: (refBlockNum: string) => void;
    setRefBlockPrefix: (refBlockPrefix: string) => void;
    setMaxNetUsageWords: (maxNetUsageWords: string) => void;
    setMaxCpuUsageMs: (maxCpuUsageMs: string) => void;
    setDelaySec: (delaySec: string) => void;
    setContextFreeActions: (contextFreeActions: Array<any>) => void;
    setContextFreeData: (contextFreeData: Uint8Array[]) => void;
    setActions: (actions: string) => void;
    setErrorActions: (error: boolean) => void;
    setTransactionExtensions: (transactionExtensions: [number, string][]) => void;
}
const useStore = create<EosState>((set, get) => ({
    ...MainStore(set),
    chainIds: ["aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"],
    path: EOS_DEFAULT_PATH,
    chainId: EOS_CHAIN_ID.mainnet,
    expiration: "2020-08-06T09:50:56",
    refBlockNum: "13949",
    refBlockPrefix: "241701672",
    maxNetUsageWords: "0",
    maxCpuUsageMs: "0",
    delaySec: "0",
    contextFreeActions: [],
    contextFreeData: [],
    actions: `[{ "account": "eosio.token", "name": "transfer", "authorization": [{ "actor": "zijunzimo555", "permission": "active" }], "data": { "from": "zijunzimo555", "to": "jubitertest4", "quantity": "50.0000 EOS", "memo": "from jwallet_core" } }]`,
    errorActions: false,
    transactionExtensions: [],
    setChainId: (chainId: string) => set({ chainId: chainId }),
    setExpiration: (expiration: string) => set({ expiration: expiration }),
    setRefBlockNum: (refBlockNum: string) => set({ refBlockNum: refBlockNum }),
    setRefBlockPrefix: (refBlockPrefix: string) => set({ refBlockPrefix: refBlockPrefix }),
    setMaxNetUsageWords: (maxNetUsageWords: string) => set({ maxNetUsageWords: maxNetUsageWords }),
    setMaxCpuUsageMs: (maxCpuUsageMs: string) => set({ maxCpuUsageMs: maxCpuUsageMs }),
    setDelaySec: (delaySec: string) => set({ delaySec: delaySec }),
    setContextFreeActions: (contextFreeActions: Action[]) => set({ contextFreeActions: contextFreeActions }),
    setContextFreeData: (contextFreeData: Uint8Array[]) => set({ contextFreeData: contextFreeData }),
    setActions: (actions: string) => set({ actions: actions }),
    setErrorActions: (error: boolean) => set({ errorActions: error }),
    setTransactionExtensions: (transactionExtensions: [number, string][]) => set({ transactionExtensions: transactionExtensions }),
    signTx: async () => {
        const { setErrorText, setSignature, setErrorMnemonic, setErrorActions, setActions, mnemonic, path, expiration, refBlockNum, refBlockPrefix, maxNetUsageWords, maxCpuUsageMs, delaySec, actions, setRawTransaction,
            // contextFreeActions, contextFreeData, transactionExtensions
        } = get()
        if (!validateMnemonic(mnemonic)) {
            setErrorText("Mnemonic invalid ")
            setErrorMnemonic(true)
            return
        }
        if (actions.trim() === "") {
            setErrorActions(true);
            setActions("");
            setErrorText("Actions  invalid ")
            return
        }
        try {
            JSON.parse(actions);
        } catch (error: any) {
            setErrorActions(true);
            setErrorText("Actions  invalid " + error.message)
            return;
        }
        const account = new Eos(mnemonic, path);
        let transaction: ApiInterfaces.Transaction = {
            expiration: expiration,
            ref_block_num: BigNumber.from(refBlockNum).toNumber(),
            ref_block_prefix: BigNumber.from(refBlockPrefix).toNumber(),
            max_net_usage_words: BigNumber.from(maxNetUsageWords).toNumber() || 0,
            max_cpu_usage_ms: BigNumber.from(maxCpuUsageMs).toNumber() || 0,
            delay_sec: BigNumber.from(delaySec).toNumber() || 0,
            actions: JSON.parse(actions),
            // context_free_actions: contextFreeData, 
            // transaction_extensions: transactionExtensions || []
        }
        setSignature("");
        setRawTransaction("");
        const { signatures, serializedTransaction } = await account.signTransaction(transaction);
        setRawTransaction(uint8ArrayTohex(serializedTransaction));
        setSignature(signatures)
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
            const account: Eos = new Eos(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address!);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { setAddress, setMnemonic, setChainId, setPath, setPrivateKey, setPublicKey, setExpiration, setRefBlockNum, setRefBlockPrefix, setMaxNetUsageWords, setMaxCpuUsageMs, setDelaySec, setContextFreeActions, setContextFreeData, setActions, setTransactionExtensions } = get()
        let value = event.target.value;
        let id = event.target.id || event.target.name;
        if (id === "mnemonic") {
            setMnemonic(value);
        } else if (id === "path") {
            setPath(value.trim());
        } else if (id === "privateKey") {
            setPrivateKey(value);
        } else if (id === "publicKey") {
            setPublicKey(value);
        } else if (id === "address") {
            setAddress(value);
        } else if (id === "chainId") {
            setChainId(value)
        } else if (id === "expiration") {
            setExpiration(value);
        } else if (id === "refBlockNum") {
            setRefBlockNum(value);
        } else if (id === "refBlockPrefix") {
            setRefBlockPrefix(value);
        } else if (id === "maxNetUsageWords") {
            setMaxNetUsageWords(value);
        } else if (id === "maxCpuUsageMs") {
            setMaxCpuUsageMs(value);
        } else if (id === "delaySec") {
            setDelaySec(value);
        } else if (id === "actions") {
            setActions(value);
        } else if (id === "transactionExtensions") {
            setTransactionExtensions(value);
        } else if (id === "contextFreeActions") {
            setContextFreeActions(value);
        } else if (id === "contextFreeData") {
            setContextFreeData(value);
        }
    }, handleClear: (event: any) => {
        const { setMnemonic, setChainId, setPath, setExpiration, setRefBlockNum, setRefBlockPrefix, setMaxNetUsageWords, setMaxCpuUsageMs, setDelaySec, setActions,
            // setTransactionExtensions, setContextFreeActions, setContextFreeData,
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "chainIdc") {
            setChainId("")
        } else if (id === "expirationc") {
            setExpiration("")
        } else if (id === "refBlockNumc") {
            setRefBlockNum("");
        } else if (id === "refBlockPrefixc") {
            setRefBlockPrefix("");
        } else if (id === "maxNetUsageWordsc") {
            setMaxNetUsageWords("");
        } else if (id === "maxCpuUsageMsc") {
            setMaxCpuUsageMs("");
        } else if (id === "delaySecc") {
            setDelaySec("");
        } else if (id === "actionsc") {
            setActions("");
        }
        // else if (id === "transactionExtensionsc") {
        //     setTransactionExtensions("");
        // } else if (id === "contextFreeActionsc") {
        //     setContextFreeActions("");
        // } else if (id === "contextFreeDatac") {
        //     setContextFreeData("");
        // }
    }
}));
export default useStore;