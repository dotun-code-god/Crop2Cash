const express = require('express');
const app = express();
const Farmer = require('./models/baseModel');
require('dotenv').config();

app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.get('/add-farmer', (req, res) => {
    res.render('add-farmer', {error: null});
})

app.post('/add-farmer', async (req, res) => {
    let data = req.body;
    for (const key in data) {
        if(!data[key]){
            if(key == 'crops'){
                return res.render('add-farmer', {error:"Click the add icon to add crop"});
            }
            return res.render('add-farmer', {error:"Please fill out all fields"});
        }
    }
    if (await Farmer.save(data))
        return res.redirect('/');
})

app.get('/search', async (req, res) => {
    if (Object.keys(req.query).length){
        let search = req.query; data = {}; category = []; crops = [];
        for(const key in search){
            let det = key.indexOf('-') != -1 ? key.split('-')[0] : key;
            if(det == 'category') category.push(search[key])
            else if(det == 'crops') crops.push(search[key])
            else data[det] = search[key]
        }
        data['attr'] = category;
        crops.length ? data['crops'] = crops : '';
        let farmers = await Farmer.retrieveFarmers(data);
        return res.render('index', { farmers });
    } else {
        let farmers = await Farmer.retrieveAllFarmers();
        res.render('index', {farmers});
    }
})

app.listen(process.env.PORT, () => console.log('Server started on port 5000'));