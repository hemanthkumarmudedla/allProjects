import { ServiceBusClient } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";

class MyAzureServiceBus {
    fullyQualifiedNamespace = "NameS1.servicebus.windows.net";
    queueName = "q1";

    credential = new DefaultAzureCredential();

    async connectToServiceBus(messages: any) {
        const client = new ServiceBusClient(this.fullyQualifiedNamespace, this.credential);

        const sender = client.createSender(this.queueName);

        const batch = await sender.createMessageBatch();

        messages.forEach((message: any) => {
            sender.sendMessages(message);
        });
        console.log("Success");
        await sender.close();
        await client.close();
    }
}

export default new MyAzureServiceBus();