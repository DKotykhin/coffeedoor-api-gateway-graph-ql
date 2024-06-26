/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "storeItem";

export interface Empty {
}

export interface StoreItem {
  slug: string;
  language: string;
  title: string;
  description: string;
  details: string;
  sortKey: string;
  sortValue: string;
  country: string;
  tm: string;
  price: number;
  oldPrice: number;
  discount: number;
  weight: number;
  hidden: boolean;
  position: number;
  category: Id | undefined;
}

export interface StoreItemWithImages {
  imageUrl: string[];
  slug: string;
  language: string;
  title: string;
  description: string;
  details: string;
  sortKey: string;
  sortValue: string;
  country: string;
  tm: string;
  price: number;
  oldPrice: number;
  discount: number;
  weight: number;
  hidden: boolean;
  position: number;
  category: Id | undefined;
  images: StoreItemImage[];
}

export interface StoreItemList {
  storeItemList: StoreItemWithImages[];
}

export interface StoreItemWithAd {
  storeItem: StoreItemWithImages | undefined;
  adList: StoreItemWithImages[];
}

export interface StoreItemImage {
  id: string;
  image: string;
  position: number;
}

export interface Id {
  id: string;
}

export interface Slug {
  slug: string;
}

export interface CreateStoreItemRequest {
  slug: string;
  language: string;
  title: string;
  description?: string | undefined;
  details?: string | undefined;
  sortKey?: string | undefined;
  sortValue?: string | undefined;
  country?: string | undefined;
  tm?: string | undefined;
  price: number;
  oldPrice?: number | undefined;
  discount?: number | undefined;
  weight?: number | undefined;
  hidden?: boolean | undefined;
  position: number;
  category: Id | undefined;
}

export interface UpdateStoreItemRequest {
  slug: string;
  title?: string | undefined;
  description?: string | undefined;
  details?: string | undefined;
  sortKey?: string | undefined;
  sortValue?: string | undefined;
  country?: string | undefined;
  tm?: string | undefined;
  price?: number | undefined;
  oldPrice?: number | undefined;
  discount?: number | undefined;
  weight?: number | undefined;
  hidden?: boolean | undefined;
  position?: number | undefined;
}

export interface StatusResponse {
  status: boolean;
  message: string;
}

export const STORE_ITEM_PACKAGE_NAME = "storeItem";

export interface StoreItemServiceClient {
  getStoreItemsByCategoryId(request: Id): Observable<StoreItemList>;

  getStoreItemBySlug(request: Slug): Observable<StoreItemWithImages>;

  getStoreItemBySlugWithAd(request: Slug): Observable<StoreItemWithAd>;

  createStoreItem(request: CreateStoreItemRequest): Observable<StoreItem>;

  updateStoreItem(request: UpdateStoreItemRequest): Observable<StoreItem>;

  deleteStoreItem(request: Slug): Observable<StatusResponse>;
}

export interface StoreItemServiceController {
  getStoreItemsByCategoryId(request: Id): Promise<StoreItemList> | Observable<StoreItemList> | StoreItemList;

  getStoreItemBySlug(
    request: Slug,
  ): Promise<StoreItemWithImages> | Observable<StoreItemWithImages> | StoreItemWithImages;

  getStoreItemBySlugWithAd(request: Slug): Promise<StoreItemWithAd> | Observable<StoreItemWithAd> | StoreItemWithAd;

  createStoreItem(request: CreateStoreItemRequest): Promise<StoreItem> | Observable<StoreItem> | StoreItem;

  updateStoreItem(request: UpdateStoreItemRequest): Promise<StoreItem> | Observable<StoreItem> | StoreItem;

  deleteStoreItem(request: Slug): Promise<StatusResponse> | Observable<StatusResponse> | StatusResponse;
}

export function StoreItemServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getStoreItemsByCategoryId",
      "getStoreItemBySlug",
      "getStoreItemBySlugWithAd",
      "createStoreItem",
      "updateStoreItem",
      "deleteStoreItem",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("StoreItemService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("StoreItemService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const STORE_ITEM_SERVICE_NAME = "StoreItemService";
