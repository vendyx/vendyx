
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CustomerErrorCode {
    INVALID_EMAIL = "INVALID_EMAIL",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    INVALID_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN",
    PASSWORDS_DO_NOT_MATCH = "PASSWORDS_DO_NOT_MATCH",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    DISABLED_CUSTOMER = "DISABLED_CUSTOMER"
}

export enum DiscountValueType {
    PERCENTAGE = "PERCENTAGE",
    FIXED_AMOUNT = "FIXED_AMOUNT"
}

export enum OrderRequirementType {
    MINIMUM_AMOUNT = "MINIMUM_AMOUNT",
    MINIMUM_ITEMS = "MINIMUM_ITEMS"
}

export enum DiscountErrorCode {
    HANDLE_ALREADY_EXISTS = "HANDLE_ALREADY_EXISTS"
}

export enum LocationErrorCode {
    LOCATION_NAME_ALREADY_EXISTS = "LOCATION_NAME_ALREADY_EXISTS",
    LOCATION_IS_DEFAULT = "LOCATION_IS_DEFAULT"
}

export enum OrderErrorCode {
    NOT_ENOUGH_STOCK = "NOT_ENOUGH_STOCK",
    CUSTOMER_INVALID_EMAIL = "CUSTOMER_INVALID_EMAIL",
    CUSTOMER_DISABLED = "CUSTOMER_DISABLED",
    MISSING_SHIPPING_ADDRESS = "MISSING_SHIPPING_ADDRESS",
    SHIPPING_METHOD_NOT_FOUND = "SHIPPING_METHOD_NOT_FOUND",
    LOCATION_NOT_FOUND = "LOCATION_NOT_FOUND",
    FAILED_ADDING_SHIPPING_METHOD = "FAILED_ADDING_SHIPPING_METHOD",
    PAYMENT_METHOD_NOT_FOUND = "PAYMENT_METHOD_NOT_FOUND",
    PAYMENT_DECLINED = "PAYMENT_DECLINED",
    ORDER_TRANSITION_ERROR = "ORDER_TRANSITION_ERROR",
    INVALID_DISCOUNT_CODE = "INVALID_DISCOUNT_CODE",
    DISCOUNT_CODE_NOT_APPLICABLE = "DISCOUNT_CODE_NOT_APPLICABLE",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    FORBIDDEN_ORDER_ACTION = "FORBIDDEN_ORDER_ACTION"
}

export enum PaymentMethodErrorCode {
    HANDLER_ALREADY_SELECTED = "HANDLER_ALREADY_SELECTED",
    HANDLER_NOT_FOUND = "HANDLER_NOT_FOUND",
    FAILED_TO_SAVE_ARGS = "FAILED_TO_SAVE_ARGS"
}

export enum ShippingMethodErrorCode {
    HANDLER_NOT_FOUND = "HANDLER_NOT_FOUND",
    FAILED_TO_SAVE_ARGS = "FAILED_TO_SAVE_ARGS"
}

export enum ShopErrorCode {
    EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
}

export enum TagErrorCode {
    NAME_ALREADY_EXISTS = "NAME_ALREADY_EXISTS"
}

export enum UserErrorCode {
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
    PASSWORD_INVALID_LENGTH = "PASSWORD_INVALID_LENGTH",
    INVALID_EMAIL = "INVALID_EMAIL"
}

export enum AssetType {
    IMAGE = "IMAGE"
}

export enum CollectionContentType {
    PRODUCTS = "PRODUCTS",
    COLLECTIONS = "COLLECTIONS"
}

export enum DiscountApplicationMode {
    CODE = "CODE",
    AUTOMATIC = "AUTOMATIC"
}

export enum DiscountType {
    ORDER = "ORDER",
    PRODUCT = "PRODUCT",
    SHIPPING = "SHIPPING",
    BUY_X_GET_Y = "BUY_X_GET_Y"
}

