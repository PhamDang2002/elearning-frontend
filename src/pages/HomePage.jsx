import Testimonials from "@components/testimonials/Testimonials";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f5f5f5] py-[100px] text-center">
      <div className="m-0 mx-auto max-w-3xl">
        <div className="">
          <h1 className="text-4xl font-bold">
            Welcome to our E-learning Platform
          </h1>
          <p className="my-5 text-xl text-[#666]">Learn, Grow, Excel</p>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/courses")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}

export default HomePage;
