import { Text } from "@components/text";
import { Button, Flex, Form, Input } from "antd";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authenticate } from "../../store/service";
import { publicAxios } from "@utils/axios/public";
import { AxiosError, isAxiosError } from "axios";
import { _JWT } from "./models";
import { useToken } from "../../store/token";
import { useDispatch } from "react-redux";

import "./style.scss";

export function Signup() {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setToken } = useToken();

  type FormSchema = Yup.InferType<typeof formSchema>;

  //
  //
  //
  const formSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email address"
      )
      .max(50, "Email must be max 50 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be max 6 characters")
      .max(50, "Password must be max 50 characters"),
  });

  //
  //
  //
  const {
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  //
  //
  //
  useEffect(() => {
    let email = localStorage.getItem("user_email");
    if (email) {
      setValue("email", email, { shouldValidate: true, shouldDirty: true });
    }
  }, []);

  //
  //
  //
  const postSignin = async (data: FormSchema | any) => {
    if (pending) return;
    setPending(true);
    setError(null);

    try {
      const res = await publicAxios.post(`/auth/register`, data);
      localStorage.setItem("user_email", res.data.data.email);
      setPending(false);
      dispatch(authenticate());
      setToken({
        access: res.data.token,
      });
      navigate("/");
    } catch (err: unknown | AxiosError) {
      if (isAxiosError(err)) {
        setError(err?.response?.data?.detail);
        setPending(false);
      } else {
        throw err;
      }
    }
  };
  //

  return (
    <Flex gap={24} vertical>
      {/* <OAuth />
        <Divider plain>or </Divider> */}
      <Flex gap={20} vertical justify="center" align="center">
        <Text size={{ sm: 6 }} color="neutral-8" weight={5} textAlign="center">
          Ilk imtahanınızı yaratmaq üçün qeydiyyatdan keçin
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(postSignin)}>
        <Flex gap={32} vertical>
          <Flex gap={16} vertical>
            <Flex vertical>
              {error && (
                <Text size={{ sm: 5 }} color="error-3" weight={5}>
                  {error}
                </Text>
              )}
              <Flex gap={16} vertical>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur } }) => (
                    <Form.Item
                      validateStatus={errors.email ? "error" : undefined}
                      help={errors.email && errors.email.message!}
                    >
                      <label htmlFor="email">Email</label>
                      <Input
                        id="email"
                        size="large"
                        type="email"
                        autoComplete="new-email"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    </Form.Item>
                  )}
                  name="email"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur } }) => (
                    <Form.Item>
                      <label htmlFor="password">Password</label>
                      <Input
                        size="large"
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    </Form.Item>
                  )}
                  name="password"
                />
              </Flex>
            </Flex>
          </Flex>

          <Button
            className="signupButton"
            type="primary"
            block
            size="large"
            htmlType="submit"
            disabled={!isDirty || !isValid}
            loading={pending}
          >
            Qeydiyyatı tamamla
          </Button>

          <Flex gap={4} justify="center">
            <p>Mövcud hesabın var?</p>
            <NavLink to="/auth" className="auth-link">
              Daxil ol
            </NavLink>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
}