export enum OrderState {
    MODIFYING = "MODIFYING",
    PAYMENT_ADDED = "PAYMENT_ADDED",
    PAYMENT_AUTHORIZED = "PAYMENT_AUTHORIZED",
    READY_FOR_PICKUP = "READY_FOR_PICKUP",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED"
}

export enum ShipmentType {
    SHIPPING = "SHIPPING",
    PICKUP = "PICKUP"
}

export enum FavoriteErrorCode {
    ALREADY_IN_FAVORITES = "ALREADY_IN_FAVORITES"
}

export enum PaypalErrorCode {
    PAYPAL_ERROR = "PAYPAL_ERROR",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

export class CreateCollectionInput {
    name: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    contentType: CollectionContentType;
    products?: Nullable<string[]>;
    assets?: Nullable<AssetInCollectionInput[]>;
    subCollections?: Nullable<string[]>;
}

export class UpdateCollectionInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    products?: Nullable<string[]>;
    assets?: Nullable<AssetInCollectionInput[]>;
    subCollections?: Nullable<string[]>;
}

export class AssetInCollectionInput {
    id: string;
}

export class CollectionFilters {
    enabled?: Nullable<BooleanFilter>;
    contentType?: Nullable<CollectionContentType>;
    name?: Nullable<StringFilter>;
}

export class ConfigurableProperty {
    code: string;
    args: JSON;
}

export class UpdateCustomerInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    enabled?: Nullable<boolean>;
}

export class CustomerListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<CustomerFilters>;
}

export class CustomerFilters {
    firstName?: Nullable<StringFilter>;
    lastName?: Nullable<StringFilter>;
    email?: Nullable<StringFilter>;
    enabled?: Nullable<BooleanFilter>;
}

export class CreateDiscountInput {
    applicationMode: DiscountApplicationMode;
    handle: string;
    discountValueType: DiscountValueType;
    discountValue: number;
    type: DiscountType;
    perCustomerLimit?: Nullable<number>;
    startsAt: Date;
    endsAt?: Nullable<Date>;
    enabled?: Nullable<boolean>;
    orderRequirementType?: Nullable<OrderRequirementType>;
    orderRequirementValue?: Nullable<number>;
    availableCombinations?: Nullable<DiscountType[]>;
    metadata?: Nullable<JSON>;
}

export class UpdateDiscountInput {
    handle?: Nullable<string>;
    discountValueType?: Nullable<DiscountValueType>;
    discountValue?: Nullable<number>;
    type?: Nullable<DiscountType>;
    perCustomerLimit?: Nullable<number>;
    startsAt?: Nullable<Date>;
    endsAt?: Nullable<Date>;
    enabled?: Nullable<boolean>;
    orderRequirementType?: Nullable<OrderRequirementType>;
    orderRequirementValue?: Nullable<number>;
    availableCombinations?: Nullable<DiscountType[]>;
    metadata?: Nullable<JSON>;
}

export class DiscountListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<DiscountFilters>;
}

export class DiscountFilters {
    enabled?: Nullable<BooleanFilter>;
    handle?: Nullable<StringFilter>;
}

export class CreateLocationInput {
    name: string;
    country: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
    isDefault?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
}

export class UpdateLocationInput {
    name?: Nullable<string>;
    country?: Nullable<string>;
    streetLine1?: Nullable<string>;
    streetLine2?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    isDefault?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
}

export class UpdateInStorePickupPreferencesInput {
    isAvailable?: Nullable<boolean>;
    instructions?: Nullable<string>;
}

export class MetricsInput {
    startsAt: Date;
    endsAt: Date;
}

export class CreateOptionInput {
    order: number;
    name: string;
    values: CreateOptionValueInput[];
}

export class CreateOptionValueInput {
    order: number;
    name: string;
}

export class UpdateOptionInput {
    order?: Nullable<number>;
    name?: Nullable<string>;
    values?: Nullable<UpdateOptionValueInput[]>;
}

export class UpdateOptionValueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
    order?: Nullable<number>;
}

export class MarkOrderAsShippedInput {
    carrier: string;
    trackingCode: string;
}

