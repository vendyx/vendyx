/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type ActiveDiscount = {
  __typename?: 'ActiveDiscount';
  applicationMode: DiscountApplicationMode;
  discountType: DiscountType;
  discountedAmount: Scalars['Int']['output'];
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Address = Node & {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  /** State or region */
  province: Scalars['String']['output'];
  references?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type AddressJson = {
  __typename?: 'AddressJson';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  countryId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  isDefault: Scalars['Boolean']['output'];
  phoneNumber: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  /** State or region */
  province: Scalars['String']['output'];
  references?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export type AddressList = List & {
  __typename?: 'AddressList';
  count: Scalars['Int']['output'];
  items: Array<Address>;
  pageInfo: PageInfo;
};

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  source: Scalars['String']['output'];
  type: AssetType;
  updatedAt: Scalars['Date']['output'];
};

export type AssetInCollectionInput = {
  id: Scalars['ID']['input'];
};

export type AssetInProductInput = {
  id: Scalars['ID']['input'];
  order: Scalars['Int']['input'];
};

export type AssetList = List & {
  __typename?: 'AssetList';
  count: Scalars['Int']['output'];
  items: Array<Asset>;
  pageInfo: PageInfo;
};

export enum AssetType {
  Image = 'IMAGE'
}

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type Collection = Node & {
  __typename?: 'Collection';
  assets: AssetList;
  /** The collection's content type indicating if the collection contains products or other collections */
  contentType: CollectionContentType;
  createdAt: Scalars['Date']['output'];
  /** The collection's description */
  description?: Maybe<Scalars['String']['output']>;
  /** The collection's order user to decide to show the collection in the storefront */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The collection's name */
  name: Scalars['String']['output'];
  products: ProductList;
  /** The collection's slug used in the URL */
  slug: Scalars['String']['output'];
  subCollections: CollectionList;
  updatedAt: Scalars['Date']['output'];
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionAssetsArgs = {
  input?: InputMaybe<ListInput>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionProductsArgs = {
  input?: InputMaybe<ProductListInput>;
};

/** A collection is a group of products that are displayed together in the storefront. */
export type CollectionSubCollectionsArgs = {
  input?: InputMaybe<CollectionListInput>;
};

export enum CollectionContentType {
  Collections = 'COLLECTIONS',
  Products = 'PRODUCTS'
}

export type CollectionFilters = {
  contentType?: InputMaybe<CollectionContentType>;
  enabled?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type CollectionList = List & {
  __typename?: 'CollectionList';
  count: Scalars['Int']['output'];
  items: Array<Collection>;
  pageInfo: PageInfo;
};

export type CollectionListInput = {
  /** Filters to apply */
  filters?: InputMaybe<CollectionFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ConfigurableProperty = {
  /**
   * Specific data for the payment handler chosen
   * Record<string, string | number | boolean>
   */
  args: Scalars['JSON']['input'];
  code: Scalars['String']['input'];
};

export type Country = Node & {
  __typename?: 'Country';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  states: Array<State>;
  updatedAt: Scalars['Date']['output'];
};

export type CreateAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  province: Scalars['String']['input'];
  references?: InputMaybe<Scalars['String']['input']>;
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCollectionInput = {
  assets?: InputMaybe<Array<AssetInCollectionInput>>;
  contentType: CollectionContentType;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  subCollections?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateDiscountInput = {
  applicationMode: DiscountApplicationMode;
  availableCombinations?: InputMaybe<Array<DiscountType>>;
  discountValue: Scalars['Int']['input'];
  discountValueType: DiscountValueType;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  endsAt?: InputMaybe<Scalars['Date']['input']>;
  handle: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  orderRequirementType?: InputMaybe<OrderRequirementType>;
  orderRequirementValue?: InputMaybe<Scalars['Int']['input']>;
  perCustomerLimit?: InputMaybe<Scalars['Int']['input']>;
  startsAt: Scalars['Date']['input'];
  type: DiscountType;
};

export type CreateOptionInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  values: Array<CreateOptionValueInput>;
};

export type CreateOptionValueInput = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type CreatePaymentMethodInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  handler: ConfigurableProperty;
};

export type CreateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type CreateShippingMethodInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  handler: ConfigurableProperty;
  name: Scalars['String']['input'];
  zoneId: Scalars['ID']['input'];
};

export type CreateShopInput = {
  address?: InputMaybe<CreateAddressInput>;
  email: Scalars['String']['input'];
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateTagsResult = {
  __typename?: 'CreateTagsResult';
  apiErrors: Array<TagErrorResult>;
  tags: Array<Tag>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateVariantInput = {
  assetId?: InputMaybe<Scalars['ID']['input']>;
  comparisonPrice?: InputMaybe<Scalars['Int']['input']>;
  costPerUnit?: InputMaybe<Scalars['Int']['input']>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice: Scalars['Int']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateZoneInput = {
  name: Scalars['String']['input'];
  stateIds: Array<Scalars['ID']['input']>;
};

export type Customer = Node & {
  __typename?: 'Customer';
  addresses: AddressList;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  /** to customer be able to login, place orders, etc. the customer must be enabled */
  enabled: Scalars['Boolean']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  totalSpent: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type CustomerAddressesArgs = {
  input?: InputMaybe<ListInput>;
};

export type CustomerOrdersArgs = {
  input?: InputMaybe<OrderListInput>;
};

export enum CustomerErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  InvalidEmail = 'INVALID_EMAIL'
}

export type CustomerErrorResult = {
  __typename?: 'CustomerErrorResult';
  code: CustomerErrorCode;
  message: Scalars['String']['output'];
};

export type CustomerFilters = {
  email?: InputMaybe<StringFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  firstName?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
};

export type CustomerList = List & {
  __typename?: 'CustomerList';
  count: Scalars['Int']['output'];
  items: Array<Customer>;
  pageInfo: PageInfo;
};

export type CustomerListInput = {
  /** Filters to apply */
  filters?: InputMaybe<CustomerFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/**  Results  */
export type CustomerResult = {
  __typename?: 'CustomerResult';
  apiErrors: Array<CustomerErrorResult>;
  customer?: Maybe<Customer>;
};

/** A discount is a way to apply price discounts to your customer orders via a code or automatic rules. */
export type Discount = Node & {
  __typename?: 'Discount';
  /** Indicates if the discount is applied via a code or automatically. */
  applicationMode: DiscountApplicationMode;
  /** List of available combinations for the discount. */
  availableCombinations?: Maybe<Array<DiscountType>>;
  createdAt: Scalars['Date']['output'];
  /** the value that will be subtracted from the order total. (percentage or fixed amount) */
  discountValue: Scalars['Int']['output'];
  /** Indicates if the discount is applied as a percentage or a fixed amount. */
  discountValueType: DiscountValueType;
  /** Whether the discount is enabled or not. Disabled discounts can't be applied to orders. */
  enabled: Scalars['Boolean']['output'];
  /** Date when the discount stops to be applicable. */
  endsAt?: Maybe<Scalars['Date']['output']>;
  /** A human friendly unique identifier for the discount. could be used as a code or title. */
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Extra metadata needed for the discount. */
  metadata?: Maybe<Scalars['JSON']['output']>;
  /** Define the requirements that the order must meet to be eligible for the discount. */
  orderRequirementType?: Maybe<OrderRequirementType>;
  /** The value that the order must meet to be eligible for the discount. (minimum amount or minimum items) */
  orderRequirementValue?: Maybe<Scalars['Int']['output']>;
  /** The maximum number of times the discount can be used by a customer. */
  perCustomerLimit?: Maybe<Scalars['Int']['output']>;
  /** Date when the discount starts to be applicable. */
  startsAt: Scalars['Date']['output'];
  /**
   * Define the type of the discount.
   * Order: discount will be applied to the order total.
   * Product: discount will be applied to the product price.
   * Shipping: discount will be applied to the shipping cost.
   * BuyXGetY: discount will be applied to the product price.
   */
  type: DiscountType;
  updatedAt: Scalars['Date']['output'];
};

export enum DiscountApplicationMode {
  Automatic = 'AUTOMATIC',
  Code = 'CODE'
}

export enum DiscountErrorCode {
  HandleAlreadyExists = 'HANDLE_ALREADY_EXISTS'
}

export type DiscountErrorResult = {
  __typename?: 'DiscountErrorResult';
  code: DiscountErrorCode;
  message: Scalars['String']['output'];
};

export type DiscountFilters = {
  enabled?: InputMaybe<BooleanFilter>;
  handle?: InputMaybe<StringFilter>;
};

export type DiscountList = List & {
  __typename?: 'DiscountList';
  count: Scalars['Int']['output'];
  items: Array<Discount>;
  pageInfo: PageInfo;
};

export type DiscountListInput = {
  /** Filters to apply */
  filters?: InputMaybe<DiscountFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type DiscountResult = {
  __typename?: 'DiscountResult';
  apiErrors: Array<DiscountErrorResult>;
  discount?: Maybe<Discount>;
};

export enum DiscountType {
  BuyXGetY = 'BUY_X_GET_Y',
  Order = 'ORDER',
  Product = 'PRODUCT',
  Shipping = 'SHIPPING'
}

export enum DiscountValueType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

export type GenerateUserAccessTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** A list of items with count, each result that expose a array of items should implement this interface */
export type List = {
  count: Scalars['Int']['output'];
  items: Array<Node>;
  pageInfo: PageInfo;
};

export type ListInput = {
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type MarkOrderAsShippedInput = {
  carrier: Scalars['String']['input'];
  trackingCode: Scalars['String']['input'];
};

export type Metric = {
  __typename?: 'Metric';
  key: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type MetricsInput = {
  endsAt: Scalars['Date']['input'];
  startsAt: Scalars['Date']['input'];
};

export type MetricsResult = {
  __typename?: 'MetricsResult';
  metrics: Array<Metric>;
  total: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelOrder: OrderResult;
  createCollection: Collection;
  createCustomerAddress: Address;
  createDiscount: DiscountResult;
  createOption: Option;
  createPaymentMethod: PaymentMethodResult;
  createProduct: Product;
  createShippingMethod: ShippingMethodResult;
  createShop: ShopResult;
  createTags: CreateTagsResult;
  createUser: UserResult;
  createVariant: Variant;
  createZone: Zone;
  generateShopApiKey: ShopResult;
  generateUserAccessToken: UserAccessTokenResult;
  markOrderAsDelivered: OrderResult;
  markOrderAsShipped: OrderResult;
  removeCollection: Scalars['Boolean']['output'];
  removeCustomerAddress: Address;
  removeDiscounts?: Maybe<Scalars['Boolean']['output']>;
  removePaymentMethod: Scalars['Boolean']['output'];
  removeShippingMethod: Scalars['Boolean']['output'];
  removeTags: Scalars['Boolean']['output'];
  removeZone: Scalars['Boolean']['output'];
  softRemoveOption: Option;
  softRemoveOptionValues: Scalars['Boolean']['output'];
  softRemoveProduct: Scalars['Boolean']['output'];
  softRemoveVariant: Variant;
  updateCollection: Collection;
  updateCustomer: CustomerResult;
  updateCustomerAddress: Address;
  updateDiscount: DiscountResult;
  updateOption: Option;
  updatePaymentMethod: PaymentMethod;
  updateProduct: Product;
  updateShippingMethod: ShippingMethod;
  updateShop: ShopResult;
  updateTag: TagResult;
  updateUser: UserResult;
  updateVariant: Variant;
  updateZone: Zone;
};

export type MutationCancelOrderArgs = {
  id: Scalars['ID']['input'];
};

export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};

export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};

export type MutationCreateDiscountArgs = {
  input: CreateDiscountInput;
};

export type MutationCreateOptionArgs = {
  input: CreateOptionInput;
  productId: Scalars['ID']['input'];
};

export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
};

export type MutationCreateShopArgs = {
  input: CreateShopInput;
};

export type MutationCreateTagsArgs = {
  input: Array<CreateTagInput>;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationCreateVariantArgs = {
  input: CreateVariantInput;
  productId: Scalars['ID']['input'];
};

export type MutationCreateZoneArgs = {
  input: CreateZoneInput;
};

export type MutationGenerateUserAccessTokenArgs = {
  input: GenerateUserAccessTokenInput;
};

export type MutationMarkOrderAsDeliveredArgs = {
  id: Scalars['ID']['input'];
};

export type MutationMarkOrderAsShippedArgs = {
  id: Scalars['ID']['input'];
  input: MarkOrderAsShippedInput;
};

export type MutationRemoveCollectionArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationRemoveCustomerAddressArgs = {
  addressId: Scalars['ID']['input'];
};

export type MutationRemoveDiscountsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationRemovePaymentMethodArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveShippingMethodArgs = {
  id: Scalars['ID']['input'];
};

export type MutationRemoveTagsArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationRemoveZoneArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionArgs = {
  id: Scalars['ID']['input'];
};

export type MutationSoftRemoveOptionValuesArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationSoftRemoveProductArgs = {
  ids: Array<Scalars['ID']['input']>;
};

export type MutationSoftRemoveVariantArgs = {
  id: Scalars['ID']['input'];
};

export type MutationUpdateCollectionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCollectionInput;
};

export type MutationUpdateCustomerArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCustomerInput;
};

export type MutationUpdateCustomerAddressArgs = {
  addressId: Scalars['ID']['input'];
  input: UpdateAddressInput;
};

export type MutationUpdateDiscountArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDiscountInput;
};

export type MutationUpdateOptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
};

export type MutationUpdatePaymentMethodArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePaymentMethodInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};

export type MutationUpdateShippingMethodArgs = {
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
};

export type MutationUpdateShopArgs = {
  input: UpdateShopInput;
  shopSlug: Scalars['String']['input'];
};

export type MutationUpdateTagArgs = {
  id: Scalars['ID']['input'];
  input: UpdateTagInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type MutationUpdateVariantArgs = {
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
};

export type MutationUpdateZoneArgs = {
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
};

/** A node, each type that represents a entity should implement this interface */
export type Node = {
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Option = Node & {
  __typename?: 'Option';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  values: Array<OptionValue>;
};

export type OptionList = List & {
  __typename?: 'OptionList';
  count: Scalars['Int']['output'];
  items: Array<Option>;
  pageInfo: PageInfo;
};

export type OptionValue = Node & {
  __typename?: 'OptionValue';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  option: Option;
  order: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Order = Node & {
  __typename?: 'Order';
  code: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  customer?: Maybe<Customer>;
  /**
   * Array of all order-level discounts applied to the order
   * Populated every time order is modified.
   * Use this field to show data of current discounts applied to the order
   *
   * Note1: Vendyx allows to add shipping discounts before a shipping method is selected for the order (`order.shipment` is null)
   * so for that cases this field will contain that shipping discounts.
   *
   * Note2: When the order already has a shipping method selected (`order.shipment` is not null), this filed will now contain only order-level discounts
   * and the shipping discounts will be placed in `order.shipment`.
   */
  discounts: Array<ActiveDiscount>;
  id: Scalars['ID']['output'];
  lines: OrderLineList;
  payment?: Maybe<Payment>;
  /** The date and time when a payment has been added to the order */
  placedAt?: Maybe<Scalars['Date']['output']>;
  shipment?: Maybe<Shipment>;
  shippingAddress?: Maybe<AddressJson>;
  state: OrderState;
  /** Order lines total less discounts */
  subtotal: Scalars['Int']['output'];
  /** The price that will be sent to the payment provider. subtotal plus shipping price */
  total: Scalars['Int']['output'];
  totalQuantity: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OrderLinesArgs = {
  input?: InputMaybe<ListInput>;
};

/**  Utils  */
export enum OrderErrorCode {
  ForbiddenOrderAction = 'FORBIDDEN_ORDER_ACTION',
  OrderTransitionError = 'ORDER_TRANSITION_ERROR'
}

export type OrderErrorResult = {
  __typename?: 'OrderErrorResult';
  code: OrderErrorCode;
  message: Scalars['String']['output'];
};

export type OrderFilters = {
  code?: InputMaybe<Scalars['String']['input']>;
  customer?: InputMaybe<StringFilter>;
  state?: InputMaybe<OrderState>;
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['Date']['output'];
  /**
   * Array of all order-line-level discounts applied to the line
   * Populated every time order line is modified.
   * Use this field to show data of current discounts applied to the order line
   */
  discounts: Array<ActiveDiscount>;
  id: Scalars['ID']['output'];
  lineSubtotal: Scalars['Int']['output'];
  lineTotal: Scalars['Int']['output'];
  productVariant: Variant;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type OrderLineList = List & {
  __typename?: 'OrderLineList';
  count: Scalars['Int']['output'];
  items: Array<OrderLine>;
  pageInfo: PageInfo;
};

export type OrderList = List & {
  __typename?: 'OrderList';
  count: Scalars['Int']['output'];
  items: Array<Order>;
  pageInfo: PageInfo;
};

export type OrderListInput = {
  /** Filters to apply */
  filters?: InputMaybe<OrderFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum OrderRequirementType {
  MinimumAmount = 'MINIMUM_AMOUNT',
  MinimumItems = 'MINIMUM_ITEMS'
}

/**  Results  */
export type OrderResult = {
  __typename?: 'OrderResult';
  apiErrors: Array<OrderErrorResult>;
  order?: Maybe<Order>;
};

export enum OrderState {
  /** The order has been canceled by the admin */
  Canceled = 'CANCELED',
  /** The order has been delivered and is completes */
  Delivered = 'DELIVERED',
  /** The order is being modified by the customer (CRUD line actions, adding contact info and shipment info) */
  Modifying = 'MODIFYING',
  /** The order is ready to be paid */
  PaymentAdded = 'PAYMENT_ADDED',
  /** The payment has been authorized by the payment provider */
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  /** The order has been shipped (carrier and tracking code added) */
  Shipped = 'SHIPPED'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  total: Scalars['Int']['output'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A payment handler is a handler to be used in a payment method by any shop. */
export type PaymentHandler = {
  __typename?: 'PaymentHandler';
  /**
   * Specific data for the payment handler chosen
   * Usually, this json stores the payment integration keys
   * Record<string, Arg>
   */
  args: Scalars['JSON']['output'];
  /** The payment handlers's code (e.g. 'stripe') */
  code: Scalars['String']['output'];
  /** The payment handlers's icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** The payment handler's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
};

/** A payment method is a way to pay for an order in your shop, like credit card, paypal, etc */
export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  /**
   * Specific data for the payment handler chosen
   * Usually, this json stores the payment integration keys
   * Record<string, string | number | boolean>
   */
  args: Scalars['JSON']['output'];
  createdAt: Scalars['Date']['output'];
  /**
   * Whether the payment method is enabled or not
   * Not enabled payment methods will not be shown in the storefront
   * Useful for payment methods that are not ready to be used yet
   */
  enabled: Scalars['Boolean']['output'];
  /** The payment method's icon */
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The payment method's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum PaymentMethodErrorCode {
  FailedToSaveArgs = 'FAILED_TO_SAVE_ARGS',
  HandlerAlreadySelected = 'HANDLER_ALREADY_SELECTED',
  HandlerNotFound = 'HANDLER_NOT_FOUND'
}

export type PaymentMethodErrorResult = {
  __typename?: 'PaymentMethodErrorResult';
  code: PaymentMethodErrorCode;
  message: Scalars['String']['output'];
};

export type PaymentMethodResult = {
  __typename?: 'PaymentMethodResult';
  apiErrors: Array<PaymentMethodErrorResult>;
  paymentMethod?: Maybe<PaymentMethod>;
};

export type Product = Node & {
  __typename?: 'Product';
  /**
   * Whether the product is archived or not.
   * Archived products are not exposed to the storefront API and are not visible in the admin ui by default.
   * Useful for products that are not available anymore but you don't want to lose their data.
   */
  archived: Scalars['Boolean']['output'];
  assets: AssetList;
  createdAt: Scalars['Date']['output'];
  /** The product's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the products is enabled or not.
   * Not enabled products are not exposed to the storefront API but are visible in the admin ui.
   * Useful for products that are not published by now but they planned to be published in the future.
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The product's name */
  name: Scalars['String']['output'];
  options: Array<Option>;
  /** A human-friendly unique string for the Product automatically generated from its name */
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  updatedAt: Scalars['Date']['output'];
  variants: VariantList;
};

export type ProductAssetsArgs = {
  input?: InputMaybe<ListInput>;
};

export type ProductVariantsArgs = {
  input?: InputMaybe<ListInput>;
};

export type ProductFilters = {
  archived?: InputMaybe<BooleanFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ProductList = List & {
  __typename?: 'ProductList';
  count: Scalars['Int']['output'];
  items: Array<Product>;
  pageInfo: PageInfo;
};

export type ProductListInput = {
  /** Filters to apply */
  filters?: InputMaybe<ProductFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Collection>;
  collections: CollectionList;
  countries: Array<Country>;
  customer?: Maybe<Customer>;
  customers: CustomerList;
  discount?: Maybe<Discount>;
  discounts: DiscountList;
  order?: Maybe<Order>;
  orders: OrderList;
  paymentHandlers: Array<PaymentHandler>;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethods: Array<PaymentMethod>;
  product?: Maybe<Product>;
  products: ProductList;
  /**
   * Get a list of products by their variant IDs.
   * Useful for fetching products win cases when you only have variant IDs like
   * fetching products from a discount metadata
   */
  productsByVariantIds: ProductList;
  shippingHandlers: Array<ShippingHandler>;
  shippingMethods: Array<ShippingMethod>;
  shop?: Maybe<Shop>;
  shops: ShopList;
  tags: TagList;
  totalOrders: MetricsResult;
  totalSales: MetricsResult;
  validateAccessToken?: Maybe<Scalars['Boolean']['output']>;
  variant?: Maybe<Variant>;
  whoami?: Maybe<User>;
  zone: Zone;
  zones: Array<Zone>;
};

export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryCollectionsArgs = {
  input?: InputMaybe<CollectionListInput>;
};

export type QueryCustomerArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCustomersArgs = {
  input?: InputMaybe<CustomerListInput>;
};

export type QueryDiscountArgs = {
  id: Scalars['ID']['input'];
};

export type QueryDiscountsArgs = {
  input?: InputMaybe<DiscountListInput>;
};

export type QueryOrderArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryOrdersArgs = {
  input?: InputMaybe<OrderListInput>;
};

export type QueryPaymentMethodArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductsArgs = {
  input?: InputMaybe<ProductListInput>;
};

export type QueryProductsByVariantIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
  input?: InputMaybe<ProductListInput>;
};

export type QueryShopArgs = {
  slug: Scalars['String']['input'];
};

export type QueryShopsArgs = {
  input?: InputMaybe<ListInput>;
};

export type QueryTagsArgs = {
  input?: InputMaybe<TagListInput>;
};

export type QueryTotalOrdersArgs = {
  input: MetricsInput;
};

export type QueryTotalSalesArgs = {
  input: MetricsInput;
};

export type QueryVariantArgs = {
  id: Scalars['ID']['input'];
};

export type QueryZoneArgs = {
  id: Scalars['ID']['input'];
};

export type Shipment = Node & {
  __typename?: 'Shipment';
  amount: Scalars['Int']['output'];
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  /**
   * Array of all shipment-level discounts applied to the shipment
   * Populated every time order shipment is modified.
   * Use this field to show data of current discounts applied to the shipment
   */
  discounts: Array<ActiveDiscount>;
  id: Scalars['ID']['output'];
  method: Scalars['String']['output'];
  order: Order;
  total: Scalars['Int']['output'];
  trackingCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

/** A shipping handler is a way to manage the shipping of an order in your shop, manage include the shipping cost, the shipping time, etc */
export type ShippingHandler = {
  __typename?: 'ShippingHandler';
  /**
   * Specific data for the shipping handler chosen
   * Usually, this json stores the shipping integration keys
   * Record<string, Arg>
   */
  args: Scalars['JSON']['output'];
  /** The shipping handler's code (e.g. 'fedex') */
  code: Scalars['String']['output'];
  /** The shipping handlers's icon */
  icon?: Maybe<Scalars['String']['output']>;
  /** The shipping handler's name (e.g. 'Fedex') */
  name: Scalars['String']['output'];
};

/** A shipping method is a method chosen by the customer to ship the order to the customer's address */
export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  /**
   * Specific data for the shipping handler chosen
   * Usually, this json stores the shipping integration keys
   * Record<string, string | number | boolean>
   */
  args: Scalars['JSON']['output'];
  code: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  /** The shipping method's description */
  description?: Maybe<Scalars['String']['output']>;
  /**
   * Whether the shipping method is enabled or not
   * Not enabled shipping methods will not be shown in the storefront
   * Useful for shipping methods that are not ready to be used yet
   */
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The shipping method's name (e.g. 'Stripe') */
  name: Scalars['String']['output'];
  pricePreview: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum ShippingMethodErrorCode {
  FailedToSaveArgs = 'FAILED_TO_SAVE_ARGS',
  HandlerNotFound = 'HANDLER_NOT_FOUND'
}

export type ShippingMethodErrorResult = {
  __typename?: 'ShippingMethodErrorResult';
  code: ShippingMethodErrorCode;
  message: Scalars['String']['output'];
};

export type ShippingMethodResult = {
  __typename?: 'ShippingMethodResult';
  apiErrors: Array<ShippingMethodErrorResult>;
  shippingMethod?: Maybe<ShippingMethod>;
};

export type Shop = Node & {
  __typename?: 'Shop';
  /** Physical address of the shop */
  address?: Maybe<AddressJson>;
  createdAt: Scalars['Date']['output'];
  /** Contact email for the shop */
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** The shop's logo */
  logo?: Maybe<Scalars['String']['output']>;
  /** The shop's name */
  name: Scalars['String']['output'];
  /** The shop's owner */
  owner: User;
  /** Contact phone number for the shop */
  phoneNumber: Scalars['String']['output'];
  /** Api key for other stores to connect to this store */
  shopApiKey: Scalars['String']['output'];
  /** The shop's slug */
  slug: Scalars['String']['output'];
  /** The shop's socials */
  socials?: Maybe<ShopSocials>;
  /** The shop's storefront url */
  storefrontUrl?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export enum ShopErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  EmailNotVerified = 'EMAIL_NOT_VERIFIED'
}

export type ShopErrorResult = {
  __typename?: 'ShopErrorResult';
  code: ShopErrorCode;
  message: Scalars['String']['output'];
};

export type ShopList = List & {
  __typename?: 'ShopList';
  count: Scalars['Int']['output'];
  items: Array<Shop>;
  pageInfo: PageInfo;
};

export type ShopResult = {
  __typename?: 'ShopResult';
  apiErrors: Array<ShopErrorResult>;
  shop?: Maybe<Shop>;
};

export type ShopSocials = {
  __typename?: 'ShopSocials';
  facebook?: Maybe<Scalars['String']['output']>;
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
};

export type ShopSocialsInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
};

export type State = Node & {
  __typename?: 'State';
  country: Country;
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
};

/**
 * A tag is an arbitrary label which can be applied to certain entities.
 * It is used to help organize and filter those entities.
 */
export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  /** The tag's name */
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export enum TagErrorCode {
  NameAlreadyExists = 'NAME_ALREADY_EXISTS'
}

export type TagErrorResult = {
  __typename?: 'TagErrorResult';
  code: TagErrorCode;
  message: Scalars['String']['output'];
};

export type TagFilters = {
  name?: InputMaybe<StringFilter>;
};

export type TagList = List & {
  __typename?: 'TagList';
  count: Scalars['Int']['output'];
  items: Array<Tag>;
  pageInfo: PageInfo;
};

export type TagListInput = {
  /** Filters to apply */
  filters?: InputMaybe<TagFilters>;
  /** Skip the first n results */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** takes n result from where the skip position is */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type TagResult = {
  __typename?: 'TagResult';
  apiErrors: Array<TagErrorResult>;
  tag?: Maybe<Tag>;
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  references?: InputMaybe<Scalars['String']['input']>;
  streetLine1?: InputMaybe<Scalars['String']['input']>;
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCollectionInput = {
  assets?: InputMaybe<Array<AssetInCollectionInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  subCollections?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDiscountInput = {
  availableCombinations?: InputMaybe<Array<DiscountType>>;
  discountValue?: InputMaybe<Scalars['Int']['input']>;
  discountValueType?: InputMaybe<DiscountValueType>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  endsAt?: InputMaybe<Scalars['Date']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  orderRequirementType?: InputMaybe<OrderRequirementType>;
  orderRequirementValue?: InputMaybe<Scalars['Int']['input']>;
  perCustomerLimit?: InputMaybe<Scalars['Int']['input']>;
  startsAt?: InputMaybe<Scalars['Date']['input']>;
  type?: InputMaybe<DiscountType>;
};

export type UpdateOptionInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<UpdateOptionValueInput>>;
};

export type UpdateOptionValueInput = {
  /**
   * If pressent, the value will be updated.
   * If not, the value will be created and add it to the option
   */
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePaymentMethodInput = {
  /**
   * Specific data for the payment handler chosen
   * Record<string, string | number | boolean>
   */
  args?: InputMaybe<Scalars['JSON']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateProductInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  assets?: InputMaybe<Array<AssetInProductInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateShippingMethodInput = {
  /**
   * Specific data for the payment handler chosen
   * Record<string, string | number | boolean>
   */
  args?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopInput = {
  address?: InputMaybe<CreateAddressInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<ShopSocialsInput>;
  storefrontUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVariantInput = {
  assetId?: InputMaybe<Scalars['ID']['input']>;
  comparisonPrice?: InputMaybe<Scalars['Int']['input']>;
  costPerUnit?: InputMaybe<Scalars['Int']['input']>;
  optionValues?: InputMaybe<Array<Scalars['ID']['input']>>;
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  salePrice?: InputMaybe<Scalars['Int']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateZoneInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  stateIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  /** The user's email (unique) */
  email: Scalars['String']['output'];
  /** Determines if the user's email has been verified */
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  /** The user's shops */
  shops: ShopList;
  updatedAt: Scalars['Date']['output'];
};

export type UserAccessTokenResult = {
  __typename?: 'UserAccessTokenResult';
  accessToken?: Maybe<Scalars['String']['output']>;
  apiErrors: Array<UserErrorResult>;
};

export enum UserErrorCode {
  EmailAlreadyExists = 'EMAIL_ALREADY_EXISTS',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidEmail = 'INVALID_EMAIL',
  PasswordInvalidLength = 'PASSWORD_INVALID_LENGTH'
}

export type UserErrorResult = {
  __typename?: 'UserErrorResult';
  code: UserErrorCode;
  message: Scalars['String']['output'];
};

export type UserList = List & {
  __typename?: 'UserList';
  count: Scalars['Int']['output'];
  items: Array<User>;
  pageInfo: PageInfo;
};

export type UserResult = {
  __typename?: 'UserResult';
  apiErrors: Array<UserErrorResult>;
  user?: Maybe<User>;
};

/**
 * A variant is a specific version of a product.
 * For example, a product can have a variant with a specific color, size, or material.
 */
export type Variant = Node & {
  __typename?: 'Variant';
  asset?: Maybe<Asset>;
  /**
   * The variant's comparison price.
   * Useful when you want to mark a variant as on sale. Comparison price should be higher than the sale price.
   */
  comparisonPrice?: Maybe<Scalars['Int']['output']>;
  /**
   * The variant's cost per unit.
   * Useful when you want to calculate the profit of a variant.
   */
  costPerUnit?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  optionValues: Array<OptionValue>;
  product: Product;
  /**
   * The variant's weight
   * Useful when you want to indicate that the variant needs shipping.
   */
  requiresShipping: Scalars['Boolean']['output'];
  /** The variant's sale price */
  salePrice: Scalars['Int']['output'];
  /** The variant's SKU */
  sku?: Maybe<Scalars['String']['output']>;
  /** The variant's stock */
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type VariantList = List & {
  __typename?: 'VariantList';
  count: Scalars['Int']['output'];
  items: Array<Variant>;
  pageInfo: PageInfo;
};

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shippingMethods: Array<ShippingMethod>;
  states: Array<State>;
  updatedAt: Scalars['Date']['output'];
};

export type CommonCollectionFragment = {
  __typename?: 'Collection';
  id: string;
  name: string;
  description?: string | null;
  enabled: boolean;
  contentType: CollectionContentType;
  products: { __typename?: 'ProductList'; items: Array<{ __typename?: 'Product'; id: string }> };
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; name: string; source: string }>;
  };
} & { ' $fragmentName'?: 'CommonCollectionFragment' };

export type CommonCollectionProductFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  slug: string;
  enabled: boolean;
} & { ' $fragmentName'?: 'CommonCollectionProductFragment' };

export type CommonCollectionSubCollectionFragment = {
  __typename?: 'Collection';
  id: string;
  name: string;
  enabled: boolean;
  products: { __typename?: 'ProductList'; count: number };
} & { ' $fragmentName'?: 'CommonCollectionSubCollectionFragment' };

export type CommonSubCollectionForSelectorFragment = {
  __typename?: 'Collection';
  id: string;
  name: string;
} & { ' $fragmentName'?: 'CommonSubCollectionForSelectorFragment' };

export type GetAllCollectionsQueryVariables = Exact<{
  input?: InputMaybe<CollectionListInput>;
}>;

export type GetAllCollectionsQuery = {
  __typename?: 'Query';
  collections: {
    __typename?: 'CollectionList';
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Collection';
      id: string;
      name: string;
      slug: string;
      enabled: boolean;
      contentType: CollectionContentType;
      assets: {
        __typename?: 'AssetList';
        items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
      };
      subCollections: {
        __typename?: 'CollectionList';
        count: number;
        items: Array<{ __typename?: 'Collection'; id: string; name: string }>;
      };
      products: {
        __typename?: 'ProductList';
        count: number;
        items: Array<{ __typename?: 'Product'; id: string; name: string }>;
      };
    }>;
  };
};

export type GetCollectionQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetCollectionQuery = {
  __typename?: 'Query';
  collection?:
    | ({ __typename?: 'Collection' } & {
        ' $fragmentRefs'?: { CommonCollectionFragment: CommonCollectionFragment };
      })
    | null;
};

export type GetCollectionProductsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<ProductListInput>;
}>;

export type GetCollectionProductsQuery = {
  __typename?: 'Query';
  collection?: {
    __typename?: 'Collection';
    products: {
      __typename?: 'ProductList';
      count: number;
      items: Array<
        { __typename?: 'Product' } & {
          ' $fragmentRefs'?: { CommonCollectionProductFragment: CommonCollectionProductFragment };
        }
      >;
    };
  } | null;
};

export type GetCollectionSubCollectionsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input?: InputMaybe<CollectionListInput>;
}>;

export type GetCollectionSubCollectionsQuery = {
  __typename?: 'Query';
  collection?: {
    __typename?: 'Collection';
    subCollections: {
      __typename?: 'CollectionList';
      count: number;
      items: Array<
        { __typename?: 'Collection' } & {
          ' $fragmentRefs'?: {
            CommonCollectionSubCollectionFragment: CommonCollectionSubCollectionFragment;
          };
        }
      >;
    };
  } | null;
};

export type GetAllSubCollectionsForSelectorQueryVariables = Exact<{
  input?: InputMaybe<CollectionListInput>;
}>;

export type GetAllSubCollectionsForSelectorQuery = {
  __typename?: 'Query';
  collections: {
    __typename?: 'CollectionList';
    items: Array<
      { __typename?: 'Collection' } & {
        ' $fragmentRefs'?: {
          CommonSubCollectionForSelectorFragment: CommonSubCollectionForSelectorFragment;
        };
      }
    >;
  };
};

export type CreateCollectionMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;

export type CreateCollectionMutation = {
  __typename?: 'Mutation';
  createCollection: { __typename?: 'Collection'; id: string };
};

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCollectionInput;
}>;

export type UpdateCollectionMutation = {
  __typename?: 'Mutation';
  updateCollection: { __typename?: 'Collection'; id: string };
};

export type RemoveCollectionMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;

export type RemoveCollectionMutation = { __typename?: 'Mutation'; removeCollection: boolean };

export type CommonCountryFragment = {
  __typename?: 'Country';
  id: string;
  name: string;
  states: Array<{ __typename?: 'State'; id: string; name: string }>;
} & { ' $fragmentName'?: 'CommonCountryFragment' };

export type CommonCountryForSelectorFragment = {
  __typename?: 'Country';
  id: string;
  name: string;
} & { ' $fragmentName'?: 'CommonCountryForSelectorFragment' };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountriesQuery = {
  __typename?: 'Query';
  countries: Array<
    { __typename?: 'Country' } & {
      ' $fragmentRefs'?: { CommonCountryFragment: CommonCountryFragment };
    }
  >;
};

export type GetCountriesForSelectorQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountriesForSelectorQuery = {
  __typename?: 'Query';
  countries: Array<
    { __typename?: 'Country' } & {
      ' $fragmentRefs'?: { CommonCountryForSelectorFragment: CommonCountryForSelectorFragment };
    }
  >;
};

export type CommonCustomerFragment = {
  __typename?: 'Customer';
  id: string;
  createdAt: any;
  firstName?: string | null;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  enabled: boolean;
  totalSpent: number;
  orders: { __typename?: 'OrderList'; count: number };
} & { ' $fragmentName'?: 'CommonCustomerFragment' };

export type CommonCustomerOrderFragment = {
  __typename?: 'Order';
  id: string;
  code: string;
  placedAt?: any | null;
  state: OrderState;
  total: number;
  shipment?: { __typename?: 'Shipment'; method: string } | null;
} & { ' $fragmentName'?: 'CommonCustomerOrderFragment' };

export type GetAllCustomersQueryQueryVariables = Exact<{
  input?: InputMaybe<CustomerListInput>;
}>;

export type GetAllCustomersQueryQuery = {
  __typename?: 'Query';
  customers: {
    __typename?: 'CustomerList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Customer';
      id: string;
      firstName?: string | null;
      lastName: string;
      email: string;
      enabled: boolean;
      totalSpent: number;
      orders: { __typename?: 'OrderList'; count: number };
    }>;
  };
};

export type GetAllCustomerOrdersQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  input?: InputMaybe<OrderListInput>;
}>;

export type GetAllCustomerOrdersQueryQuery = {
  __typename?: 'Query';
  customer?: {
    __typename?: 'Customer';
    orders: {
      __typename?: 'OrderList';
      count: number;
      items: Array<
        { __typename?: 'Order' } & {
          ' $fragmentRefs'?: { CommonCustomerOrderFragment: CommonCustomerOrderFragment };
        }
      >;
    };
  } | null;
};

export type GetCustomerByIdQueryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCustomerByIdQueryQuery = {
  __typename?: 'Query';
  customer?:
    | ({ __typename?: 'Customer' } & {
        ' $fragmentRefs'?: { CommonCustomerFragment: CommonCustomerFragment };
      })
    | null;
};

export type UpdateCustomerMutationMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
  input: UpdateCustomerInput;
}>;

export type UpdateCustomerMutationMutation = {
  __typename?: 'Mutation';
  updateCustomer: {
    __typename?: 'CustomerResult';
    apiErrors: Array<{
      __typename?: 'CustomerErrorResult';
      code: CustomerErrorCode;
      message: string;
    }>;
    customer?: { __typename?: 'Customer'; id: string } | null;
  };
};

export type CommonDiscountFragment = {
  __typename?: 'Discount';
  id: string;
  createdAt: any;
  handle: string;
  applicationMode: DiscountApplicationMode;
  availableCombinations?: Array<DiscountType> | null;
  discountValueType: DiscountValueType;
  discountValue: number;
  enabled: boolean;
  startsAt: any;
  endsAt?: any | null;
  orderRequirementType?: OrderRequirementType | null;
  orderRequirementValue?: number | null;
  perCustomerLimit?: number | null;
  type: DiscountType;
  metadata?: any | null;
} & { ' $fragmentName'?: 'CommonDiscountFragment' };

export type GetAllDiscountsQueryVariables = Exact<{
  input?: InputMaybe<DiscountListInput>;
}>;

export type GetAllDiscountsQuery = {
  __typename?: 'Query';
  discounts: {
    __typename?: 'DiscountList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Discount';
      id: string;
      handle: string;
      applicationMode: DiscountApplicationMode;
      discountValueType: DiscountValueType;
      discountValue: number;
      enabled: boolean;
      startsAt: any;
      endsAt?: any | null;
      type: DiscountType;
      metadata?: any | null;
    }>;
  };
};

export type GetDiscountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetDiscountQuery = {
  __typename?: 'Query';
  discount?:
    | ({ __typename?: 'Discount' } & {
        ' $fragmentRefs'?: { CommonDiscountFragment: CommonDiscountFragment };
      })
    | null;
};

export type CreateDiscountMutationVariables = Exact<{
  input: CreateDiscountInput;
}>;

export type CreateDiscountMutation = {
  __typename?: 'Mutation';
  createDiscount: {
    __typename?: 'DiscountResult';
    apiErrors: Array<{
      __typename?: 'DiscountErrorResult';
      code: DiscountErrorCode;
      message: string;
    }>;
    discount?: { __typename?: 'Discount'; id: string } | null;
  };
};

export type UpdateDiscountMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateDiscountInput;
}>;

export type UpdateDiscountMutation = {
  __typename?: 'Mutation';
  updateDiscount: {
    __typename?: 'DiscountResult';
    apiErrors: Array<{
      __typename?: 'DiscountErrorResult';
      code: DiscountErrorCode;
      message: string;
    }>;
    discount?: { __typename?: 'Discount'; id: string } | null;
  };
};

export type RemoveDiscountMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;

export type RemoveDiscountMutation = { __typename?: 'Mutation'; removeDiscounts?: boolean | null };

export type CommonMetricsResultFragment = {
  __typename?: 'MetricsResult';
  total: number;
  metrics: Array<{ __typename?: 'Metric'; key: string; value: number }>;
} & { ' $fragmentName'?: 'CommonMetricsResultFragment' };

export type GetTotalSalesQueryVariables = Exact<{
  input: MetricsInput;
}>;

export type GetTotalSalesQuery = {
  __typename?: 'Query';
  totalSales: { __typename?: 'MetricsResult' } & {
    ' $fragmentRefs'?: { CommonMetricsResultFragment: CommonMetricsResultFragment };
  };
};

export type GetTotalOrdersQueryVariables = Exact<{
  input: MetricsInput;
}>;

export type GetTotalOrdersQuery = {
  __typename?: 'Query';
  totalOrders: { __typename?: 'MetricsResult' } & {
    ' $fragmentRefs'?: { CommonMetricsResultFragment: CommonMetricsResultFragment };
  };
};

export type CreateOptionMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateOptionInput;
}>;

export type CreateOptionMutation = {
  __typename?: 'Mutation';
  createOption: {
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  };
};

export type UpdateOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateOptionInput;
}>;

export type UpdateOptionMutation = {
  __typename?: 'Mutation';
  updateOption: {
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  };
};

export type RemoveOptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveOptionMutation = {
  __typename?: 'Mutation';
  softRemoveOption: { __typename?: 'Option'; id: string };
};

export type CommonOrderFragment = {
  __typename?: 'Order';
  id: string;
  createdAt: any;
  code: string;
  state: OrderState;
  subtotal: number;
  total: number;
  totalQuantity: number;
  discounts: Array<{
    __typename?: 'ActiveDiscount';
    handle: string;
    applicationMode: DiscountApplicationMode;
    discountedAmount: number;
  }>;
  lines: {
    __typename?: 'OrderLineList';
    items: Array<{
      __typename?: 'OrderLine';
      id: string;
      lineSubtotal: number;
      lineTotal: number;
      quantity: number;
      unitPrice: number;
      discounts: Array<{
        __typename?: 'ActiveDiscount';
        handle: string;
        applicationMode: DiscountApplicationMode;
        discountedAmount: number;
      }>;
      productVariant: {
        __typename?: 'Variant';
        id: string;
        sku?: string | null;
        deletedAt?: any | null;
        optionValues: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
        asset?: { __typename?: 'Asset'; id: string; source: string } | null;
        product: {
          __typename?: 'Product';
          id: string;
          name: string;
          slug: string;
          assets: {
            __typename?: 'AssetList';
            items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
          };
        };
      };
    }>;
  };
  customer?: {
    __typename?: 'Customer';
    id: string;
    email: string;
    firstName?: string | null;
    lastName: string;
    phoneNumber?: string | null;
  } | null;
  shippingAddress?: {
    __typename?: 'AddressJson';
    streetLine1: string;
    streetLine2?: string | null;
    postalCode: string;
    city: string;
    province: string;
    country: string;
  } | null;
  shipment?: {
    __typename?: 'Shipment';
    id: string;
    amount: number;
    total: number;
    carrier?: string | null;
    method: string;
    trackingCode?: string | null;
    discounts: Array<{
      __typename?: 'ActiveDiscount';
      handle: string;
      applicationMode: DiscountApplicationMode;
      discountedAmount: number;
    }>;
  } | null;
  payment?: {
    __typename?: 'Payment';
    id: string;
    amount: number;
    method: string;
    transactionId?: string | null;
  } | null;
} & { ' $fragmentName'?: 'CommonOrderFragment' };

export type GetAllOrdersQueryQueryVariables = Exact<{
  input?: InputMaybe<OrderListInput>;
}>;

export type GetAllOrdersQueryQuery = {
  __typename?: 'Query';
  orders: {
    __typename?: 'OrderList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Order';
      id: string;
      code: string;
      state: OrderState;
      total: number;
      totalQuantity: number;
      placedAt?: any | null;
      customer?: {
        __typename?: 'Customer';
        id: string;
        firstName?: string | null;
        lastName: string;
      } | null;
      shipment?: {
        __typename?: 'Shipment';
        id: string;
        amount: number;
        trackingCode?: string | null;
        method: string;
      } | null;
    }>;
  };
};

export type GetOrderbyIdQueryQueryVariables = Exact<{
  orderId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetOrderbyIdQueryQuery = {
  __typename?: 'Query';
  order?:
    | ({ __typename?: 'Order' } & {
        ' $fragmentRefs'?: { CommonOrderFragment: CommonOrderFragment };
      })
    | null;
};

export type MarkAsShippedMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  input: MarkOrderAsShippedInput;
}>;

export type MarkAsShippedMutation = {
  __typename?: 'Mutation';
  markOrderAsShipped: {
    __typename?: 'OrderResult';
    apiErrors: Array<{ __typename?: 'OrderErrorResult'; code: OrderErrorCode; message: string }>;
    order?: { __typename?: 'Order'; id: string } | null;
  };
};

export type MarkAsDeliveredMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type MarkAsDeliveredMutation = {
  __typename?: 'Mutation';
  markOrderAsDelivered: {
    __typename?: 'OrderResult';
    apiErrors: Array<{ __typename?: 'OrderErrorResult'; code: OrderErrorCode; message: string }>;
    order?: { __typename?: 'Order'; id: string } | null;
  };
};

export type CancelOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;

export type CancelOrderMutation = {
  __typename?: 'Mutation';
  cancelOrder: {
    __typename?: 'OrderResult';
    apiErrors: Array<{ __typename?: 'OrderErrorResult'; code: OrderErrorCode; message: string }>;
    order?: { __typename?: 'Order'; id: string } | null;
  };
};

export type CommonPaymentHandlerFragment = {
  __typename?: 'PaymentHandler';
  icon?: string | null;
  name: string;
  code: string;
  args: any;
} & { ' $fragmentName'?: 'CommonPaymentHandlerFragment' };

export type CommonPaymentMethodFragment = {
  __typename?: 'PaymentMethod';
  id: string;
  name: string;
  icon?: string | null;
  enabled: boolean;
  args: any;
} & { ' $fragmentName'?: 'CommonPaymentMethodFragment' };

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPaymentMethodsQuery = {
  __typename?: 'Query';
  paymentMethods: Array<
    { __typename?: 'PaymentMethod' } & {
      ' $fragmentRefs'?: { CommonPaymentMethodFragment: CommonPaymentMethodFragment };
    }
  >;
};

export type GetPaymentMethodQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPaymentMethodQuery = {
  __typename?: 'Query';
  paymentMethod?:
    | ({ __typename?: 'PaymentMethod' } & {
        ' $fragmentRefs'?: { CommonPaymentMethodFragment: CommonPaymentMethodFragment };
      })
    | null;
};

export type GetPaymentHandlersQueryVariables = Exact<{ [key: string]: never }>;

export type GetPaymentHandlersQuery = {
  __typename?: 'Query';
  paymentHandlers: Array<
    { __typename?: 'PaymentHandler' } & {
      ' $fragmentRefs'?: { CommonPaymentHandlerFragment: CommonPaymentHandlerFragment };
    }
  >;
};

export type CreatePaymentMethodMutationVariables = Exact<{
  input: CreatePaymentMethodInput;
}>;

export type CreatePaymentMethodMutation = {
  __typename?: 'Mutation';
  createPaymentMethod: {
    __typename?: 'PaymentMethodResult';
    apiErrors: Array<{
      __typename?: 'PaymentMethodErrorResult';
      code: PaymentMethodErrorCode;
      message: string;
    }>;
    paymentMethod?: { __typename?: 'PaymentMethod'; id: string } | null;
  };
};

export type UpdatePaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdatePaymentMethodInput;
}>;

export type UpdatePaymentMethodMutation = {
  __typename?: 'Mutation';
  updatePaymentMethod: { __typename?: 'PaymentMethod'; id: string };
};

export type RemovePaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemovePaymentMethodMutation = { __typename?: 'Mutation'; removePaymentMethod: boolean };

export type CommonProductFragment = {
  __typename?: 'Product';
  id: string;
  createdAt: any;
  name: string;
  description?: string | null;
  enabled: boolean;
  tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
  variants: {
    __typename?: 'VariantList';
    items: Array<{
      __typename?: 'Variant';
      id: string;
      salePrice: number;
      sku?: string | null;
      stock: number;
      comparisonPrice?: number | null;
      costPerUnit?: number | null;
      requiresShipping: boolean;
      optionValues: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
      asset?: { __typename?: 'Asset'; id: string; source: string } | null;
    }>;
  };
  options: Array<{
    __typename?: 'Option';
    id: string;
    name: string;
    values: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
  }>;
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; name: string; source: string; order: number }>;
  };
} & { ' $fragmentName'?: 'CommonProductFragment' };

