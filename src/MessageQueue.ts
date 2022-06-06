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

        amqp.connect("amqp://cnc:cnc@rabbitmq.rabbitmq:5672//cnc", (error0, connection) => {
            if (error0) {
                logger.error(error0);
                throw error0;
            }

            logger.info("Successfully connected to RabbitMQ.");

            // Producer
            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                var messageToSend = "Hello world";

                channel.assertQueue(this.queueName, {
                    durable: false,
                });

                // Send message every second
                setInterval(() => {
                    channel.sendToQueue(this.queueName, Buffer.from(messageToSend));
                    logger.info(" [x] Sent %s", messageToSend);
                }, 1000);
            });

            // Consumer
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
