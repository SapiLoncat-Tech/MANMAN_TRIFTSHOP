-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin', 'dps');
CREATE TYPE trust_level_enum AS ENUM ('new', 'trusted', 'top_seller');
CREATE TYPE product_category AS ENUM ('pakaian_pria', 'pakaian_wanita', 'elektronik', 'buku_kuliah', 'sepatu', 'lainnya');
CREATE TYPE product_status AS ENUM ('active', 'sold', 'suspended', 'draft');
CREATE TYPE transaction_type_enum AS ENUM ('escrow_transfer', 'cod');
CREATE TYPE transaction_status AS ENUM ('pending', 'escrow_held', 'shipped', 'completed', 'disputed', 'refunded');
CREATE TYPE ledger_entry_type AS ENUM ('debit', 'credit');

-- USERS Table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  role user_role DEFAULT 'buyer',
  is_verified BOOLEAN DEFAULT FALSE,
  reputation_score DECIMAL(3,2) DEFAULT 0.00,
  trust_level trust_level_enum DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  defect_description TEXT,
  category product_category NOT NULL,
  price DECIMAL(15,2) NOT NULL,
  condition_score INTEGER CHECK (condition_score BETWEEN 1 AND 10),
  size VARCHAR(20),
  color VARCHAR(50),
  is_halal_verified BOOLEAN DEFAULT FALSE,
  ai_fraud_flag BOOLEAN DEFAULT FALSE,
  status product_status DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCT IMAGES Table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0
);

-- TRANSACTIONS Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  transaction_type transaction_type_enum NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  platform_fee DECIMAL(15,2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  escrow_balance DECIMAL(15,2) DEFAULT 0.00,
  syariah_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ESCROW LEDGER (QS. Al-Baqarah 282) Table
CREATE TABLE escrow_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id),
  entry_type ledger_entry_type NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  balance_after DECIMAL(15,2) NOT NULL,
  description TEXT NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can read active products" ON products
  FOR SELECT USING (status = 'active');

CREATE POLICY "Sellers can manage their own products" ON products
  FOR ALL USING (auth.uid() = seller_id);

CREATE POLICY "Users can read transactions they participate in" ON transactions
  FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
