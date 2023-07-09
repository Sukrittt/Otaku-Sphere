interface CommunityCategoryPageProps {
  params: {
    communityId: string;
  };
}

const CommunityCategoryPage = async ({
  params,
}: CommunityCategoryPageProps) => {
  const { communityId } = params;

  return <div>Specific Community - {communityId}</div>;
};

export default CommunityCategoryPage;
