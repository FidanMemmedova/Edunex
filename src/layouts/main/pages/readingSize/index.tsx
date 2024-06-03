import { setExamData } from "@/layouts/auth/store/examSlice";
import { LeftArrow } from "@/shared/icons/LeftArrow";
import {
  useContinueExamQuery,
  usePostStepExamMutation,
} from "@/shared/store/api/exam-options";
import { Button, Flex, Form, Radio, Space, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const ReadingSize = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const uuid = localStorage.getItem("uuid");
  const { data, isLoading, isError } = useContinueExamQuery(uuid, {
    skip: !uuid,
  });
  const [postStep] = usePostStepExamMutation();

  const options = data?.data.steps.find(
    (step: any) => step.step === "reading_size"
  )?.data?.size_options;

  const onSubmit = async (data: any) => {
    dispatch(
      setExamData({ step: "reading_size", data: { reading_size: data } })
    );
    await postStep({ body: data, uuid }).unwrap();
    navigate("/listening");
  };

  if (isLoading) return <Spin />;
  if (isError) return <div>Error</div>;
  return (
    <Radio.Group style={{ width: "95%" }}>
      <Flex vertical style={{ gap: "80px", height: "50vh" }}>
        <Flex vertical style={{gap:"30px"}}>
          <Text>
            Oxu bölməsi üçün çıxacaq mətn neçə sözdən ibarət olsun.
          </Text>

          <Form.Item
            style={{ width: "100%", height: "100%" }}
            validateStatus={errors.readingSize ? "error" : ""}
            help={errors.readingSize ? "You must select an option." : ""}
          >
            <Controller
              name="readingSize"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Space direction="vertical">
                    {options?.map((option: any, index: number) => (
                      <Radio key={index} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              )}
            />
          </Form.Item>
        </Flex>
        <Flex justify="space-between">
          <Button
            style={{
              border: "none",
              boxShadow: "none",
              color: "#A8A5A5",
              gap: "0px",
              paddingLeft:"0"
            }}
          >
            <LeftArrow /> Geri
          </Button>
          <Button
            type="primary"
            style={{
              borderRadius: "2px",
              fontSize: "12px",
              padding: "20px",
              width: "30%",
            }}
            onClick={handleSubmit(onSubmit)}
          >
            Növbəti
          </Button>
        </Flex>
      </Flex>
    </Radio.Group>
  );
};
