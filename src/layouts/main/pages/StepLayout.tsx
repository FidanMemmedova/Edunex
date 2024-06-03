import { Col, Divider, List, Row, Spin, Typography } from "antd";

import Wrapper from "@/shared/components/wrapper/wrapper";
import { FilledRight } from "@/shared/icons/FilledRight";
import { NonFilledRight } from "@/shared/icons/NonFilledRight";
import { useContinueExamQuery } from "@/shared/store/api/exam-options";
import React, { PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

export const StepLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const uuid = localStorage.getItem("uuid");
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useContinueExamQuery(uuid, { skip: !uuid });

  React.useEffect(() => {
    if (!isLoading && data) {
      // Find the first incomplete step
      const firstIncompleteStep = stepList.find(
        (step) => !isStepCompleted(step.step)
      );
      if (firstIncompleteStep) navigate(`/${firstIncompleteStep?.step}`);
      else navigate("/exam_question");

      // Navigate to the first incomplete step
      // if (firstIncompleteStep) {
      //   navigate(`/${firstIncompleteStep.step}`, { state: location.state });
      // }
    }
  }, [children]);

  const href = window.location.href;

  const isFinishStep = href.includes("finish");

  const stepList = React.useMemo(
    () => [
      { step: "start", title: "İmtahan növü" },
      { step: "start", title: "İmtahan fənni" },
      { step: "start", title: "Sinif" },
      { step: "start", title: "Tədris vahidi" },
      { step: "reading_size", title: "Oxu - qeyri bəddi mətn" },
      { step: "listening", title: "Oxu - qeyri bəddi mətn" },
      { step: "topics_sizes", title: "Dinleme - bedii metn" },
      { step: "finish", title: "Dinleme - bedii metn" },
    ],
    []
  );
  const isStepCompleted = (stepName: string) => {
    return data?.data?.steps.some(
      (step: any) => step.step === stepName && step.completed_at
    );
  };

  const getStepValue = (stepName: string) => {
    return data?.data?.steps.find((item: any) => item.step === stepName).data;
  };

  return (
    <div
      style={{
        display: isFinishStep ? "flex" : "block",
        justifyContent: isFinishStep ? "center" : "flex-start",
        alignItems: isFinishStep ? "center" : "flex-start",
      }}
    >
      <Wrapper fullHeight={"true"}>
        <Row  gutter={16} justify={isFinishStep ? "center" : "normal"}>
          <Col span={11}>
            <Title level={5} style={{ color: "var(--color-secondary-800)", marginBottom:"38px" }}>
              Yaratmaq istədiyiniz imtahanın xüsusiyyətlərini seçin
            </Title>
            {children}
          </Col>
          {!isFinishStep && (
            <>
              <Col span={2} >
                <Divider type="vertical" />
              </Col>
              <Col span={11}>
                {!window.location.href.includes("start") && isLoading ? (
                  <Spin />
                ) : (
                  <List
                    itemLayout="horizontal"
                    dataSource={stepList}
                    renderItem={(item) => {
                      const completed = isStepCompleted(item.step);
                      const value = getStepValue(item.step);

                      return (
                        <List.Item style={{padding:"5px"}}>
                          <List.Item.Meta
                            avatar={
                              completed ? <FilledRight /> : <NonFilledRight />
                            }
                            title={item.title}
                          />
                        </List.Item>
                      );
                    }}
                  />
                )}
              </Col>
            </>
          )}
        </Row>
      </Wrapper>
    </div>
  );
};
