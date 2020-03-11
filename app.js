const express = require('express');
const { dockStart } = require('@nlpjs/basic');
const bodyParser =require('body-parser');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var dock ;
var nlp;
//app.use(express.static(__dirname));

try{ (async () => {
    dock = await dockStart({ use: ['Basic']});
    nlp = dock.get('nlp');
    await nlp.addCorpus('./corpus-en.json');
    await nlp.train();
  })();}
      catch (e){console.log(e)};
app.get('/trainmodel',(req,res) => {
   try{ (async () => {
    dock = await dockStart({ use: ['Basic']});
    nlp = dock.get('nlp');
    await nlp.addCorpus('./corpus-en.json');
    await nlp.train();
  })();}
      catch (e){console.log(e)};
})
app.post('/message',(req,res) => {
    console.log('###############',req.body)
    nlp.process('en', req.body.mess)
    .then(resp => {
        res.send(resp.answer)
    })
    .catch(err => {
        console.log(err);
        res.send(' Sorry ,I am not able to work properly')
    })
})
app.listen(5000 , () => {
    console.log('server is listning on port 5000')
})