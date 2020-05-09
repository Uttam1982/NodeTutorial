//create promise
const p = new Promise((resolve, reject) => {
  //kick of the async work
  //...
  setTimeout(() => {
    //resolve(1); //pending => resolve, fulfilled
    reject(new Error('Opps! something went wrong !!')); //pending =>rejected
  }, 2000);
});

//consume promise
p.then((result) => console.log('Result :', result)).catch((err) =>
  console.log('Error: ', err.message)
);
