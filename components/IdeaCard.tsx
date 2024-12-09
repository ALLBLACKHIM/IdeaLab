import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Author, Idea } from "@/sanity/types";

export type IdeaCardType = Omit<Idea, "author"> & { author?: Author };

const IdeaCard = ({ post }: { post: IdeaCardType }) => {
  const {
    _createdAt,
    views,
    author,
    _id,
    name,
    title,
    category,
    image,
    description,
  } = post;

  return (
    <li className="idea-card group">
      <div className="flex-between">
        <p className="idea-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/idea/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/idea/${_id}`}>
        <p className="idea-card_desc">{description}</p>

        <img src={image} alt="placeholder" className="idea-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">#{category}</p>
        </Link>
        <Button className="idea-card_btn" asChild>
          <Link href={`/idea/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default IdeaCard;
