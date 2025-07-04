import { format } from "date-fns";

type PostProps = {
  title: string;
  user: string;
  created_at: string;
  description: string;
};

export default function PostView({
  title,
  user,
  created_at,
  description,
}: PostProps) {
  const formattedDate = format(new Date(created_at), "d MMMM, yyyy");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="text-sm text-gray-600 mb-1">
        Written By : {user?.slice(0, 5)}...{user?.slice(-5)}
      </div>
      <div className="text-sm text-gray-500">Posted : {formattedDate}</div>
      <div
        className="prose prose-lg mt-6"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