export class OrderListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<OrderFilters>;
}

export class OrderFilters {
    state?: Nullable<OrderState>;
    customer?: Nullable<StringFilter>;
    code?: Nullable<string>;
}

export class CreatePaymentMethodInput {
    handler: ConfigurableProperty;
    enabled?: Nullable<boolean>;
}

export class UpdatePaymentMethodInput {
    args?: Nullable<JSON>;
    enabled?: Nullable<boolean>;
}

export class CreateProductInput {
    name: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    archived?: Nullable<boolean>;
    assets?: Nullable<AssetInProductInput[]>;
    tags?: Nullable<string[]>;
}

export class UpdateProductInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    archived?: Nullable<boolean>;
    assets?: Nullable<AssetInProductInput[]>;
    tags?: Nullable<string[]>;
}

export class AssetInProductInput {
    id: string;
    order: number;
}

export class ProductListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<ProductFilters>;
}

export class ProductFilters {
    name?: Nullable<StringFilter>;
    enabled?: Nullable<BooleanFilter>;
    archived?: Nullable<BooleanFilter>;
}

export class CreateShippingMethodInput {
    name: string;
    handler: ConfigurableProperty;
    zoneId: string;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
}

export class UpdateShippingMethodInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    enabled?: Nullable<boolean>;
    args?: Nullable<JSON>;
}

export class ShopSocialsInput {
    facebook?: Nullable<string>;
    twitter?: Nullable<string>;
    instagram?: Nullable<string>;
}

export class CreateShopInput {
    name: string;
    email: string;
    phoneNumber: string;
    address?: Nullable<CreateAddressInput>;
    logo?: Nullable<string>;
    socials?: Nullable<ShopSocialsInput>;
    storefrontUrl?: Nullable<string>;
}

export class UpdateShopInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    address?: Nullable<CreateAddressInput>;
    logo?: Nullable<string>;
    socials?: Nullable<ShopSocialsInput>;
    storefrontUrl?: Nullable<string>;
}

export class CreateTagInput {
    name: string;
}

export class UpdateTagInput {
    name?: Nullable<string>;
}

export class TagListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<TagFilters>;
}

export class TagFilters {
    name?: Nullable<StringFilter>;
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
}

export class GenerateUserAccessTokenInput {
    email: string;
    password: string;
}

export class CreateVariantInput {
    salePrice: number;
    stock?: Nullable<number>;
    sku?: Nullable<string>;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping?: Nullable<boolean>;
    assetId?: Nullable<string>;
    optionValues?: Nullable<string[]>;
}

export class UpdateVariantInput {
    salePrice?: Nullable<number>;
    stock?: Nullable<number>;
    sku?: Nullable<string>;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping?: Nullable<boolean>;
    assetId?: Nullable<string>;
    optionValues?: Nullable<string[]>;
}

export class CreateZoneInput {
    name: string;
    stateIds: string[];
}

export class UpdateZoneInput {
    name?: Nullable<string>;
    stateIds?: Nullable<string[]>;
}

export class CreateAddressInput {
    fullName: string;
    country: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
    references?: Nullable<string>;
    isDefault?: Nullable<boolean>;
}

export class UpdateAddressInput {
    fullName?: Nullable<string>;
    country?: Nullable<string>;
    streetLine1?: Nullable<string>;
    streetLine2?: Nullable<string>;
    city?: Nullable<string>;
    province?: Nullable<string>;
    postalCode?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    references?: Nullable<string>;
    isDefault?: Nullable<boolean>;
}

export class CollectionListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<CollectionFilters>;
}

export class ListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export class StringFilter {
    equals?: Nullable<string>;
    contains?: Nullable<string>;
}

export class BooleanFilter {
    equals?: Nullable<boolean>;
}

export class LocationListInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
    filters?: Nullable<LocationFilters>;
}

export class LocationFilters {
    name?: Nullable<StringFilter>;
}

export class CreateCustomerInput {
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: Nullable<string>;
}

