import { FC } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  console.log(content);
  return <ReactMarkdown children={content} />;
};

export default MarkdownContent;
