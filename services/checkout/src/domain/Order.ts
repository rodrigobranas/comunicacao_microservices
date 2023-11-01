import crypto from "crypto";

export default class Order {

	constructor (readonly orderId: string, readonly courseId: string, readonly name: string, readonly email: string, readonly amount: number, private status: string) {
	}

	confirm () {
		this.status = "confirmed";
	}

	getStatus () {
		return this.status;
	}

	static create (courseId: string, name: string, email: string, amount: number) {
		const orderId = crypto.randomUUID();
		const status = "waiting_payment";
		return new Order(orderId, courseId, name, email, amount, status);
	}

}
