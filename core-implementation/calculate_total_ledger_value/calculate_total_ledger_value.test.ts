import grpc, { ServiceError } from "@grpc/grpc-js";
import { server, serverUp, target } from "../../main.js";
import { core } from "../../generated/core/core.js";

// Client setup for IndexLedger service
let client: core.IndexLedgerClient;

beforeAll(async () => {
    await serverUp;
    client = new core.IndexLedgerClient(
        target,
        grpc.credentials.createInsecure(),
    );
});

afterAll(() => {
    server.forceShutdown();
});

test("calculate total ledger value", (done) => {
    client.CalculateTotalLedgerValue(new core.Null(), function (
        err: ServiceError | null,
        response: core.CurrencyValue | undefined,
    ) {
        // Signal Jest that the async test is complete
        done();

        // Expected total amount in the ledger for testing
        const expectedTotalValue = 50000.0; // Replace with actual test value

        // Assertions to verify that the response matches expected output
        expect(err).toBeNull();
        expect(response).toBeDefined();
        expect(response?.value).toEqual(expectedTotalValue);
    });
});
