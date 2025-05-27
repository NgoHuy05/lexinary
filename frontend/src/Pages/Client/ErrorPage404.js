import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <>
            <h1 style={{ marginTop: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}> 404 NOT FOUND </h1>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn đang tìm không tồn tại."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Quay về trang chủ
                    </Button>
                }
            />
        </>
    );
}

export default ErrorPage;
