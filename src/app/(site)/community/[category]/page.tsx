interface CommunityCategoryPageProps {
  params: {
    category: string;
  };
}

const CommunityCategoryPage = ({ params }: CommunityCategoryPageProps) => {
  const { category } = params;

  return <div>CommunityCategoryPage - {category}</div>;
};

export default CommunityCategoryPage;
