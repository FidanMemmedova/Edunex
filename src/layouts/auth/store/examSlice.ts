import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// type TStep = {
//   step: string;
//   is_complete: null | string;
//   completed_at: null | string;
//   data: any;
// };

type TTopicSizes = {
  topic_id: number;
  size: number;
};

interface IStepBody {
  reading_size?: { readingSize: string | null };
  listening?: boolean | null;
  topics_sizes?: Array<TTopicSizes>;
  duration?: string | number | null;
  title?: string | null;
}
export interface IExamState {
  steps: Array<{
    step: string;
    is_complete: null | string;
    completed_at: null | string;
    data: IStepBody;
  }>;
}
// interface IExamStateSteps {
//   steps: TStep[]; // Define the structure based on your data
// }
// const initialState = {
//   data: {
//     examData: null,
//     steps: [
//       {
//         step: "start",
//         is_complete: null,
//         completed_at: null,
//         data: null,
//       },
//       {
//         step: "reading_size",
//         is_complete: null,
//         completed_at: null,
//         data: {
//           has_reading: null,
//           reading_size: null,
//           size_options: [],
//         },
//       },
//       {
//         step: "listening",
//         is_complete: null,
//         completed_at: null,
//         data: {
//           listening: null,
//         },
//       },
//       {
//         step: "topics_sizes",
//         is_complete: null,
//         completed_at: null,
//         data: {
//           topics_sizes: null,
//           topics: [
//             {
//               id: 2,
//               parent_id: 1,
//               name: "Fonetika",
//             },
//             {
//               id: 21,
//               parent_id: 1,
//               name: "Qrammatika",
//             },
//             {
//               id: 87,
//               parent_id: 1,
//               name: "Durğu işarələri",
//             },
//             {
//               id: 99,
//               parent_id: 1,
//               name: "Leksika",
//             },
//           ],
//         },
//       },
//       {
//         step: "finish",
//         is_complete: null,
//         completed_at: null,
//         data: {
//           duration: 0,
//           title: null,
//         },
//       },
//     ],
//   },
// };

// const initialState: IExamStateSteps = {
//   steps: [
//     {
//       step: "start",
//       is_complete: null,
//       completed_at: null,
//       data: null,
//     },
//     {
//       step: "reading_size",
//       is_complete: null,
//       completed_at: null,
//       data: {
//         has_reading: null,
//         reading_size: null,
//         size_options: [],
//       },
//     },
//     {
//       step: "listening",
//       is_complete: null,
//       completed_at: null,
//       data: {
//         listening: null,
//       },
//     },
//     {
//       step: "topics_sizes",
//       is_complete: null,
//       completed_at: null,
//       data: {
//         topics_sizes: null,
//         topics: [
//           {
//             id: 2,
//             parent_id: 1,
//             name: "Fonetika",
//           },
//           {
//             id: 21,
//             parent_id: 1,
//             name: "Qrammatika",
//           },
//           {
//             id: 87,
//             parent_id: 1,
//             name: "Durğu işarələri",
//           },
//           {
//             id: 99,
//             parent_id: 1,
//             name: "Leksika",
//           },
//         ],
//       },
//     },
//     {
//       step: "finish",
//       is_complete: null,
//       completed_at: null,
//       data: {
//         duration: 0,
//         title: null,
//       },
//     },
//   ],
// };

const initialState: IExamState = {
  steps: [
    {
      step: "reading_size",
      is_complete: null,
      completed_at: null,
      data: {
        reading_size: { readingSize: null },
      },
    },
    {
      step: "listening",
      is_complete: null,
      completed_at: null,
      data: {
        listening: null,
      },
    },
    {
      step: "topics_sizes",
      is_complete: null,
      completed_at: null,
      data: {
        topics_sizes: [],
      },
    },
    {
      step: "finish",
      is_complete: null,
      completed_at: null,
      data: {
        duration: 0,
        title: null,
      },
    },
  ],
};

export const examSlice = createSlice({
  name: "exam",
  initialState: initialState,

  reducers: {
    setExamData: (
      state,
      action: PayloadAction<{ step: string; data: IStepBody }>
    ) => {
      const { step, data } = action?.payload;
      const stepIndex = state.steps.findIndex((s) => s.step === step);
      if (stepIndex !== -1) {
        state.steps[stepIndex].data = {
          ...state.steps[stepIndex].data,
          ...data,
        };
      }
    },
    // clearExamData: (state) => {
    //   state.data.examData = null;
    // },
  },
});

export const { setExamData } = examSlice.actions;

export default examSlice.reducer;
