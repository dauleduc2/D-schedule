import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
export const renderSelectField = ({
  input,
  label,
  className,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} className={className}>
    <InputLabel>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
      }}
    >
      {children}
    </Select>
  </FormControl>
);

export const radioButton = ({
  input,
  className,
  RadioGroupClassName,

  children,
  ...rest
}) => (
  <FormControl className={className}>
    <FormLabel>Importance</FormLabel>
    <RadioGroup className={RadioGroupClassName} {...input} {...rest}>
      {children}
    </RadioGroup>
  </FormControl>
);
