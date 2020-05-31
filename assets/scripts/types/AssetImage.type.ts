/** @format */

export interface AssetImage {
  id: string;
  title: string;
  thumbnail: {
    '1x': string;
    '2x'?: string;
  };
  url?: string;
}
