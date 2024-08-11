-- Enable Row Level Security
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "shop" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "variant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "option_value" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "asset" ENABLE ROW LEVEL SECURITY;

-- Force Row Level Security for table owners
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "shop" FORCE ROW LEVEL SECURITY;
ALTER TABLE "product" FORCE ROW LEVEL SECURITY;
ALTER TABLE "variant" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option" FORCE ROW LEVEL SECURITY;
ALTER TABLE "option_value" FORCE ROW LEVEL SECURITY;
ALTER TABLE "asset" FORCE ROW LEVEL SECURITY;

-- Create row security policies
CREATE POLICY owner_isolation_policy ON "users" USING (id = current_setting('app.current_owner_id', TRUE)::uuid);
CREATE POLICY owner_isolation_policy ON "shop" USING (owner_id = current_setting('app.current_owner_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "shop" USING (id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "product" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "variant" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "option" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "option_value" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);
CREATE POLICY shop_isolation_policy ON "asset" USING (shop_id = current_setting('app.current_shop_id', TRUE)::uuid);

-- Bypass RLS policy
CREATE POLICY bypass_rls_policy ON "users" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "shop" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "product" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "variant" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "option" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "option_value" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
CREATE POLICY bypass_rls_policy ON "asset" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');
