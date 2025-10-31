export default function handler(req, res) {
  res.status(200).json({
    users: 1245,
    orders: 320,
    revenue: "$12,480",
  });
}