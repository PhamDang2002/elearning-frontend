import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { activationToken } from "@redux/slices/authSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { data = {}, isLoading, error, isError, isSuccess }] =
    useRegisterMutation();

  const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    register(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      dispatch(activationToken(data));
      navigate("/verify-otp");
    }
  }, [isSuccess, data.message, navigate, dispatch, data]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          label="Name"
          control={control}
          Component={TextInput}
          error={errors["name"]}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary-main">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
