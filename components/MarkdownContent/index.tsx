import { ThemeContext } from "@constants/colorSchemes";
import React, { createElement, FC, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { HeadingComponent } from "react-markdown/src/ast-to-react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { toURLSafeString } from "util/index";

import css from "./MarkdownContent.module.css";

const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  const { dark } = useContext(ThemeContext);

  const headerTitle: HeadingComponent = ({ children, node }) => {
    const hash = toURLSafeString(children?.[0].toString());

    return (
      <a href={"#" + hash}>
        <span id={hash} className={css.header__link} />
        {createElement(node.tagName, {}, children)}
      </a>
    );
  };

  return (
    <ReactMarkdown
      components={{
        h1: headerTitle,
        h2: headerTitle,
        h3: headerTitle,

        code: ({ children, node }) => {
          if (node.position.start.line === node.position.end.line)
            return <code className={css.snippet}>{children}</code>;

          const lang = node.properties?.className?.[0].replace("language-", "");
          return (
            <SyntaxHighlighter
              showLineNumbers
              style={dark ? atomOneDark : atomOneLight}
              language={lang}>
              {children}
            </SyntaxHighlighter>
          );
        },
      }}
      className={css.markdown}
      children={content}
    />
  );
};

export default MarkdownContent;
