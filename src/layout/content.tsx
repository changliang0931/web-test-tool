
import Aptos from "../pages/Aptos"
import Ethereum from "../pages/Ethereum"
import Main from "../pages/Home"
import Eos from "../pages/Eos"
import Tron from "../pages/Tron"
import Dot from "../pages/Dot"
import Crypto from "../pages/crypto"
import Xrp from "../pages/Xrp"
import Fil from "../pages/Fil"
import { Route, Routes } from "react-router-dom"
const Content = () => {
    return (
        <Routes>
            <Route key="home" path="/" element={<Main />} />
            <Route key="aptos" path="aptos" element={<Aptos />} />
            <Route key="ethereum" path="ethereum" element={<Ethereum />} />
            <Route key="eos" path="eos" element={<Eos />} />
            <Route key="fil" path="fil" element={<Fil />} />
            <Route key="tron" path="tron" element={<Tron />} />
            <Route key="polkadot" path="polkadot" element={<Dot />} />
            <Route key="xrp" path="xrp" element={<Xrp />} />
            <Route key="crypto" path="crypto" element={<Crypto />} />
            
        </Routes>
    )
}
export default Content;