export type CommonProductForSelectorFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
  };
} & { ' $fragmentName'?: 'CommonProductForSelectorFragment' };

export type CommonEnhancedProductForSelectorFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  variants: {
    __typename?: 'VariantList';
    items: Array<{
      __typename?: 'Variant';
      id: string;
      salePrice: number;
      optionValues: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
    }>;
  };
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
  };
} & { ' $fragmentName'?: 'CommonEnhancedProductForSelectorFragment' };

export type CommonDiscountApplicableProductFragment = {
  __typename?: 'Product';
  id: string;
  name: string;
  slug: string;
  assets: {
    __typename?: 'AssetList';
    items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
  };
  variants: {
    __typename?: 'VariantList';
    items: Array<{
      __typename?: 'Variant';
      id: string;
      salePrice: number;
      optionValues: Array<{ __typename?: 'OptionValue'; id: string; name: string }>;
    }>;
  };
} & { ' $fragmentName'?: 'CommonDiscountApplicableProductFragment' };

export type GetProductsQueryVariables = Exact<{
  input?: InputMaybe<ProductListInput>;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<{
      __typename?: 'Product';
      id: string;
      createdAt: any;
      name: string;
      slug: string;
      enabled: boolean;
      variants: {
        __typename?: 'VariantList';
        items: Array<{
          __typename?: 'Variant';
          id: string;
          sku?: string | null;
          stock: number;
          salePrice: number;
        }>;
      };
      assets: {
        __typename?: 'AssetList';
        items: Array<{ __typename?: 'Asset'; id: string; source: string }>;
      };
    }>;
  };
};

