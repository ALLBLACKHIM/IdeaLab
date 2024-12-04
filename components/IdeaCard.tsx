import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const IdeaCard = ({ post }: { post: IdeaCardType }) => {
  const { _createdAt, views, author:{_id, name}, title } = post;

  return (
    <li className="idea-card group">
      <div className="flex-between">
        <p className="idea-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${_id}`}>
          <p className="text-16-medium line-clamp-1">
            {name}
          </p>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default IdeaCard;
