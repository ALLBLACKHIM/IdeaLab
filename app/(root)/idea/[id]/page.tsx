import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { IDEAS_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import { Suspense } from "react";
import View from "@/components/View";

const experimental_ppr = true;

const page = async ({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const post = await client.fetch(IDEAS_BY_ID_QUERY, { id });

  if (!post) {
    return notFound();
  }

  const processedContent = await remark()
    .use(html)
    .process(post?.pitch || "");
  const contentHtml = processedContent.toString();

  return (
    <>
      <section className="sky_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
          width={68}
          height={68}
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Article</h3>
          {contentHtml ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <p className="no-results">No Details Provided</p>
          )}
        </div>

        <hr className="divider"/>

        {/* later: Editor selected ideas */}

        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
        <View id={id}/>
        </Suspense>
      </section>


    </>
  );
};

export default page;
