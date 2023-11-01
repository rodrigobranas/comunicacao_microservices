import PaymentGateway, { Input, Output } from "../../application/gateway/PaymentGateway";
import axios from "axios";

export default class PaymentGatewayHttp implements PaymentGateway {

	async processPayment(input: Input): Promise<Output> {
		const response = await axios.post("http://localhost:3001/process_payment", input);
		return response.data;
	}

}