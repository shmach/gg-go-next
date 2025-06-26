import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function MarkdownText({ markdown }: { markdown: string }) {
  const formatText = (markdown: string) => {
    const regexStar = /^\s*\*/gm;
    const regexNewLine = /\n/g;

    return markdown.replace(regexNewLine, "<br />").replace(regexStar, "");
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {formatText(markdown)}
    </ReactMarkdown>
  );
}