export type GetProductsForSelectorQueryVariables = Exact<{
  input?: InputMaybe<ProductListInput>;
}>;

export type GetProductsForSelectorQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductList';
    items: Array<
      { __typename?: 'Product' } & {
        ' $fragmentRefs'?: { CommonProductForSelectorFragment: CommonProductForSelectorFragment };
      }
    >;
  };
};

export type GetAllEnhancedProductsForSelectorQueryVariables = Exact<{
  input?: InputMaybe<ProductListInput>;
}>;

export type GetAllEnhancedProductsForSelectorQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductList';
    items: Array<
      { __typename?: 'Product' } & {
        ' $fragmentRefs'?: {
          CommonEnhancedProductForSelectorFragment: CommonEnhancedProductForSelectorFragment;
        };
      }
    >;
  };
};

export type GetDiscountApplicableProductsQueryQueryVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  input?: InputMaybe<ProductListInput>;
}>;

export type GetDiscountApplicableProductsQueryQuery = {
  __typename?: 'Query';
  productsByVariantIds: {
    __typename?: 'ProductList';
    count: number;
    pageInfo: { __typename?: 'PageInfo'; total: number };
    items: Array<
      { __typename?: 'Product' } & {
        ' $fragmentRefs'?: {
          CommonDiscountApplicableProductFragment: CommonDiscountApplicableProductFragment;
        };
      }
    >;
  };
};

