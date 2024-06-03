import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  options: Array<number | { key: string; value: string }>;
  fieldName: string;
}

export const DropDown: React.FC<IProps> = ({ label, options, fieldName }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Form.Item
      label={label}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      validateStatus={errors[fieldName] ? "error" : ""}
      help={errors[fieldName]?.message as string}
    >
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Select
            {...field}
            mode={fieldName === "subjectUnit" ? "multiple" : undefined}
          >
            {options.map((option) =>
              typeof option === "number" ? (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ) : (
                <Select.Option key={option.key} value={option.key}>
                  {option.value}
                </Select.Option>
              )
            )}
          </Select>
        )}
      />
    </Form.Item>
  );
};
