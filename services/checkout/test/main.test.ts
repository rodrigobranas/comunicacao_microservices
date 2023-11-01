import Checkout from "../src/application/usecase/Checkout";
import GetOrder from "../src/application/usecase/GetOrder";
import PaymentGatewayHttp from "../src/infra/gateway/PaymentGatewayHttp";
import RabbitMQAdapter from "../src/infra/queue/RabbitMQAdapter";
import CourseRepositoryDatabase from "../src/infra/repository/CourseRepositoryDatabase";
import OrderRepositoryDatabase from "../src/infra/repository/OrderRepositoryDatabase";

async function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

test("Deve fazer um checkout", async function () {
	const orderRepository = new OrderRepositoryDatabase();
	const courseRepository = new CourseRepositoryDatabase();
	const paymentGateway = new PaymentGatewayHttp();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const checkout = new Checkout(orderRepository, courseRepository, paymentGateway, queue);
	const input = {
		courseId: "83e88f3a-49a5-43e0-a07a-8dd9e64c0915",
		name: "John Doe",
		email: "john.doe@gmail.com",
		creditCardToken: "123456789"
	};
	const outputCheckout = await checkout.execute(input);
	await sleep(200);
	const getOrder = new GetOrder(orderRepository, courseRepository);
	const outputGetOrder = await getOrder.execute(outputCheckout.orderId);
	expect(outputGetOrder.orderId).toBeDefined();
	expect(outputGetOrder.name).toBe("John Doe");
	expect(outputGetOrder.email).toBe("john.doe@gmail.com");
	expect(outputGetOrder.amount).toBe(1199);
	expect(outputGetOrder.courseTitle).toBe("Clean Code e Clean Architecture");
	expect(outputGetOrder.status).toBe("confirmed");
});
