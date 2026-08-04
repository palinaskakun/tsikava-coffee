Mobile API: /api/mobile/payment-sheet

This endpoint creates a pending order on the server and returns a Stripe PaymentIntent client secret.

Request
- Method: POST
- Headers: `Authorization: Bearer <access_token>`
- Content-Type: application/json

Body example:

{
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "pickupMinutes": 30,
  "customerNotes": "No sugar",
  "cart": [
    {
      "slug": "daily-kava",
      "quantity": 2,
      "selectedOptions": []
    },
    {
      "slug": "honey-linen",
      "quantity": 1,
      "selectedOptions": []
    }
  ]
}

Response (success):

{
  "paymentIntentClientSecret": "pi_..._secret_...",
  "orderId": "<supabase-order-id>",
  "amountInCents": 1425
}

Notes
- The server calculates prices and tax; do not trust client-side prices.
- If the request payload is malformed, the server returns 400 with an error message.
- If order creation or Stripe fails, server returns 500.

Example JS fetch:

```js
const res = await fetch('/api/mobile/payment-sheet', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify(payload),
});

const data = await res.json();
// use data.paymentIntentClientSecret
```

Example iOS (Swift) using `URLSession`:

```swift
let url = URL(string: "https://your-site.com/api/mobile/payment-sheet")!
var req = URLRequest(url: url)
req.httpMethod = "POST"
req.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
req.setValue("application/json", forHTTPHeaderField: "Content-Type")
let body: [String: Any] = [
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "pickupMinutes": 30,
  "customerNotes": "No sugar",
  "cart": [
    ["slug": "daily-kava", "quantity": 2, "selectedOptions": []],
  ]
]
req.httpBody = try! JSONSerialization.data(withJSONObject: body)

URLSession.shared.dataTask(with: req) { data, resp, err in
  guard let data = data else { return }
  let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
  print(json)
}.resume()
```
