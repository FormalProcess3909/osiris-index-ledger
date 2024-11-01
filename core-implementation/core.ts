import grpc from "@grpc/grpc-js";
import { addService, loadProtoService } from "../proto.js";
import { hello } from "./hello/hello.js";
import { recordTransaction } from "./record_transaction/record_transaction.js";
import { calculateTotalLedgerValue } from "./calculate_total_ledger_value/calculate_total_ledger_value.js";
import { verifyTransactionIntegrity } from "./verify_transaction_integrity/verify_transaction_integrity.js";

export default function addModule(server: grpc.Server) {
	addService(
		server,
		loadProtoService("proto/core/core.proto", "core", "IndexLedger"),
		{
			RecordTransaction: recordTransaction,
			CalculateTotalLedgerValue: calculateTotalLedgerValue,
			VerifyTransactionIntegrity: verifyTransactionIntegrity,
		},
	);
	addService(
		server,
		loadProtoService("proto/hello.proto", "helloworld", "Greeter"),
		{ SayHello: hello },
	);
}
