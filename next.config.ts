import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 requires an explicit quality allowlist — an open one lets anyone
     * generate arbitrary variants off the optimizer. A value outside the list
     * is quietly coerced to the nearest allowed one, so the hero photograph's
     * `quality={80}` was being served at 75 until this was added.
     *
     * 75 is the default every other image uses; 80 is for the workshop hero,
     * which is the largest photograph on the site and the one that shows
     * compression first.
     */
    qualities: [75, 80],
  },
};

export default nextConfig;
