import { connectDB } from "../config/databases/db.js";

export async function createShippingsTable() {
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS shippings(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        order_id UUID NOT NULL,
        full_name VARCHAR(100) NOT NULL UNIQUE,
        state VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        adddress TEXT  NOT NULL,
        pincode VARCHAR(10) NOT NULL,
        phone VARCHAR(20) NOT NULL ,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        
        );`;
    await connectDB.query(query);
  } catch (error) {
    console.log("create shipping table erorr" + error);
    process.exit(1);
  }
}
