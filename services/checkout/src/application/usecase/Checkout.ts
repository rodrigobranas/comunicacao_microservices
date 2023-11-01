import Order from "../../domain/Order";
import Queue from "../../infra/queue/Queue";
import PaymentGateway from "../gateway/PaymentGateway";
import CourseRepository from "../repository/CourseRepository"
import OrderRepository from "../repository/OrderRepository"

export default class Checkout {

	constructor (
		readonly orderRepository: OrderRepository, 
		readonly courseRepository: CourseRepository,
		readonly paymentGateway: PaymentGateway,
		readonly queue: Queue
	) {
	}

	async execute (input: Input): Promise<Output> {
		const course = await this.courseRepository.get(input.courseId);
		const order = Order.create(input.courseId, input.name, input.email, course.amount);
		await this.orderRepository.save(order);
		// sincrona
		// const inputProcessPayment = {
		// 	orderId: order.orderId,
		// 	amount: course.amount,
		// 	creditCardToken: input.creditCardToken
		// }
		// const outputProcessPayment = await this.paymentGateway.processPayment(inputProcessPayment);
		// if (outputProcessPayment.status === "success") {
		// 	order.confirm();
		// 	await this.orderRepository.update(order);
		// }
		//

		// assincrona
		const orderPlacedEvent = {
			orderId: order.orderId,
			amount: course.amount,
			creditCardToken: input.creditCardToken
		}
		await this.queue.publish("orderPlaced", orderPlacedEvent);
		//
		return {
			orderId: order.orderId
		}
	}
}

type Input = {
	courseId: string,
	name: string,
	email: string,
	creditCardToken: string
}

type Output = {
	orderId: string
}
