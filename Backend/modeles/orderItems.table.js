import { connectDB } from "../config/databases/db.js";

export async function createOrderItemsTable() {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS order_items(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INT NOT NULL CHECK (quantity > 0),
        price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
        image TEXT NOT NULL,
        tittle TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );`;
    await connectDB.query(query);
  } catch (error) {
    console.log("create order item table erorr" + error);
    process.exit(1);
  }
}
