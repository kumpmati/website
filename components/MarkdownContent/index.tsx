import { ThemeContext } from "@constants/colorSchemes";
import React, { createElement, FC, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { HeadingComponent } from "react-markdown/src/ast-to-react";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import dynamic from "next/dynamic";
import { numLines, toURLSafeString } from "@util/index";
import { useTrackVisibility } from "react-intersection-observer-hook";
import css from "./MarkdownContent.module.css";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter/dist/cjs/default-highlight")
);

const MarkdownContent: FC<{ content: string; headingAnchors?: boolean }> = ({
  content,
  headingAnchors,
}) => {
  const { dark } = useContext(ThemeContext);

  return (
    <ReactMarkdown
      components={{
        [headingAnchors ? "h1" : null]: headingAnchor,
        [headingAnchors ? "h2" : null]: headingAnchor,
        [headingAnchors ? "h3" : null]: headingAnchor,

        code: (opts) => codeSyntaxHighlighting(opts, dark),
      }}
      className={css.markdown}
      children={content}
    />
  );
};

export default MarkdownContent;

// adds syntax highlighting to code blocks
const codeSyntaxHighlighting = ({ children, node }, dark: boolean) => {
  const lang = node.properties?.className?.[0].replace("language-", "");
  const [ref, { wasEverVisible }] = useTrackVisibility();

  if (node.position.start.line === node.position.end.line) {
    return <code className={css.snippet}>{children}</code>;
  }

  return (
    <div
      className={css.codeWrapper}
      ref={ref}
      style={{ minHeight: `${numLines(children?.[0]) * 1.28}rem` }}>
      {wasEverVisible ? (
        <SyntaxHighlighter
          showLineNumbers
          style={dark ? atomOneDark : atomOneLight}
          language={lang}>
          {children}
        </SyntaxHighlighter>
      ) : (
        <p>Loading code...</p>
      )}
    </div>
  );
};

// adds an anchor to a heading
const headingAnchor: HeadingComponent = ({ children, node }) => {
  const hash = toURLSafeString(children?.[0].toString());

  return (
    <a href={"#" + hash}>
      <span id={hash} className={css.header__link} />
      {createElement(node.tagName, {}, children)}
    </a>
  );
};
