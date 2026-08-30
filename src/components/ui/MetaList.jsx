/**
 * Editorial definition list used in About facts and Contact details.
 */
const MetaList = ({ items = [], className = "", children }) => (
  <dl className={className}>
    {children
      ? children
      : items.map((item) => (
          <MetaRow key={item.label} label={item.label}>
            {item.value}
          </MetaRow>
        ))}
  </dl>
);

export const MetaRow = ({ label, children, className = "" }) => (
  <div className={`hairline py-5 first:border-t-0 ${className}`.trim()}>
    <dt className="meta-label">{label}</dt>
    <dd className="mt-2 text-[15px] font-normal leading-relaxed text-ink">
      {children}
    </dd>
  </div>
);

export default MetaList;
