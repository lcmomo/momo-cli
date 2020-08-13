'use strict'

const inquirer = require("inquirer")
const chalk = require("chalk")
const config = require("../templates.json")

// 专门下载git库

const download = require("download-git-repo")

//获取用户目录
const userHome = require("user-home")

const ora = require("ora")

const shelljs = require("shelljs")

const tplList = Object.keys(config.tpl).map(item => item)

const inputList = [
  {
    type: "text",
    message: "项目名称",
    name: "projectName"
  },
  {
    type: "list",
    message: "模板名称",
    choices: tplList,
    name:'tplName'
  }
]

module.exports = () => {
  inquirer.prompt(inputList).then(answers => {
    const { projectName, tplName } = answers

    let gitUrl 
    let branch

    if (!config.tpl[tplName]) {
      console.log(chalk.red(`\n Template ${ tplName} does not exist !`))
      process.exit()
    }

    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    let downloadCommand = `direct:${ gitUrl }#${ branch }`

    if (projectName) {
      const spinner = ora("下载初始化模板...")
      spinner.start()

      const currentDir = shelljs.pwd()
      const _projectPath = `${ currentDir }/${ projectName }`
      shelljs.cd(`${currentDir}`)
      shelljs.rm("-rf", _projectPath)
      shelljs.mkdir(projectName)

      download(downloadCommand, _projectPath, { clone: true }, err => {
        spinner.stop()
        if (err) {
          console.log(chalk.red(`x 下载失败, ${ err.message.trim()}`))
        } else {
          //把用户整理安装过的项目进行核心模块替换
          // shelljs.sed("-i", "momo-cli", _projectName, _projectPath)

          console.log(chalk.green("@创建成功!"))
          console.log(`\n cd ${ projectName } && npm install`)
          process.exit()
        }
      })

    }
  })
}
