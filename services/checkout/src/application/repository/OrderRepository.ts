import Order from "../../domain/Order";

export default interface OrderRepository {
	save (order: Order): Promise<void>;
	update (order: Order): Promise<void>;
	get (orderId: string): Promise<Order>;
}
