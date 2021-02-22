import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const ContactPageTemplate = ({ content }) => {
  const { title } = content;

  return (
    <>
      <Head>
        <title>Matias Kumpulainen | {title}</title>
      </Head>
      <h1 className="page-title">{title}</h1>
      <div className="subtle-text">
        {documentToReactComponents(content.content)}
      </div>
    </>
  );
};

export default ContactPageTemplate;
