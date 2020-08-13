const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

const config = require('../templates.json')

const inputList = [
  {
    type: 'text',
    message: 'Template name',
    name: 'tplName'
  }
]

module.exports = () => {
  inquirer.prompt(inputList).then(answers => {
    const { tplName } = answers
    if (config.tpl[tplName]) {
      config.tpl[tplName] = undefined
    } else {
      console.log(chalk.red(`Template ${ tplName } does not exist!`))
      process.exit()
    }

    fs.writeFile(__dirname + '/../templates.json',JSON.stringify(config, null, 2), 'utf-8', err => {
      if (err) console.log(err)
      console.log(chalk.green('Template deleted!'))
      process.exit()
    })
  })
}