export class UpdateCustomerPasswordInput {
    newPassword: string;
    confirmPassword: string;
}

export class AddToFavoritesInput {
    variantId: string;
}

export class CreateOrderInput {
    line?: Nullable<CreateOrderLineInput>;
}

export class CreateOrderLineInput {
    productVariantId: string;
    quantity: number;
}

export class UpdateOrderLineInput {
    quantity: number;
}

export class AddCustomerToOrderInput {
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
}

export class CreateOrderAddressInput {
    fullName: string;
    phoneNumber?: Nullable<string>;
    countryId: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    references?: Nullable<string>;
}

export class AvailablePickupLocationsInput {
    country: string;
    province: string;
}

export class AddPaymentToOrderInput {
    methodId: string;
}

export class AddShipmentToOrderInput {
    type: ShipmentType;
    providerId: string;
}

export interface Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface List {
    items: Node[];
    count: number;
    pageInfo: PageInfo;
}

export abstract class IMutation {
    abstract createCollection(input: CreateCollectionInput): Collection | Promise<Collection>;

    abstract updateCollection(id: string, input: UpdateCollectionInput): Collection | Promise<Collection>;

    abstract removeCollection(ids: string[]): boolean | Promise<boolean>;

    abstract updateCustomer(id: string, input: UpdateCustomerInput): CustomerResult | Promise<CustomerResult>;

    abstract createDiscount(input: CreateDiscountInput): DiscountResult | Promise<DiscountResult>;

    abstract updateDiscount(id: string, input: UpdateDiscountInput): DiscountResult | Promise<DiscountResult>;

    abstract removeDiscounts(ids: string[]): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract createLocation(input: CreateLocationInput): LocationResult | Promise<LocationResult>;

    abstract updateLocation(id: string, input: UpdateLocationInput): LocationResult | Promise<LocationResult>;

    abstract removeLocation(id: string): RemoveLocationResult | Promise<RemoveLocationResult>;

    abstract updateInStorePickupPreferences(locationId: string, input?: Nullable<UpdateInStorePickupPreferencesInput>): LocationResult | Promise<LocationResult>;

    abstract createOption(productId: string, input: CreateOptionInput): Option | Promise<Option>;

    abstract updateOption(id: string, input: UpdateOptionInput): Option | Promise<Option>;

    abstract softRemoveOption(id: string): Option | Promise<Option>;

    abstract softRemoveOptionValues(ids: string[]): boolean | Promise<boolean>;

    abstract markOrderAsShipped(id: string, input: MarkOrderAsShippedInput): OrderResult | Promise<OrderResult>;

    abstract markAsReadyForPickup(id: string): OrderResult | Promise<OrderResult>;

    abstract markOrderAsDelivered(id: string): OrderResult | Promise<OrderResult>;

    abstract cancelOrder(id: string): OrderResult | Promise<OrderResult>;

    abstract createPaymentMethod(input: CreatePaymentMethodInput): PaymentMethodResult | Promise<PaymentMethodResult>;

    abstract updatePaymentMethod(id: string, input: UpdatePaymentMethodInput): PaymentMethod | Promise<PaymentMethod>;

    abstract removePaymentMethod(id: string): boolean | Promise<boolean>;

