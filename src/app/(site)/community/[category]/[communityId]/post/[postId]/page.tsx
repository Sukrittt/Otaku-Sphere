interface IndividualPostPageProps {
  params: {
    postId: string;
  };
}

const IndividualPostPage = ({ params }: IndividualPostPageProps) => {
  const { postId } = params;

  return <div>Post page - {postId}</div>;
};

export default IndividualPostPage;
