const express = require('express')
const app = express()
app.use(express.static('public'));




app.post('/img',(req,res)=>{
    res.send('这里是POST img')
})





const port = 8001
const http = app.listen(port,e=>{
    if(e){
        console.log(e);
    }else{
        console.log(port+'监听成功');
    }

})
