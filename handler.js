'use strict';
const AWS = require('aws-sdk');

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.startEC2 = (event, context, callback) => {
  const ec2 = new AWS.EC2();
  const params = {
    InstanceIds: [
      event.instanceId
    ]
  }

  return ec2.startInstances(params).promise().then(() => {
    callback(null, `Your ${event.instanceId} instance started successfully`);
  }).catch(error => {
    callback(error.message);
  });
};

module.exports.writeS3 = (event, context, callback) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'serverless-logs-bucket',
    Key: 'success!!'
 }

  return s3.putObject(params).promise().then(() => {
    callback(null, `a log writed successfully`);
  }).catch(error => {
    callback(error.message);
  });
};