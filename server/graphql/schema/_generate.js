const fs = require('fs')
const path = require('path')

const folder = path.join(__dirname)

const files = fs.readdirSync(folder)


let schema = ''

for (let file of files) {

  if (file.endsWith('schema.graphql')) {
    console.log(file)
    const schemaFile = path.join(__dirname, file)
    const schemaData = fs.readFileSync(schemaFile, "utf8")
    schema = schema + schemaData
  }
}
fs.writeFileSync(
  path.join(__dirname, '..', "schema.graphql"),
  schema
)