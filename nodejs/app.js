import {sendgreet} from './greetfnre.js';
const hours=new Date().getHours();
sendgreet(hours);
const name = process.argv[2];
const getgreet = sendgreet(hours);
console.log(`${getgreet},${name}`)