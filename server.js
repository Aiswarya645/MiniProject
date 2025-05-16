const http=require("http")

http.createServer((req,res)=>{
    if(req.url=="/"){
        res.write("haii")
        res.end()

    }
    else if(req.url=="/ab"){
        res.write("hello")
        res.end()
    }
})
.listen(5000,()=>console.log("server runnig"))