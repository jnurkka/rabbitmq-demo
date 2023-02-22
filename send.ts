import amqp, { Channel, Connection } from 'amqplib';

const queue = 'hello';

const send = (channel: Channel, queue: string, msg: string) => {
  channel.sendToQueue(queue, Buffer.from(msg));
  console.log(" [x] Sent %s", msg);
}

const init = async () => {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  channel.assertQueue('hello', {durable: false });
  setInterval(() => {
    send(channel, queue, 'Hello World!');
  }, 1000);
};

init();