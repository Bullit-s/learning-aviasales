export type HandleValuesChange<FormValues> = (
  changedValue: { [key in keyof FormValues]: string },
  values: FormValues
) => void;
