import { Tooltip } from "@mantine/core";

export default ({ children, text }: { children: any; text: string }) => {
  return (
    <Tooltip label={text} color="gray" withArrow arrowSize={3}>
      {children}
    </Tooltip>
  );
};
