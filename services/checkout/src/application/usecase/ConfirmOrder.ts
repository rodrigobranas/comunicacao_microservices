import OrderRepository from "../repository/OrderRepository"

export default class ConfirmOrder {

	constructor (readonly orderRepository: OrderRepository) {
	}

	async execute (input: Input): Promise<void> {
		console.log("confirmOrder", input);
		const order = await this.orderRepository.get(input.orderId);
		if (input.status === "success") {
			order.confirm();
			await this.orderRepository.update(order);
		}
	}
}

type Input = {
	orderId: string,
	status: string
}
