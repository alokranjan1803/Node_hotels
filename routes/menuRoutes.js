const express = require('express');
const router = express.Router();

const Menu = require('./../models/menu');

router.post('/', async(req, res)=>{
    try{
       
       const data = req.body;
       const newMenu = new Menu(data);
       // save the menu to the database
       const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
  
    }
    catch{
      console.log(err);
      res.status(500).send('Internal server error');
    } 
})
  
router.get('/', async(req, res)=>{
    try{
      const data = await Menu.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).send('Internal server error');
    }
})

router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).send('Menu not found');
        }
        console.log('data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal server error');

    }

})

router.delete('/:id', async(req, res)=>{
    try{
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).send('Menu not found');
        }
        console.log('data deleted');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }

})

module.exports = router;
  
  