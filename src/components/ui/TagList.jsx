/**
 * Renders a list of pill tags from strings or `{ name }` objects.
 */
const TagList = ({ tags = [], className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
    {tags.map((tag) => {
      const label = typeof tag === "string" ? tag : tag.name;
      return (
        <span key={label} className="tag-pill">
          {label}
        </span>
      );
    })}
  </div>
);

export default TagList;
