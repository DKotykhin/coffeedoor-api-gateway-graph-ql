/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "menuCategory";

export interface Empty {
}

export interface MenuCategory {
  id: string;
  language: string;
  title: string;
  description: string;
  image: string;
  hidden: boolean;
  position: number;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  language: string;
  title: string;
  description: string;
  price: string;
  hidden: boolean;
  position: number;
}

export interface MenuCategoryList {
  menuCategoryList: MenuCategory[];
}

export interface Language {
  language: string;
}

export interface Id {
  id: string;
}

export interface CreateMenuCategoryRequest {
  language: string;
  title: string;
  description: string;
  image: string;
  hidden: boolean;
  position: number;
}

export interface UpdateMenuCategoryRequest {
  id: string;
  title?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  hidden?: boolean | undefined;
  position?: number | undefined;
}

export interface ChangeMenuCategoryPositionRequest {
  id: string;
  oldPosition: number;
  newPosition: number;
}

export interface StatusResponse {
  status: boolean;
  message: string;
}

export const MENU_CATEGORY_PACKAGE_NAME = "menuCategory";

export interface MenuCategoryServiceClient {
  getMenuCategoriesByLanguage(request: Language): Observable<MenuCategoryList>;

  getAllMenuCategories(request: Empty): Observable<MenuCategoryList>;

  getMenuCategoryById(request: Id): Observable<MenuCategory>;

  createMenuCategory(request: CreateMenuCategoryRequest): Observable<MenuCategory>;

  updateMenuCategory(request: UpdateMenuCategoryRequest): Observable<MenuCategory>;

  changeMenuCategoryPosition(request: ChangeMenuCategoryPositionRequest): Observable<MenuCategory>;

  deleteMenuCategory(request: Id): Observable<StatusResponse>;
}

export interface MenuCategoryServiceController {
  getMenuCategoriesByLanguage(
    request: Language,
  ): Promise<MenuCategoryList> | Observable<MenuCategoryList> | MenuCategoryList;

  getAllMenuCategories(request: Empty): Promise<MenuCategoryList> | Observable<MenuCategoryList> | MenuCategoryList;

  getMenuCategoryById(request: Id): Promise<MenuCategory> | Observable<MenuCategory> | MenuCategory;

  createMenuCategory(
    request: CreateMenuCategoryRequest,
  ): Promise<MenuCategory> | Observable<MenuCategory> | MenuCategory;

  updateMenuCategory(
    request: UpdateMenuCategoryRequest,
  ): Promise<MenuCategory> | Observable<MenuCategory> | MenuCategory;

  changeMenuCategoryPosition(
    request: ChangeMenuCategoryPositionRequest,
  ): Promise<MenuCategory> | Observable<MenuCategory> | MenuCategory;

  deleteMenuCategory(request: Id): Promise<StatusResponse> | Observable<StatusResponse> | StatusResponse;
}

export function MenuCategoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getMenuCategoriesByLanguage",
      "getAllMenuCategories",
      "getMenuCategoryById",
      "createMenuCategory",
      "updateMenuCategory",
      "changeMenuCategoryPosition",
      "deleteMenuCategory",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MenuCategoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MenuCategoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MENU_CATEGORY_SERVICE_NAME = "MenuCategoryService";