    abstract createProduct(input: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(id: string, input: UpdateProductInput): Product | Promise<Product>;

    abstract softRemoveProduct(ids: string[]): boolean | Promise<boolean>;

    abstract createShippingMethod(input: CreateShippingMethodInput): ShippingMethodResult | Promise<ShippingMethodResult>;

    abstract updateShippingMethod(id: string, input: UpdateShippingMethodInput): ShippingMethod | Promise<ShippingMethod>;

    abstract removeShippingMethod(id: string): boolean | Promise<boolean>;

    abstract createShop(input: CreateShopInput): ShopResult | Promise<ShopResult>;

    abstract updateShop(shopSlug: string, input: UpdateShopInput): ShopResult | Promise<ShopResult>;

    abstract generateShopApiKey(): ShopResult | Promise<ShopResult>;

    abstract createTags(input: CreateTagInput[]): CreateTagsResult | Promise<CreateTagsResult>;

    abstract updateTag(id: string, input: UpdateTagInput): TagResult | Promise<TagResult>;

    abstract removeTags(ids: string[]): boolean | Promise<boolean>;

    abstract createUser(input: CreateUserInput): UserResult | Promise<UserResult>;

    abstract updateUser(id: string, input: UpdateUserInput): UserResult | Promise<UserResult>;

    abstract generateUserAccessToken(input: GenerateUserAccessTokenInput): UserAccessTokenResult | Promise<UserAccessTokenResult>;

    abstract createVariant(productId: string, input: CreateVariantInput): Variant | Promise<Variant>;

    abstract updateVariant(id: string, input: UpdateVariantInput): Variant | Promise<Variant>;

    abstract softRemoveVariant(id: string): Variant | Promise<Variant>;

    abstract createZone(input: CreateZoneInput): Zone | Promise<Zone>;

    abstract updateZone(id: string, input: UpdateZoneInput): Zone | Promise<Zone>;

    abstract removeZone(id: string): boolean | Promise<boolean>;

    abstract createCustomerAddress(input: CreateAddressInput): Address | Promise<Address>;

    abstract updateCustomerAddress(addressId: string, input: UpdateAddressInput): Address | Promise<Address>;

    abstract removeCustomerAddress(addressId: string): Address | Promise<Address>;

    abstract createCustomer(input: CreateCustomerInput): CustomerResult | Promise<CustomerResult>;

    abstract updateCustomerPassword(input: UpdateCustomerPasswordInput): CustomerResult | Promise<CustomerResult>;

    abstract generateCustomerAccessToken(email: string, password: string): GenerateCustomerAccessTokenResult | Promise<GenerateCustomerAccessTokenResult>;

    abstract requestRecoveryCustomerPassword(email: string): CustomerResult | Promise<CustomerResult>;

    abstract recoverCustomerPassword(urlToken: string, password: string): CustomerResult | Promise<CustomerResult>;

    abstract disableCustomer(): CustomerResult | Promise<CustomerResult>;

    abstract addToFavorites(input: AddToFavoritesInput): FavoriteResult | Promise<FavoriteResult>;

    abstract removeFromFavorites(ids: string[]): boolean | Promise<boolean>;

    abstract createOrder(input: CreateOrderInput): OrderResult | Promise<OrderResult>;

    abstract addLineToOrder(orderId: string, input: CreateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract updateOrderLine(lineId: string, input: UpdateOrderLineInput): OrderResult | Promise<OrderResult>;

    abstract removeOrderLine(lineId: string): OrderResult | Promise<OrderResult>;

    abstract addCustomerToOrder(orderId: string, input: AddCustomerToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addShippingAddressToOrder(orderId: string, input: CreateOrderAddressInput): OrderResult | Promise<OrderResult>;

    abstract addShipmentToOrder(orderId: string, input: AddShipmentToOrderInput): OrderResult | Promise<OrderResult>;

    abstract addDiscountCodeToOrder(orderId: string, code: string): OrderResult | Promise<OrderResult>;

    abstract removeDiscountCodeFromOrder(orderId: string, code: string): OrderResult | Promise<OrderResult>;

    abstract recalculateDiscounts(orderId: string): OrderResult | Promise<OrderResult>;

    abstract addPaymentToOrder(orderId: string, input: AddPaymentToOrderInput): OrderResult | Promise<OrderResult>;

    abstract createPaypalOrder(orderId: string): PaypalResult | Promise<PaypalResult>;
}

export abstract class IQuery {
    abstract collections(input?: Nullable<CollectionListInput>): CollectionList | Promise<CollectionList>;

    abstract customers(input?: Nullable<CustomerListInput>): CustomerList | Promise<CustomerList>;

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract discounts(input?: Nullable<DiscountListInput>): DiscountList | Promise<DiscountList>;

    abstract discount(id: string): Nullable<Discount> | Promise<Nullable<Discount>>;

    abstract locations(input?: Nullable<LocationListInput>): LocationList | Promise<LocationList>;

    abstract location(id: string): Location | Promise<Location>;

    abstract totalSales(input: MetricsInput): MetricsResult | Promise<MetricsResult>;

    abstract totalOrders(input: MetricsInput): MetricsResult | Promise<MetricsResult>;

    abstract orders(input?: Nullable<OrderListInput>): OrderList | Promise<OrderList>;

    abstract paymentMethod(id: string): Nullable<PaymentMethod> | Promise<Nullable<PaymentMethod>>;

    abstract paymentMethods(): PaymentMethod[] | Promise<PaymentMethod[]>;

    abstract paymentHandlers(): PaymentHandler[] | Promise<PaymentHandler[]>;

    abstract products(input?: Nullable<ProductListInput>): ProductList | Promise<ProductList>;

    abstract productsByVariantIds(ids: string[], input?: Nullable<ProductListInput>): ProductList | Promise<ProductList>;

    abstract shippingMethods(): ShippingMethod[] | Promise<ShippingMethod[]>;

    abstract shippingHandlers(): ShippingHandler[] | Promise<ShippingHandler[]>;

    abstract shop(slug: string): Nullable<Shop> | Promise<Nullable<Shop>>;

    abstract shops(input?: Nullable<ListInput>): ShopList | Promise<ShopList>;

    abstract tags(input?: Nullable<TagListInput>): TagList | Promise<TagList>;

    abstract whoami(): Nullable<User> | Promise<Nullable<User>>;

    abstract validateAccessToken(): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract variant(id: string): Nullable<Variant> | Promise<Nullable<Variant>>;

    abstract zones(): Zone[] | Promise<Zone[]>;

    abstract zone(id: string): Zone | Promise<Zone>;

    abstract collection(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract countries(): Country[] | Promise<Country[]>;

    abstract order(id?: Nullable<string>, code?: Nullable<string>): Nullable<Order> | Promise<Nullable<Order>>;

    abstract product(id?: Nullable<string>, slug?: Nullable<string>): Nullable<Product> | Promise<Nullable<Product>>;

    abstract me(): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract favorites(input?: Nullable<ProductListInput>): VariantList | Promise<VariantList>;

    abstract availablePickupLocations(input?: Nullable<AvailablePickupLocationsInput>): Location[] | Promise<Location[]>;

    abstract availableShippingMethods(orderId: string): ShippingMethod[] | Promise<ShippingMethod[]>;

    abstract availablePaymentMethods(): PaymentMethod[] | Promise<PaymentMethod[]>;
}

export class Customer implements Node {
    totalSpent: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName?: Nullable<string>;
    lastName: string;
    email: string;
    phoneNumber?: Nullable<string>;
    enabled: boolean;
    orders?: OrderList;
    addresses?: AddressList;
}

export class CustomerResult {
    customer?: Nullable<Customer>;
    apiErrors: CustomerErrorResult[];
}

export class CustomerErrorResult {
    code: CustomerErrorCode;
    message: string;
}

export class Discount implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    applicationMode: DiscountApplicationMode;
    handle: string;
    discountValueType: DiscountValueType;
    discountValue: number;
    type: DiscountType;
    perCustomerLimit?: Nullable<number>;
    startsAt: Date;
    endsAt?: Nullable<Date>;
    enabled: boolean;
    orderRequirementType?: Nullable<OrderRequirementType>;
    orderRequirementValue?: Nullable<number>;
    availableCombinations?: Nullable<DiscountType[]>;
    metadata?: Nullable<JSON>;
}

export class DiscountList implements List {
    items: Discount[];
    count: number;
    pageInfo: PageInfo;
}

export class DiscountResult {
    discount?: Nullable<Discount>;
    apiErrors: DiscountErrorResult[];
}

export class DiscountErrorResult {
    code: DiscountErrorCode;
    message: string;
}

export class Location implements Node {
    isDefault: boolean;
    isActive: boolean;
    inStorePickup: InStorePickup;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    country: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
}

export class InStorePickup {
    isAvailable: boolean;
    instructions: string;
}

export class LocationResult {
    location?: Nullable<Location>;
    apiErrors: LocationErrorResult[];
}

export class RemoveLocationResult {
    success: boolean;
    apiErrors: LocationErrorResult[];
}

export class LocationErrorResult {
    code: LocationErrorCode;
    message: string;
}

export class Metric {
    key: string;
    value: number;
}

export class MetricsResult {
    metrics: Metric[];
    total: number;
}

export class Option implements Node {
    order: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    values: OptionValue[];
}

export class OptionValue implements Node {
    order: number;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    option: Option;
}

export class OrderResult {
    order?: Nullable<Order>;
    apiErrors: OrderErrorResult[];
}

export class OrderErrorResult {
    code: OrderErrorCode;
    message: string;
    metadata?: Nullable<JSON>;
}

export class PaymentMethod implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    icon?: Nullable<string>;
    enabled: boolean;
    args: JSON;
}

export class PaymentHandler {
    name: string;
    code: string;
    icon?: Nullable<string>;
    args: JSON;
}

export class PaymentMethodResult {
    paymentMethod?: Nullable<PaymentMethod>;
    apiErrors: PaymentMethodErrorResult[];
}

export class PaymentMethodErrorResult {
    code: PaymentMethodErrorCode;
    message: string;
}

export class ShippingMethod implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description?: Nullable<string>;
    enabled: boolean;
    args: JSON;
    code: string;
    pricePreview: number;
}

export class ShippingHandler {
    name: string;
    code: string;
    icon?: Nullable<string>;
    args: JSON;
}

export class ShippingMethodResult {
    apiErrors: ShippingMethodErrorResult[];
    shippingMethod?: Nullable<ShippingMethod>;
}

export class ShippingMethodErrorResult {
    code: ShippingMethodErrorCode;
    message: string;
}

export class Shop implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    shopApiKey: string;
    email: string;
    phoneNumber: string;
    logo?: Nullable<string>;
    address?: Nullable<AddressJson>;
    storefrontUrl?: Nullable<string>;
    socials?: Nullable<ShopSocials>;
    owner: User;
}

