const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.hutrbtt.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person', personSchema)

if (!(name) || !(number)) {
    console.log('phonebook:')
    mongoose
        .connect(url)
        .then(result => {
            Person.find({}).then(resources => {
                resources.forEach(person => {
                    console.log(person.name, person.number)
                })
            })
            mongoose.connection.close()
        })
}

else {
    mongoose
        .connect(url)
        .then(result => {
            console.log('connected')

        const person = new Person({
            name : name,
            number : number
        })

        return person.save()
        })
        .then(() => {
            console.log(`added ${name} number ${number} to phonebook`)
            return mongoose.collection.close()
        })
        .catch(error => console.log(error))
}