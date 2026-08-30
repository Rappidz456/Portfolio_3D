const FIELD_CLASS =
  "w-full border-0 border-b border-[color:var(--line)] bg-transparent pb-3 pt-2 text-[16px] font-normal text-ink outline-none transition-colors duration-300 placeholder:text-grey/60 focus:border-clay";

/**
 * Underline-style form control shared by the contact form.
 */
const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  rows = 5,
  className = "",
}) => {
  const isTextarea = type === "textarea";

  return (
    <label className={`flex flex-col gap-1 ${className}`.trim()}>
      <span className="meta-label">{label}</span>
      {isTextarea ? (
        <textarea
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${FIELD_CLASS} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={FIELD_CLASS}
        />
      )}
    </label>
  );
};

export default FormField;
