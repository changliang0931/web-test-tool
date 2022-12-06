
import Aptos from "../pages/Aptos"
import Ethereum from "../pages/Ethereum"
import Main from "../pages/Home"
import { Route, Routes } from "react-router-dom"
const Content = () => {
    return (
        <Routes>
            <Route key="home" path="/" element={<Main />} />
            <Route key="aptos" path="aptos" element={<Aptos />} />
            <Route key="ethereum" path="ethereum" element={<Ethereum />} />
        </Routes>
    )
}
export default Content;