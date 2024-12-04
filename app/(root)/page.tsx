import IdeaCard from "@/components/IdeaCard";
import SearchForm from "@/components/SearchForm";

export default async function Home({
  searchParams,
}: {
  readonly searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: new Date(),
      views: 10,
      author: { _id: 1, name: "Luis" },
      _id: 1,
      description: "This is a description.",
      image: "https://picsum.photos/200/300",
      category: "Tech",
      title: "Meme Central",
    },
  ];

  return (
    <>
      <section className="sky_container">
        <h1 className="heading">
          Showcase your idea,
          <br /> and connect with like-minded individuals who share your passion
          for innovation.
        </h1>

        <p className="sub_heading !max-w-3xl">
          Join our community of innovators, entrepreneurs, and creatives who are
          shaping the future of technology
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for: "${query}"` : "All New Ventures"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: IdeaCardType) => (
              <IdeaCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No posts found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
