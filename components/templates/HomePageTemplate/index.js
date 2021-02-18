import Image from "../../elements/Image";
import Navigation from "../../elements/Navigation";

const HomePageTemplate = ({ content, navigation }) => {
  const { title, coverImage } = content;

  return (
    <main>
      <Navigation data={navigation} />
      <h1>{title}</h1>
      <Image data={coverImage} />
    </main>
  );
};

export default HomePageTemplate;
