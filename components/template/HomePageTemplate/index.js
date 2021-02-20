import Image from "../../elements/Image";

const HomePageTemplate = ({ content }) => {
  const { title, coverImage } = content;

  return (
    <>
      <h1>{title}</h1>
      <Image data={coverImage} />
    </>
  );
};

export default HomePageTemplate;
