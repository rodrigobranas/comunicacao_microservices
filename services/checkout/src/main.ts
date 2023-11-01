import ConfirmOrder from "./application/usecase/ConfirmOrder";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";

async function main () {
	const orderRepository = new OrderRepositoryDatabase();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const confirmOrder = new ConfirmOrder(orderRepository);
	queue.consume("paymentApproved", async function (input: any) {
		await confirmOrder.execute(input);
	});
}

main();