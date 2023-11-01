export default interface PaymentGateway {
	processPayment (input: Input): Promise<Output>;
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
