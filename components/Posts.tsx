import data from "@/content/data.json";

type Post = {
  title: string;
  user: string;
  profile_pic: string;
  description: string;
};

export default function Posts() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {data.map((post: Post, index: number) => (
        <div
          key={index}
          className={`${index == data.length - 1 ? "" : "border-b"} pb-6`}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10"
              dangerouslySetInnerHTML={{ __html: post.profile_pic }}
            />
            <span className="font-semibold text-gray-800">{post.user}</span>
          </div>

          <h2 className="text-xl font-bold mt-3 text-gray-900">{post.title}</h2>

          <p className="text-gray-700 mt-2">
            {post.description.length > 500
              ? post.description.slice(0, 500) + "..."
              : post.description}
          </p>
        </div>
      ))}
    </div>
  );
}
