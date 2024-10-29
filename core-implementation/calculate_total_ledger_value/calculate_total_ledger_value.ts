import { handleUnaryCall } from "@grpc/grpc-js";
import { core } from "../../generated/core/core.js";

// Define the ledger as an exportable object for access in tests or other parts of the application.
export const ledger: core.Transaction[] = [];

// Define the 'calculateTotalLedgerValue' function as a gRPC service method
export const calculateTotalLedgerValue: handleUnaryCall<core.Null, core.CurrencyValue> = (
    request,
    respond,
) => {
    // Calculate the total value by summing up the amount in each transaction from the shared ledger
    const totalValue = ledger.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Log the calculated value for debugging
    console.log("Calculated Total Ledger Value:", totalValue);

    // Respond with the total ledger value encapsulated in a CurrencyValue message
    respond(
        null,
        new core.CurrencyValue({
            value: totalValue,
        }),
    );
};
