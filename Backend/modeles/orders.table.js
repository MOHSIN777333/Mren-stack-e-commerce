import { connectDB } from "../config/databases/db.js";

export async function createOrderTable() {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS orders(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        buyer_id UUID NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
        tax_price DECIMAL(10,2) NOT NULL CHECK (tax_price >= 0),
        shipping_price DECIMAL(10, 2) NOT NULL CHECK (shipping_price >= 0),
        order_status VARCHAR(50) DEFAULT 'processing' CHECK (order_status IN ('Processing','Shipped','Delivered','Cencelled')),
        paid_at TIMESTAMP CHECK (paid_at IS NULL OR paid_at <= CURRENT_TIMESTAMP),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE 
        );`;
    await connectDB.query(query);
  } catch (error) {
    console.log("create order table erorr" + error);
    process.exit(1);
  }
}
