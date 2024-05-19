/* eslint-disable react/no-danger */
import type { FC } from 'react';

interface HighlightedTextProps {
  text: string;
  search: string;
}

export const HighlightedText: FC<HighlightedTextProps> = ({ text, search }) => {
  const regex = new RegExp(search, 'giu');
  const highlightedName = text.replace(
    regex,
    (match) => `<span style="background-color:yellow;">${match}</span>`
  );

  return <span dangerouslySetInnerHTML={{ __html: highlightedName }} />;
};
