
'use-strict'
var mongo = require('mongoose');

var app = require('./app');
var port = process.argv.PORT || 4674;

mongo.connect('mongodb://localhost:27017/capacitacionjwt',(err,res)=>{
    if(err) {
        throw err;
    }else {
            console.log('Se ha establecido la conxion con mogodb');
            
    }
});

app.listen(port, ()=>{
    console.log('Servidor levantado correctamente');
}); 