export class ShopSocials {
    facebook?: Nullable<string>;
    twitter?: Nullable<string>;
    instagram?: Nullable<string>;
}

export class ShopList implements List {
    items: Shop[];
    count: number;
    pageInfo: PageInfo;
}

export class ShopResult {
    shop?: Nullable<Shop>;
    apiErrors: ShopErrorResult[];
}

export class ShopErrorResult {
    code: ShopErrorCode;
    message: string;
}

export class TagList implements List {
    items: Tag[];
    count: number;
    pageInfo: PageInfo;
}

export class CreateTagsResult {
    apiErrors: TagErrorResult[];
    tags: Tag[];
}

export class TagResult {
    apiErrors: TagErrorResult[];
    tag?: Nullable<Tag>;
}

export class TagErrorResult {
    code: TagErrorCode;
    message: string;
}

export class User implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    shops: ShopList;
}

export class UserList implements List {
    items: User[];
    count: number;
    pageInfo: PageInfo;
}

export class UserAccessTokenResult {
    apiErrors: UserErrorResult[];
    accessToken?: Nullable<string>;
}

export class UserResult {
    user?: Nullable<User>;
    apiErrors: UserErrorResult[];
}

export class UserErrorResult {
    code: UserErrorCode;
    message: string;
}

export class Variant implements Node {
    deletedAt?: Nullable<Date>;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    sku?: Nullable<string>;
    salePrice: number;
    stock: number;
    comparisonPrice?: Nullable<number>;
    costPerUnit?: Nullable<number>;
    requiresShipping: boolean;
    asset?: Nullable<Asset>;
    optionValues: OptionValue[];
    product: Product;
}

