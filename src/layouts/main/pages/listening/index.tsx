import { setExamData } from "@/layouts/auth/store/examSlice";
import { LeftArrow } from "@/shared/icons/LeftArrow";
import { RootState } from "@/shared/store";
import { usePostStepExamMutation } from "@/shared/store/api/exam-options";
import { Button, Flex, Form, Radio, Space, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const Listening: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { steps } = useSelector((state: RootState) => state.examSlice);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      listening: null,
    },
  });
  const [submitStep, { isLoading }] = usePostStepExamMutation();

  const onSubmit = async (data: any) => {
    const uuid = localStorage.getItem("uuid");
    const listening = data.listening === "yes";
    const completeExamData = {
      reading_size:
        steps.find((step) => step.step === "reading_size")?.data?.reading_size
          ?.readingSize ?? null,
      listening,
    };

    dispatch(setExamData({ step: "listening", data: { listening } }));
    await submitStep({ body: completeExamData, uuid });
    navigate("/topics_size");
  };
  const handleBack = () => {
    navigate("/reading_size", { state: "Fidan pipi" });
  };

  return (
    <Radio.Group style={{ width: "95%" }}>
      <Flex vertical style={{ gap: "80px", height: "50vh" }}>
        <Flex vertical>
          <Text style={{ margin: "30px 0px" }}>
            Dinləmə mətni əlavə edilsin?
          </Text>
          <Form.Item
            style={{ width: "100%", height: "100%" }}
            validateStatus={errors.listening ? "error" : ""}
            help={errors.listening ? "You must select an option." : ""}
          >
            <Controller
              name="listening"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Space direction="vertical">
                    <Radio value={"yes"}>Bəli</Radio>
                    <Radio value={"no"}>Xeyr</Radio>
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
            onClick={handleBack}
          >
            <LeftArrow />
            Geri
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
            loading={isLoading}
          >
            Növbəti
          </Button>
        </Flex>
      </Flex>
    </Radio.Group>
  );
};
