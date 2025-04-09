const userLogin=(req,res)=>{
  res.send("this is user login route")
}
const signup=(req,res)=>{
  res.send("this is signup page route")
}
module.exports={
  userLogin,signup
}