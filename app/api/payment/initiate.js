import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  //   const session = await getSession({ req });

  //   // Check if user is authenticated
  //   if (!session) {
  //     return res.status(401).json({ error: "Unauthorized" });
  //   }

  // Call backend api to initiate the payment
  const paymentData = await fetch(
    "http://localhost:5000/api/v1/payment/process",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalAmount: 495 }),
      credentials: "include",
    }
  ).then((t) => t.json());

  res.json(paymentData);
}
