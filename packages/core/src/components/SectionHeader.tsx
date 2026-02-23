export const SectionHeader = ({
  title,
  description
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {description && <p className="text-gray-600 mt-1">{description}</p>}
  </div>
);
