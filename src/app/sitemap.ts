import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: 'https://zonacrono.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://zonacrono.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://zonacrono.com/dashboard',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    }
  ];

  try {
    const tenantsDir = path.join(process.cwd(), 'src/data/tenants');
    if (fs.existsSync(tenantsDir)) {
      const files = fs.readdirSync(tenantsDir);
      files.forEach((file) => {
        if (file.endsWith('.json')) {
          const tenantId = file.replace('.json', '');
          sitemapData.push({
            url: `https://zonacrono.com/${tenantId}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error generating sitemap tenants:', error);
  }

  return sitemapData;
}
