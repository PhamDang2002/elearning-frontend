import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  return (
    <div className="!mt-28">
      Đã hủy thanh toán 231
      <Button onClick={() => navigate("/")}>Quay trở về trang chủ</Button>
    </div>
  );
};
export default Cancel;
