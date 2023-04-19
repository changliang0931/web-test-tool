import create from "zustand";
import { Xrp, XRP_DEFAULT_PATH, validateMnemonic, XRP_TRANSACTION_TYPE } from "wallet-web-lib";
import { MainState, MainStore } from './main-state';
interface XrpState extends MainState {
    transactionTypes: string[];
    transactionType: string;
    setTransactionType: (transactionType: string) => void;

}
const useStore = create<XrpState>((set: any, get: any) => ({
    ...MainStore(set),
    transactionTypes: Object.keys(XRP_TRANSACTION_TYPE),
    transactionType: XRP_TRANSACTION_TYPE.Payment,
    path: XRP_DEFAULT_PATH,
    jsonTransaction: '{"TransactionType":"Payment","Account":"rhP2Fs6XobyXGGUwJYagkZ5AV5gEaqzwZv","Destination":"ra5nK24KXen9AHvsdFTKHSANinZseWnPcX","Amount":{"currency":"USD","value":"1","issuer":"rhP2Fs6XobyXGGUwJYagkZ5AV5gEaqzwZv"},"Fee":"12","Flags":2147483648,"Sequence":2}',
    transaction: '{"TransactionType":"Payment","Account":"rhP2Fs6XobyXGGUwJYagkZ5AV5gEaqzwZv","Destination":"ra5nK24KXen9AHvsdFTKHSANinZseWnPcX","Amount":{"currency":"USD","value":"1","issuer":"rhP2Fs6XobyXGGUwJYagkZ5AV5gEaqzwZv"},"Fee":"12","Flags":2147483648,"Sequence":2}',
    setTransactionType: (transactionType: string) => set({ transactionType: transactionType }),
    signTx: async () => {
        const { setErrorText, setSignature, mnemonic, path, transaction, setErrorMnemonic } = get()
        const account = new Xrp(mnemonic, path);
        if (!validateMnemonic(mnemonic)) {
            setErrorText("Mnemonic invalid ")
            setErrorMnemonic(true)
            return;
        }
        if (transaction.trim() === "") {
            return;
        }
        let txObj;
        try {
            txObj = JSON.parse(transaction);
        } catch (error) {
            return;
        }
        setSignature("");
        let signature = await account.signTransaction(txObj);
        setSignature(JSON.stringify(signature));
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
            const account = new Xrp(mnemonic, path);
            setPublicKey(account.publicKey);
            setPrivateKey(account.privateKey);
            setAddress(account.address);
        } catch (err: any) {
            setErrorText("Mnemonic with less than 12 words have low entropy and may be guessed by an attacker. ")
            setErrorMnemonic(true)
        }
    },
    handleChange: (event: any) => {
        const { address, setAddress, setMnemonic, setPath, setPublicKey, setPrivatKey, setSignature, setTransactionType, setTransaction, setJsonTransaction, getDemoJsonTx
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
        } else if (id === "signature") {
            setSignature(value);
        } else if (id === "transactionType") {
            setTransactionType(value);
            let jsTx = getDemoJsonTx(value, address);
            setJsonTransaction(jsTx);
            setSignature("");
        } else if (id === "transaction") {
            setTransaction(value);
        }
    },
    handleClear: (event: any) => {
        const { setMnemonic, setPath, setTransaction
        } = get()
        let id = event.currentTarget.id;
        if (id === "mnemonicc") {
            setMnemonic("");
        } else if (id === "pathc") {
            setPath("");
        } else if (id === "transactionc") {
            setTransaction("")
        }
    },
    getDemoJsonTx(transactionType: string, account: string): string {
        let jsonTx: string = "";
        switch (transactionType) {
            case "Payment":
                jsonTx = '{"TransactionType":"Payment","Account":"' + account + '","Destination":"ra5nK24KXen9AHvsdFTKHSANinZseWnPcX","Amount":{"currency":"USD","value":"1","issuer":"' + account + '"},"Fee":"12","Flags":2147483648,"Sequence":2}';
                break;
            case "OfferCreate":
                jsonTx = '{"TransactionType":"OfferCreate","Account":"' + account + '","Fee":"12","Flags":0,"LastLedgerSequence":7108682,"Sequence":8,"TakerGets":"6000000","TakerPays":{"currency":"GKO","issuer":"ruazs5h1qEsqpke88pcqnaseXdm6od2xc","value":"2"}}';
                break;
            case "OfferCancel":
                jsonTx = '{"TransactionType":"OfferCancel","Account":"' + account + '","Fee":"12","Flags":0,"LastLedgerSequence":7108629,"OfferSequence":6,"Sequence":7}';
                break;
            case "TrustSet":
                jsonTx = '{"TransactionType":"TrustSet","Account":"' + account + '","Fee":"12","Flags":262144,"LastLedgerSequence":8007750,"LimitAmount":{"currency":"USD","issuer":"rsP3mgGb2tcYUrxiLFiHJiQXhsziegtwBc","value":"100"},"Sequence":12}';
                break;
            case "AccountSet":
                jsonTx = '{"TransactionType":"AccountSet","Account":"' + account + '","Fee":"12","Sequence":5,"Domain":"6578616D706C652E636F6D","SetFlag":5,"MessageKey":"03AB40A0490F9B7ED8DF29D246BF2D6269820A0EE7742ACDD457BEA7C7D0931EDB"}';
                break;
            case "AccountDelete":
                jsonTx = '{"TransactionType":"AccountDelete","Account":"' + account + '","Destination":"rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe","DestinationTag":13,"Fee":"2000000","Sequence":2470665,"Flags":2147483648}';
                break;
            case "SetRegularKey":
                jsonTx = '{"Flags":0,"TransactionType":"SetRegularKey","Account":"' + account + '","Fee":"12","RegularKey":"rAR8rR8sUkBoCZFawhkWzY4Y5YoyuznwD"}';
                break;
            case "SignerListSet":
                jsonTx = '{"Flags":0,"TransactionType":"SignerListSet","Account":"' + account + '","Fee":"12","SignerQuorum":3,"SignerEntries":[{"SignerEntry":{"Account":"rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW","SignerWeight":2}},{"SignerEntry":{"Account":"rUpy3eEg8rqjqfUoLeBnZkscbKbFsKXC3v","SignerWeight":1}},{"SignerEntry":{"Account":"raKEEVSGnKSD9Zyvxu4z6Pqpm4ABH8FS6n","SignerWeight":1}}]}';
                break;
            case "EscrowCreate":
                jsonTx = '{"TransactionType":"EscrowCreate","Account":"' + account + '","Amount":"10000","Destination":"rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW","CancelAfter":533257958,"FinishAfter":533171558,"Condition":"A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100","DestinationTag":23480,"SourceTag":11747}';
                break;
            case "EscrowFinish":
                jsonTx = '{"TransactionType":"EscrowFinish","Account":"' + account + '","Owner":"rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn","OfferSequence":7,"Condition":"A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100","Fulfillment":"A0028000"}';
                break;
            case "EscrowCancel":
                jsonTx = '{"TransactionType":"EscrowCancel","Account":"' + account + '","Owner":"rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn","OfferSequence":7}';
                break;
            case "PaymentChannelCreate":
                jsonTx = '{"TransactionType":"PaymentChannelCreate","Account":"' + account + '","Amount":"10000","Destination":"rsA2LpzuawewSBQXkiju3YQTMzW13pAAdW","SettleDelay":86400,"PublicKey":"32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A","CancelAfter":533171558,"DestinationTag":23480,"SourceTag":11747}';
                break;
            case "PaymentChannelFund":
                jsonTx = '{"TransactionType":"PaymentChannelFund","Account":"' + account + '","Channel":"C1AE6DDDEEC05CF2978C0BAD6FE302948E9533691DC749DCDD3B9E5992CA6198","Amount":"200000","Expiration":543171558}';
                break;
            case "PaymentChannelClaim":
                jsonTx = '{"Channel":"C1AE6DDDEEC05CF2978C0BAD6FE302948E9533691DC749DCDD3B9E5992CA6198","Balance":"1000000","Amount":"1000000","Signature":"30440220718D264EF05CAED7C781FF6DE298DCAC68D002562C9BF3A07C1E721B420C0DAB02203A5A4779EF4D2CCC7BC3EF886676D803A9981B928D3B8ACA483B80ECA3CD7B9B","PublicKey":"32D2471DB72B27E3310F355BB33E339BF26F8392D5A93D3BC0FC3B566612DA0F0A"}';
                break;
            case "DepositPreauth":
                jsonTx = '{"TransactionType":"DepositPreauth","Account":"' + account + '","Authorize":"rEhxGqkqPPSxQ3P25J66ft5TwpzV14k2de","Fee":"10","Flags":2147483648,"Sequence":2}';
                break;
        }
        return jsonTx;
    }
}));
export default useStore;