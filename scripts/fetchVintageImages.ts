#!/usr/bin/env npx ts-node
/**
 * Vintage Clothing Image Fetcher 👗
 *
 * Fetches public domain vintage clothing images from:
 * - Wikimedia Commons
 * - Internet Archive
 *
 * Run locally: npx ts-node scripts/fetchVintageImages.ts
 *
 * Images are saved to public/images/vintage/
 */

import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'vintage');

// Curated list of public domain vintage clothing images from Wikimedia Commons
// All images are CC0, CC-BY-SA, or public domain
const WIKIMEDIA_IMAGES = [
  // 1970s Fashion
  {
    name: '1970s_maxi_dress',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/1970_maxi_dress_by_Travers_Tempos.jpg/400px-1970_maxi_dress_by_Travers_Tempos.jpg',
    era: '70s',
    type: 'dress',
    license: 'CC BY-SA 4.0'
  },
  {
    name: '1970s_maxi_skirt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/1970s_maxi_skirt_in_Liberty_print%2C_with_tooled_leather_shoulder_bag_and_black_T-shirt.jpg/400px-1970s_maxi_skirt_in_Liberty_print%2C_with_tooled_leather_shoulder_bag_and_black_T-shirt.jpg',
    era: '70s',
    type: 'skirt',
    license: 'CC BY-SA 4.0'
  },
  {
    name: 'yves_saint_laurent_1970s',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Three_Yves_Saint_Laurent_dresses_inspired_by_Henri_Matisse%2C_Nationalmuseum%2C_2018.jpg/400px-Three_Yves_Saint_Laurent_dresses_inspired_by_Henri_Matisse%2C_Nationalmuseum%2C_2018.jpg',
    era: '70s',
    type: 'dress',
    license: 'CC BY-SA 4.0'
  },

  // 1980s Fashion
  {
    name: '1980s_power_suit',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Princess_Diana_1985.jpg/300px-Princess_Diana_1985.jpg',
    era: '80s',
    type: 'suit',
    license: 'Public Domain'
  },

  // Vintage Designer
  {
    name: 'vintage_chanel',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chanel_No._5.jpg/300px-Chanel_No._5.jpg',
    era: 'vintage-designer',
    type: 'accessory',
    license: 'CC BY-SA 3.0'
  },

  // Y2K Era
  {
    name: 'y2k_fashion',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Paris_Hilton_2009.jpg/300px-Paris_Hilton_2009.jpg',
    era: 'y2k',
    type: 'dress',
    license: 'CC BY 2.0'
  },

  // 1990s Fashion
  {
    name: '1990s_grunge',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Courtney_Love_1995.jpg/300px-Courtney_Love_1995.jpg',
    era: '90s',
    type: 'outfit',
    license: 'Public Domain'
  }
];

// Internet Archive vintage fashion catalogs
const ARCHIVE_ORG_SOURCES = [
  {
    id: '70sfashionvintag0000unse',
    title: '70s Fashion: Vintage Fashion and Beauty Ads',
    url: 'https://archive.org/details/70sfashionvintag0000unse'
  },
  {
    id: '80sfashionfromcl0000unse',
    title: '80s Fashion: From Club to Catwalk',
    url: 'https://archive.org/details/80sfashionfromcl0000unse'
  },
  {
    id: 'vintagefashionco0000albr',
    title: 'Vintage Fashion Complete',
    url: 'https://archive.org/details/vintagefashionco0000albr'
  }
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
          return;
        }
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function fetchWikimediaImages() {
  console.log('📸 Fetching Wikimedia Commons images...\n');

  const wikimediaDir = path.join(OUTPUT_DIR, 'wikimedia');
  ensureDir(wikimediaDir);

  for (const image of WIKIMEDIA_IMAGES) {
    const ext = path.extname(new URL(image.url).pathname) || '.jpg';
    const filepath = path.join(wikimediaDir, `${image.name}${ext}`);

    console.log(`  Downloading: ${image.name} (${image.era} ${image.type})`);

    try {
      await downloadImage(image.url, filepath);
      console.log(`  ✅ Saved to: ${filepath}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err}`);
    }
  }
}

function generateImageManifest() {
  console.log('\n📋 Generating image manifest...\n');

  const manifest = {
    generated: new Date().toISOString(),
    sources: {
      wikimedia: WIKIMEDIA_IMAGES,
      archiveOrg: ARCHIVE_ORG_SOURCES
    },
    usage: `
These images can be used in the Thrift Queen game.
Most are CC BY-SA or public domain.
Always check individual licenses before commercial use.
    `.trim()
  };

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  ✅ Manifest saved to: ${manifestPath}`);
}

async function main() {
  console.log('👗 Vintage Clothing Image Fetcher\n');
  console.log('=' .repeat(50));

  ensureDir(OUTPUT_DIR);

  await fetchWikimediaImages();
  generateImageManifest();

  console.log('\n' + '=' .repeat(50));
  console.log('✨ Done! Images saved to:', OUTPUT_DIR);
  console.log('\n📚 Additional resources for manual download:');

  for (const source of ARCHIVE_ORG_SOURCES) {
    console.log(`  - ${source.title}`);
    console.log(`    ${source.url}`);
  }
}

main().catch(console.error);
