import { Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type SizeType = 'small' | 'medium' | 'large';

interface ArticleImageProps {
  src?: string;
  alt: string;
  size?: SizeType;
}

function ArticleImage({ src, alt, size = 'medium' }: ArticleImageProps) {
  const sizes: Record<SizeType, { width: number; height: number }> = {
    small: { width: 80, height: 60 },
    medium: { width: screenWidth - 30, height: 200 },
    large: { width: screenWidth - 30, height: 300 },
  };

  const style = {
    width: sizes[size].width,
    height: sizes[size].height,
    borderRadius: 8,
  };

  const fallbackImage = `https://source.unsplash.com/random/600x400?sig=${Math.floor(Math.random() * 1000)}`;

  return (
    <Image
      source={{ uri: src || fallbackImage }}
      style={style}
      resizeMode="cover"
      accessibilityLabel={alt}
    />
  );
}

export default ArticleImage;