import React from "react";

import { IOptions } from "@/shared/types";

import formSchema from "@/shared/schemas/formSchema";
import {
  useCreateExamMutation,
  useLazyGetOptionsQuery,
} from "@/shared/store/api/exam-options";
import { useYupValidationResolver } from "@/shared/utils/useYupResolver";
import { Button, Flex, Form } from "antd";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DropDown } from "./components/DropDown";

interface IProps {
  data: IOptions;
}
interface IFormValues {
  examType: string;
  subject: string;
  grade: number;
  subjectUnit: number[];
}

export const CreateForm: React.FC<IProps> = ({ data }) => {
  const navigate = useNavigate();

  const [fetchParams, setFetchParams] = React.useState<{
    subject_id?: string;
    grade?: number;
    type?: string;
    subject_units?: number[];
  }>({});

  const methods = useForm<IFormValues>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    criteriaMode: "firstError",
    resolver: useYupValidationResolver(formSchema),
  });
  const formValues = useWatch({ control: methods.control });
  const [trigger, result] = useLazyGetOptionsQuery();
  const [createExam, { isLoading }] = useCreateExamMutation();

  React.useEffect(() => {
    if (
      formValues.subject ||
      formValues.grade ||
      formValues.examType ||
      formValues.subjectUnit
    ) {
      setFetchParams({
        subject_id: formValues.subject,
        grade: formValues.grade,
        type: formValues.examType,
        subject_units: formValues.subjectUnit,
      });
    }
  }, [formValues]);

  React.useEffect(() => {
    if (
      fetchParams.subject_id ||
      fetchParams.grade ||
      fetchParams.type ||
      fetchParams.subject_units?.length
    ) {
      trigger(fetchParams);
    }
  }, [fetchParams]);

  const gradeKeys = React.useMemo(() => {
    if (result.isSuccess && result.currentData) {
      return result.currentData.grades.map((grade) => {
        const key = Object.keys(grade)[0];
        return grade[key];
      });
    }
    return data.grades.map((grade) => {
      const key = Object.keys(grade)[0];
      return grade[key];
    });
  }, [data.grades, result.isSuccess]);

  const types = React.useMemo(() => {
    if (result.isSuccess && result.currentData) {
      return Object.entries(result.currentData.types).map(([key, value]) => ({
        key,
        value,
      }));
    }
    return Object.entries(data.types).map(([key, value]) => ({
      key,
      value,
    }));
  }, [data.types, result.isSuccess]);

  const subjectUnit = React.useMemo(() => {
    if (result.isSuccess && result.currentData) {
      return result.currentData.subject_units.map((unit) => {
        const key = Object.keys(unit)[0];
        return unit[key];
      });
    }
    return data.subject_units.map((unit) => {
      const key = Object.keys(unit)[0];
      return unit[key];
    });
  }, [data.subject_units, result.isSuccess]);

  const subjects = React.useMemo(() => {
    if (result.isSuccess && result.currentData) {
      return Object.entries(result.currentData.subjects).map(
        ([key, value]) => ({
          key,
          value,
        })
      );
    }
    return Object.entries(data.subjects).map(([key, value]) => ({
      key,
      value,
    }));
  }, [data.subjects, result.isSuccess]);

  const onSubmit = async () => {
    try {
      const { grade, ...restParams } = fetchParams;
      const body = {
        ...restParams,
        grade_id: fetchParams.grade,
      };
      const res = await createExam(body).unwrap();

      localStorage.setItem("uuid", res.data.uuid);

      navigate("/reading_size");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Flex vertical style={{ width: "70%", gap: "20px" }}>
            <DropDown
              label={"İmtahan növü seçin"}
              options={types}
              fieldName={"examType"}
            />
            <DropDown
              label={"Fənn seçin"}
              options={subjects}
              fieldName="subject"
            />
            <DropDown
              label={"Sinif seçin"}
              options={gradeKeys}
              fieldName="grade"
            />
            <DropDown
              label={"Tədris vahidi seçin"}
              options={subjectUnit}
              fieldName="subjectUnit"
            />
          </Flex>
          <Flex justify="end">
            <Button
              style={{
                borderRadius: "2px",
                fontSize: "12px",
                padding: "20px",
              }}
              type="primary"
              onClick={methods.handleSubmit(onSubmit)}
              loading={isLoading}
            >
              Növbəti
            </Button>
          </Flex>
        </Form>
      </FormProvider>
    </>
  );
};
