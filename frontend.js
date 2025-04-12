const axios= require('axios');
const { response } = require('express');
// sending a get request
axios.get("http://localhost:5000/api/user")
.then(response=>console.log(response.data))
.catch(error=>console.log(error));
//sending a post request
axios.post("http://localhost:5000/api/user",{
  name:"john",
  age:30,
})
.then(response=>console.log(response.data)
.catch(error=>console.log(error)
)
)