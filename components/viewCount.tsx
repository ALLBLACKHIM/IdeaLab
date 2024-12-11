const ViewCount = async ({ view }: { view: number }) => {
  switch (view) {
    case 1:
      return <span>{view} view</span>;
      break;

    default:
      return <span>{view} views</span>;
      break;
  }
};

export default ViewCount;
