'use strict'

const inquirer = require('inquirer')

const chalk = require('chalk')

const config = require('../templates.json')
const fs = require('fs')

const inputList = [
  {
    type: 'text',
    message: 'template name: ',
    name: 'tplName'
  },
  {
    type: 'text',
    message: 'git https link: ',
    name: 'gitUrl'
  },
  {
    type: 'text',
    message: 'Branch: ',
    name: 'branch'
  }
]

module.exports = () => {
  inquirer.prompt(inputList).then(answers => {
    const { tplName, gitUrl, branch } = answers

    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') //过滤Unicode字符
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red(`template ${ tplName } is existed!`))
      process.exit()
    }

    //模板信息写入template.json
    fs.writeFile(__dirname + '/../templates.json',JSON.stringify(config, null, 2), 'utf-8', err => {
      if (err) {
        console.log(err)
      }

      console.log(chalk.green('new template added success!\n'))
      console.log(chalk.grey("the last template list is: \n"))
      console.log(JSON.stringify(config.tpl, null, 2))
      process.exit()
    })
  })

}