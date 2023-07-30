const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pms', {useNewUrlParser: true,}).then(()=> console.log('')).catch((err)=> {console.error(err);});
var conn =mongoose.Collection;
var passcatSchema =new mongoose.Schema({
    password_category: {type:String, 
        required: true,
        index: {
            unique: true,        
        }},

    date:{
        type: Date, 
        default: Date.now }
});

var passCateModel = mongoose.model('password_categories', passcatSchema);
module.exports=passCateModel;