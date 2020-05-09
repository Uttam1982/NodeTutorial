const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Calling async operation: Facebook API');
    resolve(1);
    //reject(new Error('Error in calling Facebook API...'));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Calling async operation: Twitter API');
    resolve(2);
  }, 2000);
});

//Want both to run parallel and when the result of both these asynchronous
//operations are ready then you want something return to the client

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
