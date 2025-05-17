import { useRoutes } from "react-router-dom";
import { routers } from "../../routers";
function AllRouters() {
    const elements = useRoutes(routers);
    return (
        <>
        {elements}
        </>
    )
}

export default AllRouters;