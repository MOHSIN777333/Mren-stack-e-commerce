import { createUsersTable } from "../modeles/users.table.js";
import { createOrderTable } from "../modeles/orders.table.js";
import { createProductsTable } from "../modeles/products.table.js";
import { createProductsReviewsTable } from "../modeles/productsReviews.table.js";
import { createOrderItemsTable } from "../modeles/orderItems.table.js";
import { createPaymentsTable } from "../modeles/payments.table.js";
import { createShippingsTable } from "../modeles/shippings.table.js";

export async function createTable() {
  try {
    await createUsersTable();
    await createOrderTable();
    await createProductsTable();
    await createProductsReviewsTable();
    await createOrderItemsTable();
    await createPaymentsTable();
    await createShippingsTable();
    console.log("calling all table successfully  ");
  } catch (error) {
    console.log("calling all table erorr ", error);
  }
}
