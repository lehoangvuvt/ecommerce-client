import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  style?: React.CSSProperties;
};

const BlurImage: React.FC<Props> = ({ src, style }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      style={style}
      alt=""
      src={src}
      fill
      loading="lazy"
      className={
        isLoading
          ? "grayscale blur-2xl scale-110"
          : "grayscale-0 blur-0 scale-100"
      }
      onLoad={() => setLoading(false)}
    />
  );
};

export default BlurImage;
