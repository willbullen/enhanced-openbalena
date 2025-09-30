-- Enhanced OpenBalena Database Initialization Script

-- Create additional databases if needed
CREATE DATABASE IF NOT EXISTS enhanced_openbalena_test;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE enhanced_openbalena TO postgres;
GRANT ALL PRIVILEGES ON DATABASE enhanced_openbalena_test TO postgres;
