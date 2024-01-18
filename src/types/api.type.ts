type TBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TProductImage = {
  image_url: string;
  image_type: string;
  product_id: string;
} & TBase;

export type TVariance = {
  [key: string]: {
    [key: string]: {
      qty: number;
      price: number;
      imageURL: string;
      id: string;
    };
  };
};

export type TProductDetails = {
  product_name: string;
  description: string;
  brand_id: string;
  category_id: string;
  attribute_set_id: string;
  slug: string;
  brand: {
    id: string;
    createdAt: string;
    updatedAt: string;
    brand_name: string;
  };
  images: TProductImage[];
  attributeSet: {
    attributeSetValueMappings: [
      {
        attribute_set_id: string;
        attribute_value_id: string;
        attributeValue: {
          attribute_id: string;
          value_decimal: number | null;
          value_int: number | null;
          value_string: string | null;
          attribute: {
            attribute_name: string;
            value_type: number;
            is_primary: boolean;
          } & TBase;
        } & TBase;
      } & TBase
    ];
  } & TBase;
  product_variance: TVariance;
  category_path: { name: string; id: string; slug: string }[];
} & TBase;

export type TPagingListResponse<T> = {
  total: number;
  has_next: boolean;
  current_page: number;
  total_page: number;
  data: T[];
};

export type TProducItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  description: string;
  brand_id: string;
  category_id: string;
  attribute_set_id: string;
  slug: string;
  prices: number[];
  product_images: string[];
} & TBase;

export type TSearchFilters = {
  [key: string]: {
    name: string;
    values: any[];
  };
};

export type TUserInfo = {
  username: string;
  userShippingInfos: any[];
  orders: any[];
  cart?: TCart;
  accessToken: string;
  refreshToken: string;
} & TBase;

export type TCart = {
  user_id: string;
  items?: TCartItem[];
  cart_items?: TFormattedCartItem[];
} & TBase;

export type TFormattedCartItem = {
  id: string;
  image: string;
  price: number;
  product_variance_id: string;
  quantity: number;
  product: TProductDetails;
  total_price: number;
  variance: {
    main: {
      attribute_name: string;
      attribute_value: string;
    };
    sub: {
      attribute_name: string;
      attribute_value: string;
    };
  };
};

export type TCartItem = {
  cart_id: string;
  product_variance_id: string;
  quantity: number;
  productVariance: TProductVariance;
} & TBase;

export type TProductVariance = {
  product_id: string;
  attribute_set_id: string;
  quantity: number;
  productVarianceImages: TProductVarianceImage[];
  attributeSet: {
    id: "a79fc7ab-da84-4650-953c-306f93692646";
    createdAt: "2024-01-10T16:28:23.843Z";
    updatedAt: null;
    attributeSetValueMappings: [
      {
        id: "024a1fbe-4c8a-4ee1-a558-6efd2ee4348d";
        createdAt: "2024-01-10T16:28:23.863Z";
        updatedAt: null;
        attribute_set_id: "a79fc7ab-da84-4650-953c-306f93692646";
        attribute_value_id: "f37512ff-6922-43ae-ac8b-e127dc5bd670";
        attributeValue: {
          id: "f37512ff-6922-43ae-ac8b-e127dc5bd670";
          createdAt: "2024-01-10T16:28:23.788Z";
          updatedAt: null;
          attribute_id: "f16d2ca5-73ea-4e3c-83c2-a7141e89ce47";
          value_decimal: null;
          value_int: null;
          value_string: "white";
          attribute: {
            id: "f16d2ca5-73ea-4e3c-83c2-a7141e89ce47";
            createdAt: "2024-01-10T16:28:23.764Z";
            updatedAt: null;
            attribute_name: "color";
            value_type: 2;
            is_primary: true;
            short_id: "attribute_4";
          };
        };
      },
      {
        id: "bddd1376-ffe2-42f8-a7f4-2cfd35540978";
        createdAt: "2024-01-10T16:28:23.881Z";
        updatedAt: null;
        attribute_set_id: "a79fc7ab-da84-4650-953c-306f93692646";
        attribute_value_id: "48650800-24da-4e04-859d-c255457c9e38";
        attributeValue: {
          id: "48650800-24da-4e04-859d-c255457c9e38";
          createdAt: "2024-01-10T16:28:23.823Z";
          updatedAt: null;
          attribute_id: "fec6e2bd-87e3-4c04-b3a9-343cb6bcfcc1";
          value_decimal: null;
          value_int: null;
          value_string: "37.5";
          attribute: {
            id: "fec6e2bd-87e3-4c04-b3a9-343cb6bcfcc1";
            createdAt: "2024-01-10T16:28:23.766Z";
            updatedAt: null;
            attribute_name: "size";
            value_type: 2;
            is_primary: false;
            short_id: "attribute_5";
          };
        };
      }
    ];
  };
} & TBase;

export type TProductVarianceImage = {
  image_url: string;
  image_type: string;
  product_variance_id: string;
} & TBase;
