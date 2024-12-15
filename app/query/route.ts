 import { db } from "@vercel/postgres";
 import postgres from "postgres";

 const DB_URL = `${process.env.POSTGRES_URL}`

 const client = {
   sql: postgres(DB_URL),
 };

 async function listInvoices() {
 	const data = await client.sql`
     SELECT invoices.amount, customers.name
     FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `;

 	return data;
 }

export async function GET() {
/*  return Response.json({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  });*/
   try {
   	return Response.json(await listInvoices());
   } catch (error) {
   	return Response.json({ error }, { status: 500 });
   }
}
