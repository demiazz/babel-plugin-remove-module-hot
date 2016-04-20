console.log('Do something always');

if (module.hot) {
  console.log('Do something, when hot reload available');
}

if (module.hot) {
  console.log('Do something, when hot reload available');
} else {
  console.log('Do something, when hot reload unavailable');
}
