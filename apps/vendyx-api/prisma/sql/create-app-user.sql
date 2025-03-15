-- 0. Drop the user (If is already created, omit this step)
DROP USER IF EXISTS app_user;

-- 1. Create the user (If is already created, omit this step)
CREATE USER app_user WITH PASSWORD 'app_secure_password';

-- 2. Grant all privileges on the database -- `railway` instead of `vendyx` in prod
GRANT ALL PRIVILEGES ON DATABASE railway TO app_user;

-- 3. Grant all privileges on all tables, sequences, and functions in the schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO app_user;

-- 4. Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO app_user;

-- 5. Grant usage on the schema https://stackoverflow.com/a/67276542
GRANT USAGE ON SCHEMA public TO app_user;