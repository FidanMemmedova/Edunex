import Wrapper from "@/shared/components/wrapper/wrapper";
import { RootState } from "@/shared/store";
import { usePostStepExamMutation } from "@/shared/store/api/exam-options";

import { Button, Flex, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const Finish: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const uuid = localStorage.getItem("uuid");
  const [postExam, { isLoading }] = usePostStepExamMutation();
  const { steps } = useSelector((state: RootState) => state.examSlice);
  const onSubmit = async (data: any) => {
    const completeExamData = {
      reading_size:
        steps.find((step) => step.step === "reading_size")?.data?.reading_size
          ?.readingSize ?? null,
      listening:
        steps.find((step) => step.step === "listening")?.data?.listening ??
        null,
      topics_sizes:
        steps.find((step) => step.step === "topics_size")?.data?.topics_sizes ??
        null,
      duration: data.duration,
      title: data.title,
    };

    await postExam({ body: completeExamData, uuid });
  };
  return (
    <Wrapper>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Flex
          vertical
          gap={"1.3rem"}
          style={{ width: "55%", margin: "auto" }}
        >
          <Form.Item name={"title"} label="İmtahanın adı?">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  style={{ borderRadius: "0px" }}
                  type="text"
                  {...field}
                  size="middle"
                />
              )}
            />
          </Form.Item>

          <Form.Item
            name={"duration"}
            label="İmtahanın müddəti? (dəqiqə)"
            wrapperCol={{ span: 10 }}
          >
            <Controller
              control={control}
              name="duration"
              rules={{ required: true }}
              render={({ field }) => (
                <Input style={{ borderRadius: "0px" }} {...field} />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                borderRadius: "0",
                fontSize: "12px",
                padding: "20px",
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Sualları tərtib et
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Wrapper>
  );
};
