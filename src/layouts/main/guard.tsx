import React, { useEffect, ComponentType } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../auth/store/service";
import { privateAxios } from "@utils/axios/private";
import { RootState } from "@/shared/store";
interface Props {
  // Add any specific props that the wrapped component may receive
}

const Guard = <P extends Props>(Component: ComponentType<P>) => {
  const Auth: React.FC<P> = (props) => {
    const nav = useNavigate();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const getUserData = async () => {
      try {
        const res = await privateAxios.get("/auth/me");

        dispatch(setUserData(res.data));
      } catch (err: unknown | AxiosError) {
        if (isAxiosError(err)) {
        }
      }
    };

    useEffect(() => {
      if (!isLoggedIn) {
        nav("/auth");
      } else {
        getUserData();
      }
    }, [isLoggedIn]);

    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading
        </div>
      );
    }
  };

  return Auth;
};

export default Guard;
