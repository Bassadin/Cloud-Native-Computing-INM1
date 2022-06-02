import amqp from "amqplib/callback_api";

export class MessageQueue {
    private static instance: MessageQueue;

    private queueName = "cnc-hodappba";

    private constructor() {
        this.initialize();
    }

    public static getInstance(): MessageQueue {
        if (!MessageQueue.instance) {
            MessageQueue.instance = new MessageQueue();
        }

        return MessageQueue.instance;
    }

    private initialize() {
        amqp.connect("amqp://localhost", (error0, connection) => {
            if (error0) {
                throw error0;
            }
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                var messageToSend = "Hello world";

                channel.assertQueue(this.queueName, {
                    durable: false,
                });

                channel.sendToQueue(this.queueName, Buffer.from(messageToSend));
                console.log(" [x] Sent %s", messageToSend);
            });
        });
    }
}
