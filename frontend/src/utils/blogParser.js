export const blogDescription = ({ content, contentLength = 80 }) =>
  content.slice(0, contentLength).concat("...");