export type GetProductQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product?:
    | ({ __typename?: 'Product' } & {
        ' $fragmentRefs'?: { CommonProductFragment: CommonProductFragment };
      })
    | null;
};

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;

export type CreateProductMutation = {
  __typename?: 'Mutation';
  createProduct: { __typename?: 'Product'; id: string };
};

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;

export type UpdateProductMutation = {
  __typename?: 'Mutation';
  updateProduct: { __typename?: 'Product'; id: string };
};

export type RemoveProductMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;

export type RemoveProductMutation = { __typename?: 'Mutation'; softRemoveProduct: boolean };

export type CommonShippingHandlersFragment = {
  __typename?: 'ShippingHandler';
  name: string;
  code: string;
  args: any;
} & { ' $fragmentName'?: 'CommonShippingHandlersFragment' };

export type GetAllHandlersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllHandlersQuery = {
  __typename?: 'Query';
  shippingHandlers: Array<
    { __typename?: 'ShippingHandler' } & {
      ' $fragmentRefs'?: { CommonShippingHandlersFragment: CommonShippingHandlersFragment };
    }
  >;
};

export type CreateShippingMethodMutationVariables = Exact<{
  input: CreateShippingMethodInput;
}>;

export type CreateShippingMethodMutation = {
  __typename?: 'Mutation';
  createShippingMethod: {
    __typename?: 'ShippingMethodResult';
    apiErrors: Array<{
      __typename?: 'ShippingMethodErrorResult';
      code: ShippingMethodErrorCode;
      message: string;
    }>;
    shippingMethod?: { __typename?: 'ShippingMethod'; id: string } | null;
  };
};

