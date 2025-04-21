import Header from "@components/Header";
import Loading from "@components/Loading";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const activationToken = useSelector((state) => state.auth.token);
  const response = useGetAuthUserQuery(activationToken);

  const dispatch = useDispatch();

  // endpoint name + params

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, response.data, dispatch]);

  if (response.isLoading) {
    return <Loading />;
  }

  /*
  isLoading: no chi set thanh true o lan query dau tien
  isFetching: no chi set thanh true o lan query dau tien va khi API duoc refetch
  */

  // if (!response?.data?.user?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Header response={response} />
      <Outlet response={response} />
    </div>
  );
};
export default ProtectedLayout;
