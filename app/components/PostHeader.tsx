import { formatDate } from "@/lib/formatDate";

export const PostHeader = ({
  title,
  date,
  draft,
}: {
  title?: string;
  date?: string;
  draft?: boolean;
}) => {
  if (!title) return null;

  return (
    <div className="mb-8">
      <h2 className="mb-2 flex items-center">
        {title}{" "}
        {draft && (
          <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded-md ml-4">
            Draft
          </span>
        )}
      </h2>
      {date && <div className="text-gray-500 text-sm">{formatDate(date)}</div>}
    </div>
  );
};
