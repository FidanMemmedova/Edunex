import { useGetOptionsQuery } from "@/shared/store/api/exam-options";
import { CreateForm } from "./CreateForm";

export const CreateExam: React.FC = () => {
  const { data, isLoading, isError } = useGetOptionsQuery({});

  if (isError) return <div>Error</div>;

  if (isLoading || !data) return <div>Loading</div>;

  return <CreateForm data={data} />;
};
