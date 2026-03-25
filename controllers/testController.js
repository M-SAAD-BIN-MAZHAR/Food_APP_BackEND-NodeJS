const testUserController=(req,res)=>{
try {
    res.status(200).send("Test user controller is working")
} catch (error) {
    res.status(500).send("Internal Server Error")
}
}
module.exports={ testUserController }