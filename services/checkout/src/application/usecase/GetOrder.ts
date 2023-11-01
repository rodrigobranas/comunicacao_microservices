import CourseRepository from "../repository/CourseRepository";
import OrderRepository from "../repository/OrderRepository";

export default class GetOrder {

	constructor (readonly orderRepository: OrderRepository, readonly courseRepository: CourseRepository) {
	}

	async execute (orderId: string): Promise<Output> {
		const order = await this.orderRepository.get(orderId);
		const course = await this.courseRepository.get(order.courseId);
		return {
			orderId: order.orderId,
			name: order.name,
			email: order.email,
			amount: order.amount,
			courseTitle: course.title,
			status: order.getStatus()
		}
	}
}

type Output = {
	orderId: string,
	name: string,
	email: string,
	amount: number,
	status: string,
	courseTitle: string
}
