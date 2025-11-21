
// app/[...slug]/components/renderers/basic/FormRenderer.js
import { ArrowRight, Download, ExternalLink, Star } from 'lucide-react';

export default function FormRenderer({ component, index }) {
  const content = component.content || {};
  console.log("🎨 Rendering Form:", content);

  const formConfig = content.formConfig || {
    title: "Contact Form",
    submitText: "Submit",
    successMessage: "Thank you for your submission!",
    errorMessage: "There was an error submitting the form.",
  };

  const fields = content.fields || [];

  return (
    <section key={component.id || index} className="bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-2xl mx-auto shadow-lg rounded-2xl bg-white p-10 border border-gray-100">
        {formConfig.title && (
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            {formConfig.title}
          </h2>
        )}

        <form className="space-y-6">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {renderFormField(field)}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg 
                       hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shadow-md"
          >
            {formConfig.submitText}
          </button>
        </form>
      </div>
    </section>
  );
}

function renderFormField(field) {
  const commonProps = {
    id: field.id,
    name: field.id,
    required: field.required,
    placeholder: field.placeholder,
    className:
      "w-full p-3 border border-gray-300 rounded-lg text-sm " +
      "focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none " +
      "transition-colors duration-150",
  };

  switch (field.type) {
    case "textarea":
      return <textarea {...commonProps} rows={4} />;

    case "select":
      return (
        <select {...commonProps}>
          <option value="">Select an option</option>
          {(field.options || []).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div className="space-y-2">
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                id={`${field.id}-${index}`}
                name={field.id}
                value={option}
                className="accent-blue-600"
              />
              <label
                htmlFor={`${field.id}-${index}`}
                className="text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" id={field.id} name={field.id} className="accent-blue-600" />
          <label htmlFor={field.id} className="text-sm text-gray-700">
            {field.placeholder}
          </label>
        </div>
      );

    case "checkbox-group":
      return (
        <div className="space-y-2">
          {(field.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${field.id}-${index}`}
                name={field.id}
                value={option}
                className="accent-blue-600"
              />
              <label
                htmlFor={`${field.id}-${index}`}
                className="text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      );

    case "range":
      return (
        <div>
          <input
            type="range"
            {...commonProps}
            min={field.validation?.min || 0}
            max={field.validation?.max || 100}
            step={field.step || 1}
            defaultValue={field.defaultValue || (field.validation?.min || 0)}
            className="w-full accent-blue-600"
          />
          {field.showValue && (
            <div className="text-sm text-gray-500 text-center mt-2">
              Value: {field.defaultValue || (field.validation?.min || 0)}
            </div>
          )}
        </div>
      );

    case "color":
      return (
        <input
          type="color"
          {...commonProps}
          className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
        />
      );

    case "file":
      return (
        <input
          type="file"
          {...commonProps}
          accept={field.accept}
          multiple={field.multiple}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        />
      );

    default:
      return <input type={field.type} {...commonProps} />;
  }
}