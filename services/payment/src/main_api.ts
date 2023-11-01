import express from "express";
const app = express();

app.use(express.json());

app.post("/process_payment", function (req: any, res: any) {
	console.log("processPayment", req.body);
	const input = req.body;
	res.json({
		orderId: input.orderId,
		status: "success"
	});
});

app.listen(3001);