export class Zone implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    shippingMethods: ShippingMethod[];
    states: State[];
}

export class Address implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    country: string;
    fullName: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
    references?: Nullable<string>;
    isDefault: boolean;
}

export class AddressList implements List {
    items: Address[];
    count: number;
    pageInfo: PageInfo;
}

export class Asset implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    source: string;
    type: AssetType;
    order: number;
}

export class AssetList implements List {
    items: Asset[];
    count: number;
    pageInfo: PageInfo;
}

export class Collection implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description?: Nullable<string>;
    enabled: boolean;
    contentType: CollectionContentType;
    assets?: AssetList;
    products?: ProductList;
    subCollections?: CollectionList;
}

export class CollectionList implements List {
    items: Collection[];
    count: number;
    pageInfo: PageInfo;
}

export class PageInfo {
    total: number;
}

export class Country implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    states: State[];
}

export class State implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    country: Country;
}

export class CustomerList implements List {
    items: Customer[];
    count: number;
    pageInfo: PageInfo;
}

export class ActiveDiscount {
    id: string;
    handle: string;
    applicationMode: DiscountApplicationMode;
    discountType: DiscountType;
    discountedAmount: number;
}

export class LocationList implements List {
    items: Location[];
    count: number;
    pageInfo: PageInfo;
}

