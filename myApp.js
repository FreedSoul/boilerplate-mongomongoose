require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var matt = new Person();
  matt.save(function(error,data){
    if (error) return console.log(error)
    done(null, data);
  })
};

let arrayOfPeople = [{name: 'matt', age: 28 , favoriteFoods:['patacon','pizza']},
{name: 'camila', age: 21 , favoriteFoods:['pato','picada']},
{name: 'tadeo', age: 29 , favoriteFoods:['frijol','cerdo']},
{name: 'maria', age: 48 , favoriteFoods:['helado','pizza']},
{name: 'andres', age: 38 , favoriteFoods:['spaghetti','pizza']}]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(error,data){
    if (error) return console.log(error)
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName},function(error,data){
    if (error) return done(error)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food},function(error,data){
    if (error) return done(error)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
   Person.findById({ _id: personId},function(error,data){
    if (error) return done(error)
    done(null, data);
  }) 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById( personId , function(error, person){
    if (error) return console.log(error)
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err,updatedPerson){
      if(err) return console.log(err)
      done(null, updatedPerson);
    })
  }) 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },{ age : ageToSet }, {new : true}, (err, person) => {
    if (err) return console.log(err)
    done(null, person);
  
    // person.save(function(err,updatedPerson){
      // if(err) return console.log(err)
    // })
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
