export const useStepisCompleted = (stepName: string, data: any) => {
  switch (stepName) {
    case "start":
      const startData = data?.data?.steps?.find(
        (item: any) => item?.step === "start"
      )?.completed_at;

      return {
        ksq: startData?.subject,
        topic: startData?.topic,
      };

    default:
      break;
  }
};