export class OptionList implements List {
    items: Option[];
    count: number;
    pageInfo: PageInfo;
}

export class OrderLine implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    unitPrice: number;
    quantity: number;
    lineSubtotal: number;
    lineTotal: number;
    discounts: ActiveDiscount[];
    productVariant: Variant;
}

export class OrderLineList implements List {
    items: OrderLine[];
    count: number;
    pageInfo: PageInfo;
}

export class Order implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    code: string;
    state: OrderState;
    total: number;
    subtotal: number;
    placedAt?: Nullable<Date>;
    totalQuantity: number;
    discounts: ActiveDiscount[];
    lines?: OrderLineList;
    customer?: Nullable<Customer>;
    shippingAddress?: Nullable<AddressJson>;
    payment?: Nullable<Payment>;
    shipment?: Nullable<Shipment>;
}

export class AddressJson {
    country: string;
    countryId: string;
    fullName: string;
    streetLine1: string;
    streetLine2?: Nullable<string>;
    city: string;
    province: string;
    postalCode: string;
    phoneNumber: string;
    references?: Nullable<string>;
    isDefault: boolean;
}

export class OrderList implements List {
    items: Order[];
    count: number;
    pageInfo: PageInfo;
}

export class Payment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    transactionId?: Nullable<string>;
    amount: number;
    method: string;
}

export class Product implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    slug: string;
    description?: Nullable<string>;
    enabled: boolean;
    archived: boolean;
    variants?: VariantList;
    assets?: AssetList;
    options: Option[];
    tags: Tag[];
}

export class ProductList implements List {
    items: Product[];
    count: number;
    pageInfo: PageInfo;
}

export class Shipment implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: ShipmentType;
    amount: number;
    total: number;
    method: string;
    metadata?: Nullable<JSON>;
    discounts: ActiveDiscount[];
    order: Order;
}

export class ShippingMetadata {
    carrier: string;
    trackingCode: string;
}

export class PickupMetadata {
    location: string;
}

export class Tag implements Node {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
}

export class VariantList implements List {
    items: Variant[];
    count: number;
    pageInfo: PageInfo;
}

export class GenerateCustomerAccessTokenResult {
    accessToken?: Nullable<string>;
    apiErrors: CustomerErrorResult[];
}

export class FavoriteResult {
    variant?: Nullable<Variant>;
    apiErrors: FavoriteErrorResult[];
}

export class FavoriteErrorResult {
    code: FavoriteErrorCode;
    message: string;
}

export class PaypalResult {
    apiErrors: PaypalErrorResult[];
    orderId?: Nullable<string>;
}

export class PaypalErrorResult {
    message?: Nullable<string>;
    code?: Nullable<PaypalErrorCode>;
}

export type JSON = any;
type Nullable<T> = T | null;
