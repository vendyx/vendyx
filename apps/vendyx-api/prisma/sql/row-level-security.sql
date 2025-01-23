-- Enable Row Level Security
ALTER TABLE "shop" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "variant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option_value" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "asset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "payment_method" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "shipment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "shipping_method" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "zone" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_line" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "collection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "address" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "shop" FORCE ROW LEVEL SECURITY;
ALTER TABLE "product" FORCE ROW LEVEL SECURITY;
ALTER TABLE "variant" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option_value" FORCE ROW LEVEL SECURITY;
ALTER TABLE "asset" FORCE ROW LEVEL SECURITY;
ALTER TABLE "payment" FORCE ROW LEVEL SECURITY;
ALTER TABLE "payment_method" FORCE ROW LEVEL SECURITY;
ALTER TABLE "shipment" FORCE ROW LEVEL SECURITY;
ALTER TABLE "shipping_method" FORCE ROW LEVEL SECURITY;
ALTER TABLE "zone" FORCE ROW LEVEL SECURITY;
ALTER TABLE "orders" FORCE ROW LEVEL SECURITY;
ALTER TABLE "order_line" FORCE ROW LEVEL SECURITY;
ALTER TABLE "customer" FORCE ROW LEVEL SECURITY;
ALTER TABLE "collection" FORCE ROW LEVEL SECURITY;
ALTER TABLE "address" FORCE ROW LEVEL SECURITY;

-- Create row security policies
CREATE POLICY owner_isolation_policy ON "shop" USING (owner_id = current_setting('app.current_owner_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "shop" USING (id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "product" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "variant" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "option" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "option_value" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "asset" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "payment" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "payment_method" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "shipment" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "shipping_method" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "zone" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "orders" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "order_line" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "customer" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "collection" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "address" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);

-- Bypass RLS policy
CREATE POLICY bypass_rls_policy ON "shop" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "product" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "variant" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "option" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "option_value" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "asset" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "payment" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "payment_method" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "shipment" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "shipping_method" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "zone" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "orders" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "order_line" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "customer" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "collection" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "address" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
