import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = ({
  title,
  fields,
  onSubmit,
  buttonText,
  extraLinks,
  validationRules,
  serverError,
   initialValues = {},
}) => {
 const {
  control,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: fields.reduce((acc, field) => {
    acc[field.name] =
      initialValues[field.name] ?? field.defaultValue ?? "";
    return acc;
  }, {}),
  resolver: yupResolver(validationRules),
});

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="max-w-lg w-full mx-auto p-8 bg-white shadow-md rounded-md space-y-6 overflow-auto max-h-[90vh]"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>

      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>

          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.required && `${field.label} is required.`,
            }}
            render={({ field: controlledField }) =>
              field.type === "select" ? (
                <select
                  {...controlledField}
                  id={field.name}
                  placeholder={field.placeholder}
                  className="bg-white text-black px-5 py-3 rounded-lg border border-gray-300"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  id={field.name}
                  {...controlledField}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  placeholder={field.placeholder}
                  {...controlledField}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white text-black border-gray-300"
                />
              )
            }
          />

          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name].message}</p>
          )}
        </div>
      ))}
      {serverError && (
        <p className="text-red-500 text-center text-sm font-medium">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
      >
        {buttonText}
      </button>

      {extraLinks &&
        extraLinks.map((link, index) => (
          <p key={index} className="text-md text-gray-600 text-center">
            {link.text}{" "}
            {link.path ? (
              <Link to={link.path} className="text-indigo-600 hover:underline">
                {link.linkText}.
              </Link>
            ) : (
              <button
                type="button"
                onClick={link.onClick}
                className="text-indigo-600 hover:underline"
              >
                {link.linkText}
              </button>
            )}
          </p>
        ))}
    </form>
  );
};

export default Form;
