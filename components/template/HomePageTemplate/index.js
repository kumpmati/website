import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "../../elements/Image";
import Head from "next/head";

const HomePageTemplate = ({ content }) => {
  const { title, coverImage } = content;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <Image data={coverImage} />
      <div>{documentToReactComponents(content.content)}</div>
    </>
  );
};

export default HomePageTemplate;
