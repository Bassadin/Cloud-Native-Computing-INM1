import amqp from "amqplib/callback_api";
import { Logger } from "./Logger";

export class MessageQueue {
    private static instance: MessageQueue;

    private queueName = "cnc.hodappba";

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
        const logger = Logger.getInstance().getLogger();

        amqp.connect("amqp://cnc:cnc@localhost:5672", (error0, connection) => {
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
                logger.info(" [x] Sent %s", messageToSend);
            });

            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                channel.assertQueue(this.queueName, {
                    durable: false,
                });

                logger.info(" [*] Waiting for messages in %s.", this.queueName);

                channel.consume(
                    this.queueName,
                    function (msg) {
                        logger.info(" [x] Received %s", msg!.content.toString());
                    },
                    {
                        noAck: true,
                    }
                );
            });
        });
    }
}
