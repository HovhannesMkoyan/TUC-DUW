import { Helmet } from "react-helmet";

export default function SEO({
  title,
  description,
  meta = [],
}: {
  title: string;
  description: string;
  meta?: any[];
}) {
  return (
    <Helmet 
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
      ]}
    />
  );
}
