import { FieldHookConfig, Form, Formik, useField } from "formik";
import React from "react";
import * as Yup from "yup";

type prop = {
  label: string;
} & FieldHookConfig<string>;

const TextInput: React.FC<prop> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name} style={{ marginRight: "3rem" }}>
        {label}
      </label>
      <input
        {...field}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
      />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
      <br />
    </>
  );
};

const Checkbox: React.FC<FieldHookConfig<string>> = ({
  children,
  ...props
}) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label>
        <input
          type="checkbox"
          {...field}
          name={props.name}
          placeholder={props.placeholder}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const Select: React.FC<prop> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...(field as never)} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignUp = () => {
  return (
    <div>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          jobType: "", // added for our select
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(props) => {
          return (
            <Form>
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
              />
              <TextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />
              <Select label="Job Type" name="jobType">
                <option value="">Select a job type</option>
                <option value="designer">Designer</option>
                <option value="development">Developer</option>
                <option value="product">Product Manager</option>
                <option value="other">Other</option>
              </Select>
              <Checkbox name="acceptedTerms">
                I accept the terms and conditions
              </Checkbox>
              <button type="submit">Submit</button>

              <div style={{ margin: "1rem 0" }}>
                <h3 style={{ fontFamily: "monospace" }} />
                <pre
                  style={{
                    background: "#f6f8fa",
                    fontSize: ".65rem",
                    padding: ".5rem",
                  }}
                >
                  <strong>props</strong> = {JSON.stringify(props, null, 2)}
                </pre>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUp;
