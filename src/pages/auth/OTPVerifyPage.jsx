import FormField from "@components/FormField";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const activationToken = useSelector((state) => state.auth.activationToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [verifyOTP, { data, isLoading, isError, error, isSuccess }] =
    useVerifyOTPMutation();

  const onSubmit = (formData) => {
    console.log(formData);
    verifyOTP({ activationToken: activationToken, otp: Number(formData.otp) });
  };
  function onChange(value) {
    console.log("Captcha value:", value);
    setShow(true);
  }
  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      navigate("/login");
    }
  }, [isError, error, dispatch, data, isSuccess, navigate, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="otp"
          label="Type your 6 digit security code"
          control={control}
          Component={OTPInput}
        />
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onChange}
        />
        {show && (
          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size="16px" className="mr-1" />}
            Verify my account
          </Button>
        )}
      </form>
      <p className="mt-4">
        Didn&apos;t get the code? <Link to="/login">Resend</Link>
      </p>
    </div>
  );
};
export default OTPVerifyPage;