export type UpdateShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateShippingMethodInput;
}>;

export type UpdateShippingMethodMutation = {
  __typename?: 'Mutation';
  updateShippingMethod: { __typename?: 'ShippingMethod'; id: string };
};

export type RemoveShippingMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveShippingMethodMutation = {
  __typename?: 'Mutation';
  removeShippingMethod: boolean;
};

export type CommonShopFragment = {
  __typename?: 'Shop';
  id: string;
  name: string;
  slug: string;
  email: string;
  logo?: string | null;
  phoneNumber: string;
  shopApiKey: string;
  socials?: {
    __typename?: 'ShopSocials';
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
  } | null;
} & { ' $fragmentName'?: 'CommonShopFragment' };

export type CommonListShopFragment = {
  __typename?: 'Shop';
  id: string;
  name: string;
  slug: string;
} & { ' $fragmentName'?: 'CommonListShopFragment' };

export type GetShopsQueryVariables = Exact<{ [key: string]: never }>;

export type GetShopsQuery = {
  __typename?: 'Query';
  shops: {
    __typename?: 'ShopList';
    items: Array<
      { __typename?: 'Shop' } & {
        ' $fragmentRefs'?: { CommonListShopFragment: CommonListShopFragment };
      }
    >;
  };
};

export type ShopQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;

export type ShopQuery = {
  __typename?: 'Query';
  shop?:
    | ({ __typename?: 'Shop' } & { ' $fragmentRefs'?: { CommonShopFragment: CommonShopFragment } })
    | null;
};

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;

export type CreateShopMutation = {
  __typename?: 'Mutation';
  createShop: {
    __typename?: 'ShopResult';
    apiErrors: Array<{ __typename?: 'ShopErrorResult'; message: string; code: ShopErrorCode }>;
    shop?: { __typename?: 'Shop'; id: string; slug: string } | null;
  };
};

export type UpdateShopMutationVariables = Exact<{
  shopSlug: Scalars['String']['input'];
  input: UpdateShopInput;
}>;

export type UpdateShopMutation = {
  __typename?: 'Mutation';
  updateShop: {
    __typename?: 'ShopResult';
    apiErrors: Array<{ __typename?: 'ShopErrorResult'; message: string; code: ShopErrorCode }>;
    shop?: { __typename?: 'Shop'; id: string; slug: string } | null;
  };
};

export type GenerateShopApiKeyMutationVariables = Exact<{ [key: string]: never }>;

export type GenerateShopApiKeyMutation = {
  __typename?: 'Mutation';
  generateShopApiKey: {
    __typename?: 'ShopResult';
    shop?: { __typename?: 'Shop'; id: string; slug: string } | null;
  };
};

export type CommonTagFragment = { __typename?: 'Tag'; id: string; name: string } & {
  ' $fragmentName'?: 'CommonTagFragment';
};

export type GetAllTagsQueryVariables = Exact<{
  input?: InputMaybe<TagListInput>;
}>;

export type GetAllTagsQuery = {
  __typename?: 'Query';
  tags: {
    __typename?: 'TagList';
    items: Array<
      { __typename?: 'Tag' } & { ' $fragmentRefs'?: { CommonTagFragment: CommonTagFragment } }
    >;
  };
};

