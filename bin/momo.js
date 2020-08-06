#!/usr/bin/env node
// console.log("hello,momo")

//核心处理命令行

const program = require("commander");

const Printer = require('@darkobits/lolcatjs');

const shelljs = require("shelljs");

const chalk = require("chalk");
const inquirer = require("inquirer")
const ora = require("ora");
//模板文件git库:
const template = "direct:https://github.com/lgwebdream/yd-vue-kernel.git"

//专门下载git库
const download = require("download-git-repo")
// 获取用户目录
const userHome = require("user-home")
const input =[
  " _ __ ___   ___  _ __ ___   ___",
  "| '_ ` _ \\ / _ \\| '_ ` _ \\ / _ \\ ",
  "| | | | | | (_) | | | | | | (_) |",
  "|_| |_| |_|\\___/|_| |_| |_|\\___/ ",
  "momo的cli"
].join("\n")
program.version(Printer.default.fromString(input),"-V,--version");

// program.command("init","初始化项目");


const bindHandler = {
  init(){
    // console.log("消息")
    inquirer
    .prompt([
      {
        type: "text",
        message: "请输入文件夹名称",
        name: "dirname"
      },
      {
        type: "list",
        message: "请选择语言",
        choices: ["√ TypeScript","√ ECMAScript"],
        name: "language"
      }
    ])
    .then(answers => {
      const _dirname = answers.dirname;
      if (_dirname) {
        const spinner = ora("下载初始化模板...");
        spinner.start();
        
        // 下载github项目
        const targetDir = "E:/COURSE/Vue/mycode/myvue_cli"
        const _projectPath = `${targetDir}/${_dirname}`;
        shelljs.cd(`${targetDir}`)
        shelljs.rm("-rf",_projectPath)
        shelljs.mkdir(_dirname)

        download(template, _projectPath ,{ clone: true},err => {
          spinner.stop();
          if(err){
            console.log("×下载失败", err.message.trim())
          } else {
            //把用户整理安装过的项目进行核心数据替换
            // shelljs.sed("-i","yd-vue-kernel",_dirname,_projectPath)
            console.log(chalk.green("☺项目创建成功"))
          }

        })
      }

    });
  }
};

program
  .usage("[cmd] <options>")
  .arguments("<cmd> [env]")
  .action((cmd, otherParams) => {
    // console.log(cmd)
    const handler = bindHandler[cmd];
    if(typeof handler === "undefined" ){
      console.log(` ${chalk.yellow("非常遗憾")} 【${chalk.red(cmd)}】还未开放`);
      process.exit(1);
    } else {
        handler(otherParams);
    }
  })

program.parse(process.argv)