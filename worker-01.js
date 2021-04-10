#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            

            setTimeout(function () {
                console.log(" [x] Done");
            }, 15 * 1000);

            channel.ack(msg);
        }, {
            // automatic acknowledgment mode,
            // see https://www.rabbitmq.com/confirms.html for details
            noAck: false
        });


    });
});