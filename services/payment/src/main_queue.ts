import RabbitMQAdapter from "./RabbitMQAdapter";
import ProcessPayment from "./application/usecase/ProcessPayment";

async function main () {
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const processPayment = new ProcessPayment(queue);
	queue.consume("orderPlaced", async (input: any) => {
		await processPayment.execute(input);
	});
}

main();