export type CreateTagsMutationVariables = Exact<{
  input: Array<CreateTagInput> | CreateTagInput;
}>;

export type CreateTagsMutation = {
  __typename?: 'Mutation';
  createTags: {
    __typename?: 'CreateTagsResult';
    apiErrors: Array<{ __typename?: 'TagErrorResult'; code: TagErrorCode; message: string }>;
    tags: Array<{ __typename?: 'Tag'; id: string }>;
  };
};

export type CommonUserFragment = {
  __typename?: 'User';
  id: string;
  email: string;
  emailVerified: boolean;
} & { ' $fragmentName'?: 'CommonUserFragment' };

export type WhoamiQueryVariables = Exact<{ [key: string]: never }>;

export type WhoamiQuery = {
  __typename?: 'Query';
  whoami?:
    | ({ __typename?: 'User' } & { ' $fragmentRefs'?: { CommonUserFragment: CommonUserFragment } })
    | null;
};

export type GenerateAccessTokenMutationVariables = Exact<{
  input: GenerateUserAccessTokenInput;
}>;

export type GenerateAccessTokenMutation = {
  __typename?: 'Mutation';
  generateUserAccessToken: {
    __typename?: 'UserAccessTokenResult';
    accessToken?: string | null;
    apiErrors: Array<{ __typename?: 'UserErrorResult'; code: UserErrorCode; message: string }>;
  };
};

export type ValidateAccessTokenQueryVariables = Exact<{ [key: string]: never }>;

export type ValidateAccessTokenQuery = {
  __typename?: 'Query';
  validateAccessToken?: boolean | null;
};

export type CreateVariantMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  input: CreateVariantInput;
}>;

export type CreateVariantMutation = {
  __typename?: 'Mutation';
  createVariant: { __typename?: 'Variant'; id: string };
};

export type UpdateVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateVariantInput;
}>;

export type UpdateVariantMutation = {
  __typename?: 'Mutation';
  updateVariant: { __typename?: 'Variant'; id: string };
};

export type SoftRemoveVariantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type SoftRemoveVariantMutation = {
  __typename?: 'Mutation';
  softRemoveVariant: { __typename?: 'Variant'; id: string };
};

export type CommonZoneFragment = {
  __typename?: 'Zone';
  id: string;
  name: string;
  createdAt: any;
  states: Array<{
    __typename?: 'State';
    id: string;
    name: string;
    country: { __typename?: 'Country'; id: string; name: string };
  }>;
  shippingMethods: Array<{
    __typename?: 'ShippingMethod';
    id: string;
    name: string;
    description?: string | null;
    enabled: boolean;
    args: any;
    code: string;
    pricePreview: number;
  }>;
} & { ' $fragmentName'?: 'CommonZoneFragment' };

export type GetAllZonesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllZonesQuery = {
  __typename?: 'Query';
  zones: Array<{
    __typename?: 'Zone';
    id: string;
    name: string;
    shippingMethods: Array<{ __typename?: 'ShippingMethod'; id: string }>;
  }>;
};

export type GetZoneQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetZoneQuery = {
  __typename?: 'Query';
  zone: { __typename?: 'Zone' } & { ' $fragmentRefs'?: { CommonZoneFragment: CommonZoneFragment } };
};

export type CreateZoneMutationVariables = Exact<{
  input: CreateZoneInput;
}>;

export type CreateZoneMutation = {
  __typename?: 'Mutation';
  createZone: { __typename?: 'Zone'; id: string };
};

export type UpdateZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateZoneInput;
}>;

export type UpdateZoneMutation = {
  __typename?: 'Mutation';
  updateZone: { __typename?: 'Zone'; id: string };
};

