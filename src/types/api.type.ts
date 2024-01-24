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
  category: TCategory;
  store_id: number;
} & TBase;

export type TCategory = {
  category_name: string;
  parent_category_id: string;
  attribute_set_id: string;
  slug: string;
  attributeSet: TAttributeSet;
} & TBase;

export type TAttributeSet = {
  attributeSetValueMappings: TAttributeSetValueMapping[];
} & TBase;

export type TAttributeSetValueMapping = {
  attribute_set_id: string;
  attribute_value_id: string;
  attributeValue: TAttributeValue;
} & TBase;

export type TAttributeValue = {
  attribute_id: string;
  value_decimal: number;
  value_int: number;
  value_string: string;
  attribute: TAttributeDetails;
} & TBase;

export type TAttributeDetails = {
  attribute_name: string;
  value_type: number;
  is_primary: boolean;
  short_id: string;
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
  attributeSet: TAttributeSet;
} & TBase;

export type TProductVarianceImage = {
  image_url: string;
  image_type: string;
  product_variance_id: string;
} & TBase;

export type TSearchTerm = {
  term: string;
  count: number;
} & TBase;

export type TStoreDetails = {
  id: number;
  createdAt: string;
  updatedAt: string;
  url: string;
  name: string;
  avatar_url: string;
  background_url: string;
  banner_url: string;
  overview: TStoreOverview;
};

export type TStoreOverview = {
  id: number;
  createdAt: string;
  updatedAt: string;
  url: string;
  name: string;
  avatar_url: string;
  background_url: string;
  banner_url: string;
  category_tabs: { slug: string; name: string }[];
  total_ratings_count: number;
  total_followers_count: number;
  total_products_count: number;
};
