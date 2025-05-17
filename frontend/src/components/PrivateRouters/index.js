import { Navigate, Outlet } from "react-router-dom";

function PrivateRouters() {
    const isLogin = true;
    
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouters;
