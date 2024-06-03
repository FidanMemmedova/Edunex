interface User {
  full_name: string;
  email: string;
}
interface AuthState {
  isLoggedIn: boolean;
  user: User;
}

type TExamBase<T> = {
  id: number;
  name: T;
};
interface Subject {
  id: number;
  code: string;
  name: string;
}

interface SubjectUnit {
  id: number;
  name: string;
}

interface Step {
  step: string;
  completed_at: string | null;
  data: any; // You can further type this if you have a consistent structure
}

interface ReadingOption {
  value: string;
  label: string;
}

interface ReadingData {
  has_reading: boolean | null;
  reading_size: string | null;
  size_options: ReadingOption[];
}

interface Topic {
  id: number;
  parent_id: number;
  name: string;
}

interface ListeningData {
  listening: boolean | null;
}

interface TopicSizeData {
  topics_sizes: string | null;
  topics: Topic[];
}

interface FinishData {
  duration: number;
  title: string | null;
}

interface StepData {
  start: null;
  reading_size: ReadingData;
  listening: ListeningData;
  topics_sizes: TopicSizeData;
  finish: FinishData;
}

interface Data {
  grade: TExamBase<number>;
  subject: Subject;
  subject_units: SubjectUnit[];
  has_reading: boolean | null;
  reading_options: ReadingOption[] | null;
  has_listening: boolean | null;
  listening_options: any | null; // Adjust if you have a specific type
  type: string;
  uuid: string;
  options: any | null; // Adjust if you have a specific type
  steps: Step[];
  questions: any[]; // Adjust if you have a specific type
  url: string;
}

interface ExamState {
  data: Data;
}
