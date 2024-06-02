const express = require('express');
const router = express.Router();
const Person = require('./../models/person')

router.post('/', async(req, res)=>{
    try{
      const data = req.body;
    const newPerson = new Person(data);
  
    // save the new person to the database
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).send('Internal server error');
    }
  
})
  
  // GET method to get the person
router.get('/', async(req, res)=>{
    try{
      const data = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).send('Internal server error');
    }
})

router.get('/:workType', async(req, res)=>{
    try{
  
      const workType = req.params.workType;
      if(workType == 'chef' || workType=='manager' || workType=='waiter'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
      }
      else{
        res.status(404).send('Invalid work type');
      
      }
    }
    catch{
      console.log(err);
      res.status(500).json({err: 'Internal server error'});
    }
})

// update method
router.put('/:id', async (req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            res.status(404).send('Person not found');
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

// delete method
router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).send('Person not found');
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal server error');
    }
    
})



module.exports = router;
  