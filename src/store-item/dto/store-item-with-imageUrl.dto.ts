import { StoreItemWithImages } from '../store-item.pb';

export interface StoreItemWithImageUrl extends StoreItemWithImages {
  imageUrl: string[];
}
