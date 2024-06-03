import { Suspense } from "react";
import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./auth";
import "./style.scss";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { CreateExam } from "@/layouts/main/pages/createExam";
import Main from "./main";
import { StepLayout } from "./main/pages/StepLayout";
import { ReadingSize } from "./main/pages/readingSize";
import { Listening } from "./main/pages/listening";
import { TopicSize } from "./main/pages/topicSizes";
import { Finish } from "./main/pages/finish";
import { ExamQuestion } from "./main/pages/examQuestions";

export function Layouts() {
  return (
    <Suspense
      fallback={
        <div className="layout-spin-holder">
          <Spin size="large" />
        </div>
      }
    >
      <Header />
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="auth/*" element={<Auth />} />
        <Route
          path="/start"
          element={
            <StepLayout>
              <CreateExam />
            </StepLayout>
          }
        />
        <Route
          path="/reading_size"
          element={
            <StepLayout>
              <ReadingSize />
            </StepLayout>
          }
        />
        <Route
          path="/listening"
          element={
            <StepLayout>
              <Listening />
            </StepLayout>
          }
        />
        <Route
          path="/topics_sizes"
          element={
            <StepLayout>
              <TopicSize />
            </StepLayout>
          }
        />
        <Route
          path="/finish"
          element={
            <StepLayout>
              <Finish />
            </StepLayout>
          }
        />
        <Route path="/exam_question" element={<ExamQuestion />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}
