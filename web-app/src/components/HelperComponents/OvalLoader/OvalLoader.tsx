import { Loader, MantineNumberSize, MantineColor } from "@mantine/core";

export default ({
  size,
  color = "gray",
}: {
  size: MantineNumberSize;
  color?: MantineColor;
}) => <Loader size={size} color={color} />;

// adjust color thingy here and in the adjacent file
