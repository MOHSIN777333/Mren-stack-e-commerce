import { connectDB } from "../config/databases/db.js";

export async function createPaymentsTable() {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS payments(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID NOT NULL,
        payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('Online')),
        payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('Paid', 'Pending', 'Failed')),
        payment_intent_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        
        );`;
    await connectDB.query(query);
  } catch (error) {
    console.log("create payment table erorr" + error);
    process.exit(1);
  }
}
