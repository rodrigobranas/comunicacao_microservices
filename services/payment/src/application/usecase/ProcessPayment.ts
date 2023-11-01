import Queue from "../../Queue";

export default class ProcessPayment {

	constructor (readonly queue: Queue) {
	}

	async execute (input: Input): Promise<void> {
		console.log("processPayment", input);
		const paymentApprovedEvent = {
			orderId: input.orderId,
			status: "success"
		}
		await this.queue.publish("paymentApproved", paymentApprovedEvent);
	}
}

export type Input = {
	orderId: string,
	amount: number,
	creditCardToken: string
}

export type Output = {
	orderId: string,
	status: string
}