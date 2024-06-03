import { setExamData } from "@/layouts/auth/store/examSlice";
import { LeftArrow } from "@/shared/icons/LeftArrow";
import { RootState } from "@/shared/store";
import {
  useContinueExamQuery,
  usePostStepExamMutation,
} from "@/shared/store/api/exam-options";
import { Button, Flex, Form, Input, Space, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const TopicSize: React.FC = () => {
  const uuid = localStorage.getItem("uuid");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { steps } = useSelector((state: RootState) => state.examSlice);

  const { data, isLoading } = useContinueExamQuery(uuid, {
    skip: !uuid,
  });

  const topics = data?.data?.steps.find(
    (item: any) => item.step === "topics_sizes"
  )?.data?.topics;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      topics_sizes:
        topics?.map((topic: any) => ({
          topic_id: topic.id,
          size: "",
        })) || [],
    },
  });

  const [submitStep, { isLoading: loading }] = usePostStepExamMutation();

  const onSubmit = async (data: any) => {
    const topicsSizesData = data.topics_sizes.map((topicSize: any) => ({
      topic_id: topicSize.topic_id,
      size: +topicSize.size,
    }));
    dispatch(
      setExamData({
        step: "topics_sizes",
        data: { topics_sizes: topicsSizesData },
      })
    );
    const completeExamData = {
      reading_size:
        steps.find((step) => step.step === "reading_size")?.data?.reading_size
          ?.readingSize ?? null,
      listening:
        steps.find((step) => step.step === "listening")?.data?.listening ??
        null,
      topics_sizes: topicsSizesData ?? null,
    };
    submitStep({ body: completeExamData, uuid });

    navigate("/finish");
  };
  const handleBack = () => {
    navigate("/listening", { state: true });
  };

  if (isLoading) return <Spin />;

  return (
    <>
      <Flex vertical style={{ height: "50vh", gap: "80px" }}>
        <Flex vertical style={{ gap: "20px" }}>
          {topics?.map((item: any, index: number) => (
            <Flex vertical key={index}>
              <Controller
                control={control}
                name={item.name}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Form.Item
                    validateStatus={errors.topics_sizes ? "error" : undefined}
                    // help={errors.topics_sizes?.message}
                  >
                    <Flex vertical style={{ gap: "5px" }}>
                      <Text>{item.name}</Text>
                      <Input
                        {...field}
                        style={{
                          borderRadius: "0",
                          width: "14%",
                          borderColor: "#BAB9B9",
                        }}
                        // width={"62px"}
                        min="0"
                        id={item.id}
                        size="large"
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          setValue(`topics_sizes.${index}.size`, value);
                          setValue(`topics_sizes.${index}.topic_id`, item.id);
                          field.onChange(value);
                        }}
                      />
                    </Flex>
                  </Form.Item>
                )}
              />
            </Flex>
          ))}
        </Flex>
        <Flex justify="space-between">
          <Button
            style={{
              border: "none",
              boxShadow: "none",
              color: "#A8A5A5",
              gap: "0px",
              paddingLeft: "0",
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
            loading={loading}
          >
            Tamamla
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
