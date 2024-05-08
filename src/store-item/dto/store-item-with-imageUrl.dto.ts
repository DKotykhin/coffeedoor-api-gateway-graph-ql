import { StoreItem } from '../store-item.pb';

export interface StoreItemWithImageUrl extends StoreItem {
  imageUrl: string[];
}
