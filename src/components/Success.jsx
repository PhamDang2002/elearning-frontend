import { Button } from "@mui/material";
import { useCourseCheckoutMutation } from "@services/rootApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const param = useLocation();
  const [checkout, { data }] = useCourseCheckoutMutation();
  const [code, setCode] = useState();
  // const [id, setId] = useState();
  const id = useSelector((store) => store.auth.getCourse);
  console.log(param);
  const navigate = useNavigate();
  const handleNavigateAndRefresh = () => {
    navigate("/courses"); // Điều hướng đến /courses
    window.location.reload(); // Refresh trang sau khi điều hướng
  };
  // Extract query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(param.search);
    const codeParam = queryParams.get("code");
    setCode(codeParam);

    // setId(idParam);
    if (code === "00" && id) {
      // If the condition is met, trigger the subscription with the provided id
      checkout(id);
    }
    console.log(code, id);
  }, [param.search, code, id, checkout, data]);
  console.log(code, id);
  // Check if the code is '00' and if there's an 'id'

  return (
    <div>
      Success
      <Button onClick={handleNavigateAndRefresh}>Quay trở lại khóa học</Button>
    </div>
  );
};

export default Success;
