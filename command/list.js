'use strict'

const config = require("../templates.json")

module.exports = () => {
  console.log(JSON.stringify(config.tpl, null, 2));
}