const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://saif:${password}@cluster0-53bpi.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: { 
    type: String,
    minlength: 8,
    required: true
  },
})

const Person = mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length===5) {
    const inputName = process.argv[3]
    const inputNumber = process.argv[4]
    const person = new Person({
        name: inputName,
        number: inputNumber,
      })
      
      person.save().then(response => {
        console.log(`added ${inputName} number ${inputNumber} to phonebook`)
        mongoose.connection.close()
      })
} else if(process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log("phonebook:\n");
        result.forEach(personRes => {
          console.log(personRes, '\n')
        })
        mongoose.connection.close()
      })
} else {
    console.log('wrong input parameters')
    process.exit(1)
}

