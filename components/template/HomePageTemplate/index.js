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
      <h1 className="page-title">{title}</h1>
      <Image data={coverImage} />
      <div className="subtle-text">
        {documentToReactComponents(content.content)}
      </div>
    </>
  );
};

export default HomePageTemplate;
