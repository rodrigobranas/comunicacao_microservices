import OrderRepository from "../../application/repository/OrderRepository";
import Order from "../../domain/Order";
import pgp from "pg-promise";

export default class OrderRepositoryDatabase implements OrderRepository {

	async save(order: Order): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into branas.order (order_id, course_id, name, email, amount, status) values ($1, $2, $3, $4, $5, $6)", [order.orderId, order.courseId, order.name, order.email, order.amount, order.getStatus()]);
		await connection.$pool.end();
	}

	async update(order: Order): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("update branas.order set status = $1 where order_id = $2", [order.getStatus(), order.orderId]);
		await connection.$pool.end();
	}

	async get(orderId: string): Promise<Order> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [orderData] = await connection.query("select * from branas.order where order_id = $1", [orderId]);
		await connection.$pool.end();
		return new Order(orderData.order_id, orderData.course_id, orderData.name, orderData.email, parseFloat(orderData.amount), orderData.status);
	}

}