export type RemoveZoneMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type RemoveZoneMutation = { __typename?: 'Mutation'; removeZone: boolean };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any> | undefined
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CommonCollectionFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCollection on Collection {
  id
  name
  description
  enabled
  contentType
  products {
    items {
      id
    }
  }
  assets(input: {take: 1}) {
    items {
      id
      name
      source
    }
  }
}
    `,
  { fragmentName: 'CommonCollection' }
) as unknown as TypedDocumentString<CommonCollectionFragment, unknown>;
export const CommonCollectionProductFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCollectionProduct on Product {
  id
  name
  slug
  enabled
}
    `,
  { fragmentName: 'CommonCollectionProduct' }
) as unknown as TypedDocumentString<CommonCollectionProductFragment, unknown>;
export const CommonCollectionSubCollectionFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCollectionSubCollection on Collection {
  id
  name
  products {
    count
  }
  enabled
}
    `,
  { fragmentName: 'CommonCollectionSubCollection' }
) as unknown as TypedDocumentString<CommonCollectionSubCollectionFragment, unknown>;
export const CommonSubCollectionForSelectorFragmentDoc = new TypedDocumentString(
  `
    fragment CommonSubCollectionForSelector on Collection {
  id
  name
}
    `,
  { fragmentName: 'CommonSubCollectionForSelector' }
) as unknown as TypedDocumentString<CommonSubCollectionForSelectorFragment, unknown>;
export const CommonCountryFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCountry on Country {
  id
  name
  states {
    id
    name
  }
}
    `,
  { fragmentName: 'CommonCountry' }
) as unknown as TypedDocumentString<CommonCountryFragment, unknown>;
export const CommonCountryForSelectorFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCountryForSelector on Country {
  id
  name
}
    `,
  { fragmentName: 'CommonCountryForSelector' }
) as unknown as TypedDocumentString<CommonCountryForSelectorFragment, unknown>;
export const CommonCustomerFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCustomer on Customer {
  id
  createdAt
  firstName
  lastName
  email
  phoneNumber
  enabled
  totalSpent
  orders {
    count
  }
}
    `,
  { fragmentName: 'CommonCustomer' }
) as unknown as TypedDocumentString<CommonCustomerFragment, unknown>;
export const CommonCustomerOrderFragmentDoc = new TypedDocumentString(
  `
    fragment CommonCustomerOrder on Order {
  id
  code
  placedAt
  state
  total
  shipment {
    method
  }
}
    `,
  { fragmentName: 'CommonCustomerOrder' }
) as unknown as TypedDocumentString<CommonCustomerOrderFragment, unknown>;
export const CommonDiscountFragmentDoc = new TypedDocumentString(
  `
    fragment CommonDiscount on Discount {
  id
  createdAt
  handle
  applicationMode
  availableCombinations
  discountValueType
  discountValue
  enabled
  startsAt
  endsAt
  orderRequirementType
  orderRequirementValue
  perCustomerLimit
  type
  metadata
}
    `,
  { fragmentName: 'CommonDiscount' }
) as unknown as TypedDocumentString<CommonDiscountFragment, unknown>;
export const CommonMetricsResultFragmentDoc = new TypedDocumentString(
  `
    fragment CommonMetricsResult on MetricsResult {
  metrics {
    key
    value
  }
  total
}
    `,
  { fragmentName: 'CommonMetricsResult' }
) as unknown as TypedDocumentString<CommonMetricsResultFragment, unknown>;
export const CommonOrderFragmentDoc = new TypedDocumentString(
  `
    fragment CommonOrder on Order {
  id
  createdAt
  code
  state
  subtotal
  total
  totalQuantity
  discounts {
    handle
    applicationMode
    discountedAmount
  }
  lines {
    items {
      id
      lineSubtotal
      lineTotal
      quantity
      unitPrice
      discounts {
        handle
        applicationMode
        discountedAmount
      }
      productVariant {
        id
        sku
        deletedAt
        optionValues {
          id
          name
        }
        asset {
          id
          source
        }
        product {
          id
          name
          slug
          assets(input: {take: 1}) {
            items {
              id
              source
            }
          }
        }
      }
    }
  }
  customer {
    id
    email
    firstName
    lastName
    phoneNumber
  }
  shippingAddress {
    streetLine1
    streetLine2
    postalCode
    city
    province
    country
  }
  shipment {
    id
    amount
    total
    carrier
    method
    trackingCode
    discounts {
      handle
      applicationMode
      discountedAmount
    }
  }
  payment {
    id
    amount
    method
    transactionId
  }
}
    `,
  { fragmentName: 'CommonOrder' }
) as unknown as TypedDocumentString<CommonOrderFragment, unknown>;
export const CommonPaymentHandlerFragmentDoc = new TypedDocumentString(
  `
    fragment CommonPaymentHandler on PaymentHandler {
  icon
  name
  code
  args
}
    `,
  { fragmentName: 'CommonPaymentHandler' }
) as unknown as TypedDocumentString<CommonPaymentHandlerFragment, unknown>;
export const CommonPaymentMethodFragmentDoc = new TypedDocumentString(
  `
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  args
}
    `,
  { fragmentName: 'CommonPaymentMethod' }
) as unknown as TypedDocumentString<CommonPaymentMethodFragment, unknown>;
export const CommonProductFragmentDoc = new TypedDocumentString(
  `
    fragment CommonProduct on Product {
  id
  createdAt
  name
  description
  enabled
  tags {
    id
    name
  }
  variants {
    items {
      id
      salePrice
      sku
      stock
      comparisonPrice
      costPerUnit
      requiresShipping
      optionValues {
        id
        name
      }
      asset {
        id
        source
      }
    }
  }
  options {
    id
    name
    values {
      id
      name
    }
  }
  assets {
    items {
      id
      name
      source
      order
    }
  }
}
    `,
  { fragmentName: 'CommonProduct' }
) as unknown as TypedDocumentString<CommonProductFragment, unknown>;
export const CommonProductForSelectorFragmentDoc = new TypedDocumentString(
  `
    fragment CommonProductForSelector on Product {
  id
  name
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
}
    `,
  { fragmentName: 'CommonProductForSelector' }
) as unknown as TypedDocumentString<CommonProductForSelectorFragment, unknown>;
export const CommonEnhancedProductForSelectorFragmentDoc = new TypedDocumentString(
  `
    fragment CommonEnhancedProductForSelector on Product {
  id
  name
  variants {
    items {
      id
      salePrice
      optionValues {
        id
        name
      }
    }
  }
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
}
    `,
  { fragmentName: 'CommonEnhancedProductForSelector' }
) as unknown as TypedDocumentString<CommonEnhancedProductForSelectorFragment, unknown>;
export const CommonDiscountApplicableProductFragmentDoc = new TypedDocumentString(
  `
    fragment CommonDiscountApplicableProduct on Product {
  id
  name
  slug
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
  variants {
    items {
      id
      salePrice
      optionValues {
        id
        name
      }
    }
  }
}
    `,
  { fragmentName: 'CommonDiscountApplicableProduct' }
) as unknown as TypedDocumentString<CommonDiscountApplicableProductFragment, unknown>;
export const CommonShippingHandlersFragmentDoc = new TypedDocumentString(
  `
    fragment CommonShippingHandlers on ShippingHandler {
  name
  code
  args
}
    `,
  { fragmentName: 'CommonShippingHandlers' }
) as unknown as TypedDocumentString<CommonShippingHandlersFragment, unknown>;
export const CommonShopFragmentDoc = new TypedDocumentString(
  `
    fragment CommonShop on Shop {
  id
  name
  slug
  email
  logo
  socials {
    facebook
    twitter
    instagram
  }
  phoneNumber
  shopApiKey
}
    `,
  { fragmentName: 'CommonShop' }
) as unknown as TypedDocumentString<CommonShopFragment, unknown>;
export const CommonListShopFragmentDoc = new TypedDocumentString(
  `
    fragment CommonListShop on Shop {
  id
  name
  slug
}
    `,
  { fragmentName: 'CommonListShop' }
) as unknown as TypedDocumentString<CommonListShopFragment, unknown>;
export const CommonTagFragmentDoc = new TypedDocumentString(
  `
    fragment CommonTag on Tag {
  id
  name
}
    `,
  { fragmentName: 'CommonTag' }
) as unknown as TypedDocumentString<CommonTagFragment, unknown>;
export const CommonUserFragmentDoc = new TypedDocumentString(
  `
    fragment CommonUser on User {
  id
  email
  emailVerified
}
    `,
  { fragmentName: 'CommonUser' }
) as unknown as TypedDocumentString<CommonUserFragment, unknown>;
export const CommonZoneFragmentDoc = new TypedDocumentString(
  `
    fragment CommonZone on Zone {
  id
  name
  createdAt
  states {
    id
    name
    country {
      id
      name
    }
  }
  shippingMethods {
    id
    name
    description
    enabled
    args
    code
    pricePreview
  }
}
    `,
  { fragmentName: 'CommonZone' }
) as unknown as TypedDocumentString<CommonZoneFragment, unknown>;
export const GetAllCollectionsDocument = new TypedDocumentString(`
    query GetAllCollections($input: CollectionListInput) {
  collections(input: $input) {
    pageInfo {
      total
    }
    items {
      id
      name
      slug
      enabled
      contentType
      assets(input: {take: 1}) {
        items {
          id
          source
        }
      }
      subCollections(input: {take: 8}) {
        count
        items {
          id
          name
        }
      }
      products {
        count
        items {
          id
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllCollectionsQuery, GetAllCollectionsQueryVariables>;
export const GetCollectionDocument = new TypedDocumentString(`
    query GetCollection($id: ID) {
  collection(id: $id) {
    ...CommonCollection
  }
}
    fragment CommonCollection on Collection {
  id
  name
  description
  enabled
  contentType
  products {
    items {
      id
    }
  }
  assets(input: {take: 1}) {
    items {
      id
      name
      source
    }
  }
}`) as unknown as TypedDocumentString<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionProductsDocument = new TypedDocumentString(`
    query GetCollectionProducts($id: ID, $input: ProductListInput) {
  collection(id: $id) {
    products(input: $input) {
      count
      items {
        ...CommonCollectionProduct
      }
    }
  }
}
    fragment CommonCollectionProduct on Product {
  id
  name
  slug
  enabled
}`) as unknown as TypedDocumentString<
  GetCollectionProductsQuery,
  GetCollectionProductsQueryVariables
>;
export const GetCollectionSubCollectionsDocument = new TypedDocumentString(`
    query GetCollectionSubCollections($id: ID, $input: CollectionListInput) {
  collection(id: $id) {
    subCollections(input: $input) {
      count
      items {
        ...CommonCollectionSubCollection
      }
    }
  }
}
    fragment CommonCollectionSubCollection on Collection {
  id
  name
  products {
    count
  }
  enabled
}`) as unknown as TypedDocumentString<
  GetCollectionSubCollectionsQuery,
  GetCollectionSubCollectionsQueryVariables
>;
export const GetAllSubCollectionsForSelectorDocument = new TypedDocumentString(`
    query GetAllSubCollectionsForSelector($input: CollectionListInput) {
  collections(input: $input) {
    items {
      ...CommonSubCollectionForSelector
    }
  }
}
    fragment CommonSubCollectionForSelector on Collection {
  id
  name
}`) as unknown as TypedDocumentString<
  GetAllSubCollectionsForSelectorQuery,
  GetAllSubCollectionsForSelectorQueryVariables
>;
export const CreateCollectionDocument = new TypedDocumentString(`
    mutation CreateCollection($input: CreateCollectionInput!) {
  createCollection(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>;
export const UpdateCollectionDocument = new TypedDocumentString(`
    mutation UpdateCollection($id: ID!, $input: UpdateCollectionInput!) {
  updateCollection(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>;
export const RemoveCollectionDocument = new TypedDocumentString(`
    mutation RemoveCollection($ids: [ID!]!) {
  removeCollection(ids: $ids)
}
    `) as unknown as TypedDocumentString<
  RemoveCollectionMutation,
  RemoveCollectionMutationVariables
>;
export const GetCountriesDocument = new TypedDocumentString(`
    query GetCountries {
  countries {
    ...CommonCountry
  }
}
    fragment CommonCountry on Country {
  id
  name
  states {
    id
    name
  }
}`) as unknown as TypedDocumentString<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetCountriesForSelectorDocument = new TypedDocumentString(`
    query GetCountriesForSelector {
  countries {
    ...CommonCountryForSelector
  }
}
    fragment CommonCountryForSelector on Country {
  id
  name
}`) as unknown as TypedDocumentString<
  GetCountriesForSelectorQuery,
  GetCountriesForSelectorQueryVariables
>;
export const GetAllCustomersQueryDocument = new TypedDocumentString(`
    query GetAllCustomersQuery($input: CustomerListInput) {
  customers(input: $input) {
    count
    pageInfo {
      total
    }
    items {
      id
      firstName
      lastName
      email
      enabled
      totalSpent
      orders {
        count
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
  GetAllCustomersQueryQuery,
  GetAllCustomersQueryQueryVariables
>;
export const GetAllCustomerOrdersQueryDocument = new TypedDocumentString(`
    query GetAllCustomerOrdersQuery($id: ID!, $input: OrderListInput) {
  customer(id: $id) {
    orders(input: $input) {
      count
      items {
        ...CommonCustomerOrder
      }
    }
  }
}
    fragment CommonCustomerOrder on Order {
  id
  code
  placedAt
  state
  total
  shipment {
    method
  }
}`) as unknown as TypedDocumentString<
  GetAllCustomerOrdersQueryQuery,
  GetAllCustomerOrdersQueryQueryVariables
>;
export const GetCustomerByIdQueryDocument = new TypedDocumentString(`
    query GetCustomerByIdQuery($id: ID!) {
  customer(id: $id) {
    ...CommonCustomer
  }
}
    fragment CommonCustomer on Customer {
  id
  createdAt
  firstName
  lastName
  email
  phoneNumber
  enabled
  totalSpent
  orders {
    count
  }
}`) as unknown as TypedDocumentString<
  GetCustomerByIdQueryQuery,
  GetCustomerByIdQueryQueryVariables
>;
export const UpdateCustomerMutationDocument = new TypedDocumentString(`
    mutation UpdateCustomerMutation($customerId: ID!, $input: UpdateCustomerInput!) {
  updateCustomer(id: $customerId, input: $input) {
    apiErrors {
      code
      message
    }
    customer {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
  UpdateCustomerMutationMutation,
  UpdateCustomerMutationMutationVariables
>;
export const GetAllDiscountsDocument = new TypedDocumentString(`
    query GetAllDiscounts($input: DiscountListInput) {
  discounts(input: $input) {
    pageInfo {
      total
    }
    count
    items {
      id
      handle
      applicationMode
      discountValueType
      discountValue
      enabled
      startsAt
      endsAt
      type
      metadata
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllDiscountsQuery, GetAllDiscountsQueryVariables>;
export const GetDiscountDocument = new TypedDocumentString(`
    query GetDiscount($id: ID!) {
  discount(id: $id) {
    ...CommonDiscount
  }
}
    fragment CommonDiscount on Discount {
  id
  createdAt
  handle
  applicationMode
  availableCombinations
  discountValueType
  discountValue
  enabled
  startsAt
  endsAt
  orderRequirementType
  orderRequirementValue
  perCustomerLimit
  type
  metadata
}`) as unknown as TypedDocumentString<GetDiscountQuery, GetDiscountQueryVariables>;
export const CreateDiscountDocument = new TypedDocumentString(`
    mutation CreateDiscount($input: CreateDiscountInput!) {
  createDiscount(input: $input) {
    apiErrors {
      code
      message
    }
    discount {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateDiscountMutation, CreateDiscountMutationVariables>;
export const UpdateDiscountDocument = new TypedDocumentString(`
    mutation UpdateDiscount($id: ID!, $input: UpdateDiscountInput!) {
  updateDiscount(id: $id, input: $input) {
    apiErrors {
      code
      message
    }
    discount {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateDiscountMutation, UpdateDiscountMutationVariables>;
export const RemoveDiscountDocument = new TypedDocumentString(`
    mutation RemoveDiscount($ids: [ID!]!) {
  removeDiscounts(ids: $ids)
}
    `) as unknown as TypedDocumentString<RemoveDiscountMutation, RemoveDiscountMutationVariables>;
export const GetTotalSalesDocument = new TypedDocumentString(`
    query GetTotalSales($input: MetricsInput!) {
  totalSales(input: $input) {
    ...CommonMetricsResult
  }
}
    fragment CommonMetricsResult on MetricsResult {
  metrics {
    key
    value
  }
  total
}`) as unknown as TypedDocumentString<GetTotalSalesQuery, GetTotalSalesQueryVariables>;
export const GetTotalOrdersDocument = new TypedDocumentString(`
    query GetTotalOrders($input: MetricsInput!) {
  totalOrders(input: $input) {
    ...CommonMetricsResult
  }
}
    fragment CommonMetricsResult on MetricsResult {
  metrics {
    key
    value
  }
  total
}`) as unknown as TypedDocumentString<GetTotalOrdersQuery, GetTotalOrdersQueryVariables>;
export const CreateOptionDocument = new TypedDocumentString(`
    mutation CreateOption($productId: ID!, $input: CreateOptionInput!) {
  createOption(productId: $productId, input: $input) {
    id
    name
    values {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOptionMutation, CreateOptionMutationVariables>;
export const UpdateOptionDocument = new TypedDocumentString(`
    mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {
  updateOption(id: $id, input: $input) {
    id
    name
    values {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateOptionMutation, UpdateOptionMutationVariables>;
export const RemoveOptionDocument = new TypedDocumentString(`
    mutation RemoveOption($id: ID!) {
  softRemoveOption(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<RemoveOptionMutation, RemoveOptionMutationVariables>;
export const GetAllOrdersQueryDocument = new TypedDocumentString(`
    query GetAllOrdersQuery($input: OrderListInput) {
  orders(input: $input) {
    count
    pageInfo {
      total
    }
    items {
      id
      code
      state
      total
      totalQuantity
      placedAt
      customer {
        id
        firstName
        lastName
      }
      shipment {
        id
        amount
        trackingCode
        method
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllOrdersQueryQuery, GetAllOrdersQueryQueryVariables>;
export const GetOrderbyIdQueryDocument = new TypedDocumentString(`
    query GetOrderbyIdQuery($orderId: ID) {
  order(id: $orderId) {
    ...CommonOrder
  }
}
    fragment CommonOrder on Order {
  id
  createdAt
  code
  state
  subtotal
  total
  totalQuantity
  discounts {
    handle
    applicationMode
    discountedAmount
  }
  lines {
    items {
      id
      lineSubtotal
      lineTotal
      quantity
      unitPrice
      discounts {
        handle
        applicationMode
        discountedAmount
      }
      productVariant {
        id
        sku
        deletedAt
        optionValues {
          id
          name
        }
        asset {
          id
          source
        }
        product {
          id
          name
          slug
          assets(input: {take: 1}) {
            items {
              id
              source
            }
          }
        }
      }
    }
  }
  customer {
    id
    email
    firstName
    lastName
    phoneNumber
  }
  shippingAddress {
    streetLine1
    streetLine2
    postalCode
    city
    province
    country
  }
  shipment {
    id
    amount
    total
    carrier
    method
    trackingCode
    discounts {
      handle
      applicationMode
      discountedAmount
    }
  }
  payment {
    id
    amount
    method
    transactionId
  }
}`) as unknown as TypedDocumentString<GetOrderbyIdQueryQuery, GetOrderbyIdQueryQueryVariables>;
export const MarkAsShippedDocument = new TypedDocumentString(`
    mutation MarkAsShipped($orderId: ID!, $input: MarkOrderAsShippedInput!) {
  markOrderAsShipped(id: $orderId, input: $input) {
    apiErrors {
      code
      message
    }
    order {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<MarkAsShippedMutation, MarkAsShippedMutationVariables>;
export const MarkAsDeliveredDocument = new TypedDocumentString(`
    mutation MarkAsDelivered($orderId: ID!) {
  markOrderAsDelivered(id: $orderId) {
    apiErrors {
      code
      message
    }
    order {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<MarkAsDeliveredMutation, MarkAsDeliveredMutationVariables>;
export const CancelOrderDocument = new TypedDocumentString(`
    mutation CancelOrder($orderId: ID!) {
  cancelOrder(id: $orderId) {
    apiErrors {
      code
      message
    }
    order {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CancelOrderMutation, CancelOrderMutationVariables>;
export const GetPaymentMethodsDocument = new TypedDocumentString(`
    query GetPaymentMethods {
  paymentMethods {
    ...CommonPaymentMethod
  }
}
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  args
}`) as unknown as TypedDocumentString<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>;
export const GetPaymentMethodDocument = new TypedDocumentString(`
    query GetPaymentMethod($id: ID!) {
  paymentMethod(id: $id) {
    ...CommonPaymentMethod
  }
}
    fragment CommonPaymentMethod on PaymentMethod {
  id
  name
  icon
  enabled
  args
}`) as unknown as TypedDocumentString<GetPaymentMethodQuery, GetPaymentMethodQueryVariables>;
export const GetPaymentHandlersDocument = new TypedDocumentString(`
    query GetPaymentHandlers {
  paymentHandlers {
    ...CommonPaymentHandler
  }
}
    fragment CommonPaymentHandler on PaymentHandler {
  icon
  name
  code
  args
}`) as unknown as TypedDocumentString<GetPaymentHandlersQuery, GetPaymentHandlersQueryVariables>;
export const CreatePaymentMethodDocument = new TypedDocumentString(`
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
  createPaymentMethod(input: $input) {
    apiErrors {
      code
      message
    }
    paymentMethod {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
  CreatePaymentMethodMutation,
  CreatePaymentMethodMutationVariables
>;
export const UpdatePaymentMethodDocument = new TypedDocumentString(`
    mutation UpdatePaymentMethod($id: ID!, $input: UpdatePaymentMethodInput!) {
  updatePaymentMethod(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  UpdatePaymentMethodMutation,
  UpdatePaymentMethodMutationVariables
>;
export const RemovePaymentMethodDocument = new TypedDocumentString(`
    mutation RemovePaymentMethod($id: ID!) {
  removePaymentMethod(id: $id)
}
    `) as unknown as TypedDocumentString<
  RemovePaymentMethodMutation,
  RemovePaymentMethodMutationVariables
>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts($input: ProductListInput) {
  products(input: $input) {
    count
    pageInfo {
      total
    }
    items {
      id
      createdAt
      name
      slug
      enabled
      variants {
        items {
          id
          sku
          stock
          salePrice
        }
      }
      assets(input: {take: 1}) {
        items {
          id
          source
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductsForSelectorDocument = new TypedDocumentString(`
    query GetProductsForSelector($input: ProductListInput) {
  products(input: $input) {
    items {
      ...CommonProductForSelector
    }
  }
}
    fragment CommonProductForSelector on Product {
  id
  name
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
}`) as unknown as TypedDocumentString<
  GetProductsForSelectorQuery,
  GetProductsForSelectorQueryVariables
>;
export const GetAllEnhancedProductsForSelectorDocument = new TypedDocumentString(`
    query GetAllEnhancedProductsForSelector($input: ProductListInput) {
  products(input: $input) {
    items {
      ...CommonEnhancedProductForSelector
    }
  }
}
    fragment CommonEnhancedProductForSelector on Product {
  id
  name
  variants {
    items {
      id
      salePrice
      optionValues {
        id
        name
      }
    }
  }
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
}`) as unknown as TypedDocumentString<
  GetAllEnhancedProductsForSelectorQuery,
  GetAllEnhancedProductsForSelectorQueryVariables
>;
export const GetDiscountApplicableProductsQueryDocument = new TypedDocumentString(`
    query GetDiscountApplicableProductsQuery($ids: [ID!]!, $input: ProductListInput) {
  productsByVariantIds(ids: $ids, input: $input) {
    count
    pageInfo {
      total
    }
    items {
      ...CommonDiscountApplicableProduct
    }
  }
}
    fragment CommonDiscountApplicableProduct on Product {
  id
  name
  slug
  assets(input: {take: 1}) {
    items {
      id
      source
    }
  }
  variants {
    items {
      id
      salePrice
      optionValues {
        id
        name
      }
    }
  }
}`) as unknown as TypedDocumentString<
  GetDiscountApplicableProductsQueryQuery,
  GetDiscountApplicableProductsQueryQueryVariables
>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: ID) {
  product(id: $id) {
    ...CommonProduct
  }
}
    fragment CommonProduct on Product {
  id
  createdAt
  name
  description
  enabled
  tags {
    id
    name
  }
  variants {
    items {
      id
      salePrice
      sku
      stock
      comparisonPrice
      costPerUnit
      requiresShipping
      optionValues {
        id
        name
      }
      asset {
        id
        source
      }
    }
  }
  options {
    id
    name
    values {
      id
      name
    }
  }
  assets {
    items {
      id
      name
      source
      order
    }
  }
}`) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateProductMutation, UpdateProductMutationVariables>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($ids: [ID!]!) {
  softRemoveProduct(ids: $ids)
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const GetAllHandlersDocument = new TypedDocumentString(`
    query GetAllHandlers {
  shippingHandlers {
    ...CommonShippingHandlers
  }
}
    fragment CommonShippingHandlers on ShippingHandler {
  name
  code
  args
}`) as unknown as TypedDocumentString<GetAllHandlersQuery, GetAllHandlersQueryVariables>;
export const CreateShippingMethodDocument = new TypedDocumentString(`
    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
  createShippingMethod(input: $input) {
    apiErrors {
      code
      message
    }
    shippingMethod {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
  CreateShippingMethodMutation,
  CreateShippingMethodMutationVariables
>;
export const UpdateShippingMethodDocument = new TypedDocumentString(`
    mutation UpdateShippingMethod($id: ID!, $input: UpdateShippingMethodInput!) {
  updateShippingMethod(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  UpdateShippingMethodMutation,
  UpdateShippingMethodMutationVariables
>;
export const RemoveShippingMethodDocument = new TypedDocumentString(`
    mutation RemoveShippingMethod($id: ID!) {
  removeShippingMethod(id: $id)
}
    `) as unknown as TypedDocumentString<
  RemoveShippingMethodMutation,
  RemoveShippingMethodMutationVariables
>;
export const GetShopsDocument = new TypedDocumentString(`
    query getShops {
  shops {
    items {
      ...CommonListShop
    }
  }
}
    fragment CommonListShop on Shop {
  id
  name
  slug
}`) as unknown as TypedDocumentString<GetShopsQuery, GetShopsQueryVariables>;
export const ShopDocument = new TypedDocumentString(`
    query Shop($slug: String!) {
  shop(slug: $slug) {
    ...CommonShop
  }
}
    fragment CommonShop on Shop {
  id
  name
  slug
  email
  logo
  socials {
    facebook
    twitter
    instagram
  }
  phoneNumber
  shopApiKey
}`) as unknown as TypedDocumentString<ShopQuery, ShopQueryVariables>;
export const CreateShopDocument = new TypedDocumentString(`
    mutation CreateShop($input: CreateShopInput!) {
  createShop(input: $input) {
    apiErrors {
      message
      code
    }
    shop {
      id
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<CreateShopMutation, CreateShopMutationVariables>;
export const UpdateShopDocument = new TypedDocumentString(`
    mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {
  updateShop(shopSlug: $shopSlug, input: $input) {
    apiErrors {
      message
      code
    }
    shop {
      id
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<UpdateShopMutation, UpdateShopMutationVariables>;
export const GenerateShopApiKeyDocument = new TypedDocumentString(`
    mutation GenerateShopApiKey {
  generateShopApiKey {
    shop {
      id
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<
  GenerateShopApiKeyMutation,
  GenerateShopApiKeyMutationVariables
>;
export const GetAllTagsDocument = new TypedDocumentString(`
    query GetAllTags($input: TagListInput) {
  tags(input: $input) {
    items {
      ...CommonTag
    }
  }
}
    fragment CommonTag on Tag {
  id
  name
}`) as unknown as TypedDocumentString<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const CreateTagsDocument = new TypedDocumentString(`
    mutation CreateTags($input: [CreateTagInput!]!) {
  createTags(input: $input) {
    apiErrors {
      code
      message
    }
    tags {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTagsMutation, CreateTagsMutationVariables>;
export const WhoamiDocument = new TypedDocumentString(`
    query Whoami {
  whoami {
    ...CommonUser
  }
}
    fragment CommonUser on User {
  id
  email
  emailVerified
}`) as unknown as TypedDocumentString<WhoamiQuery, WhoamiQueryVariables>;
export const GenerateAccessTokenDocument = new TypedDocumentString(`
    mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {
  generateUserAccessToken(input: $input) {
    apiErrors {
      code
      message
    }
    accessToken
  }
}
    `) as unknown as TypedDocumentString<
  GenerateAccessTokenMutation,
  GenerateAccessTokenMutationVariables
>;
export const ValidateAccessTokenDocument = new TypedDocumentString(`
    query ValidateAccessToken {
  validateAccessToken
}
    `) as unknown as TypedDocumentString<
  ValidateAccessTokenQuery,
  ValidateAccessTokenQueryVariables
>;
export const CreateVariantDocument = new TypedDocumentString(`
    mutation CreateVariant($productId: ID!, $input: CreateVariantInput!) {
  createVariant(productId: $productId, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateVariantMutation, CreateVariantMutationVariables>;
export const UpdateVariantDocument = new TypedDocumentString(`
    mutation UpdateVariant($id: ID!, $input: UpdateVariantInput!) {
  updateVariant(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateVariantMutation, UpdateVariantMutationVariables>;
export const SoftRemoveVariantDocument = new TypedDocumentString(`
    mutation SoftRemoveVariant($id: ID!) {
  softRemoveVariant(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<
  SoftRemoveVariantMutation,
  SoftRemoveVariantMutationVariables
>;
export const GetAllZonesDocument = new TypedDocumentString(`
    query getAllZones {
  zones {
    id
    name
    shippingMethods {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<GetAllZonesQuery, GetAllZonesQueryVariables>;
export const GetZoneDocument = new TypedDocumentString(`
    query GetZone($id: ID!) {
  zone(id: $id) {
    ...CommonZone
  }
}
    fragment CommonZone on Zone {
  id
  name
  createdAt
  states {
    id
    name
    country {
      id
      name
    }
  }
  shippingMethods {
    id
    name
    description
    enabled
    args
    code
    pricePreview
  }
}`) as unknown as TypedDocumentString<GetZoneQuery, GetZoneQueryVariables>;
export const CreateZoneDocument = new TypedDocumentString(`
    mutation CreateZone($input: CreateZoneInput!) {
  createZone(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateZoneMutation, CreateZoneMutationVariables>;
export const UpdateZoneDocument = new TypedDocumentString(`
    mutation UpdateZone($id: ID!, $input: UpdateZoneInput!) {
  updateZone(id: $id, input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<UpdateZoneMutation, UpdateZoneMutationVariables>;
export const RemoveZoneDocument = new TypedDocumentString(`
    mutation RemoveZone($id: ID!) {
  removeZone(id: $id)
}
    `) as unknown as TypedDocumentString<RemoveZoneMutation, RemoveZoneMutationVariables>;
