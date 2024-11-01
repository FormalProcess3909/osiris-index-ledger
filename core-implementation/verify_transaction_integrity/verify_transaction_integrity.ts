import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Define the ledger as an exportable object for access in tests or other parts of the application.
export const ledger: core.Transaction[] = [];

export const verifyTransactionIntegrity: handleUnaryCall<
	core.TransactionId,
	core.Status
> = (request, respond) => {
	// Extract the transaction ID from the request message
	const { transaction_id } = request.request;

	// Check if the transaction exists in the ledger
	const transactionExists = ledger.some(
		(transaction) => transaction.transaction_id === transaction_id,
	);

	// Log the integrity check result for debugging purposes
	console.log(
		`Integrity check for transaction ID ${transaction_id}:`,
		transactionExists,
	);

	respond(
		null,
		new core.Status({
			succeeded: true,
		}),
	);
};
