// src/lib/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ACCOUNT_NAME || ''
  },
  url: {
    secure: true
  }
});

// Helper to get optimized Cloudinary fetch URL
export const getOptimizedCloudinaryUrl = (sourceUrl: string, width = 300): string => {
  // Return source URL in development, optimized URL in production
  // if (process.env.NODE_ENV === 'development') {
  //   return sourceUrl;
  // }

  const decodedUrl = decodeURIComponent(sourceUrl);
  
  const cloudName = cld.getConfig().cloud?.cloudName || '';
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/fetch`;
  const transformations = `f_auto,q_auto,w_${width},c_limit`;
  const optimizedUrl = `${baseUrl}/${transformations}/${encodeURIComponent(decodedUrl)}`;

  return optimizedUrl;
};
