import amqp, { Connection, ConsumeMessage } from 'amqplib';

const queue = 'hello';

const init = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();

  await channel.assertQueue(queue, {
    durable: false
  });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(queue, (msg: ConsumeMessage | null) => {
    if (msg) console.log(" [x] Received %s", msg.content.toString());
  }, {
    noAck: true
  });
}

init();