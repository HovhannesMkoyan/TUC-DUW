import { Loader, MantineNumberSize, MantineColor } from "@mantine/core";

export default ({
  size,
  color,
}: {
  size: MantineNumberSize;
  color?: MantineColor;
}) => <Loader variant="dots" size={size} color={color} />;
