import Image from "../Image";

const WelcomeSplash = ({ data }) => {
  const { title, coverImage } = data.fields;

  return (
    <>
      <h1>{title}</h1>
      <Image data={coverImage} />
    </>
  );
};

export default WelcomeSplash;
