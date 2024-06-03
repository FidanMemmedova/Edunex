import * as yup from "yup";

const schema = yup.object().shape({
  examType: yup.string().required("Exam type is required"),
  subject: yup.string().required("Subject is required"),
  grade: yup.number().required("Grade is required"),
  subjectUnit: yup.number().required("Subject unit is required"),
});

export default schema;
