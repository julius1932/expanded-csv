const csv=require('csvtojson');

const csvFilePath='data.csv';
const MongoClient = require('mongodb').MongoClient;
const urlll = "mongodb://localhost:27017/";

//product_brand,product_category,product_model,manufacturer,manufacturer_address,manufacturer_country,status
csv().fromFile(csvFilePath).then((jsonObj)=>{
    console.log();
var items =[];
var jData={};
jsonObj.forEach(function(item){
  var brand=item.product_brand.trim();
  var pcate=item.product_category.trim();
  var manu=item.manufacturer.trim();
  var addres=item.manufacturer_address.trim();
  var country=item.manufacturer_country.trim();
  var status =item.status.trim();

  var product_model=item.product_model;

  var key =brand+pcate+manu+addres+country+status;

  product_model = product_model.split('[').join('');
  product_model = product_model.split(']').join('');
  product_model = product_model.split("'").join('');
  product_model = product_model.split(",").join('');
  product_model = product_model.split('"');
  product_model = product_model.filter(model => model);
  //console.log(product_model);
  product_model.forEach(function(model){
    var item ={
      product_brand:brand,
      product_category:pcate,
      product_model:model,
      manufacturer:manu,
      manufacturer_address:addres,
      manufacturer_country:country,
      status:status
    }
    items.push(item);
  });
});
MongoClient.connect(urlll, function(rr, db) {
     console.log("=============");
     if (rr) {isfound=false; return;};
      var dbo = db.db("dataIndia");
      var count =0;
      //dbo.collection("drs").createIndex({ 'fn': "text",'ln':"text" ,'s':"text"});
      dbo.collection("tabel").insert(items,function(errr, reslts) {
        console.log(count);
      });
  //console.log(item);
  });
});
