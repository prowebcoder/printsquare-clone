// app/[...slug]/components/AppImage.js
import Image from 'next/image';
import { isExternalImage } from '../utils/imageUtils';

export default function AppImage({ src, alt, fill, width, height, className, priority = false, ...props }) {
  const imageSrc = src || '';
  
  if (isExternalImage(imageSrc)) {
    if (fill) {
      return (
        <img 
          src={imageSrc} 
          alt={alt}
          className={className}
          style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
          {...props}
        />
      );
    } else {
      return (
        <img 
          src={imageSrc} 
          alt={alt}
          width={width}
          height={height}
          className={className}
          {...props}
        />
      );
    }
  }

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        {...props}
      />
    );
  } else {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    );
  }
}