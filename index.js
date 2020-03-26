const { json, lines, install } = require('mrm-core')

function task() {
  const config = lines('commitlint.config.js')

  const contents = config.get()

  config
    .remove(contents)
    .add(`module.exports = {extends: ['@commitlint/config-conventional']}\n`)
    .save()

  json('package.json')
    .merge({
      husky: {
        hooks: {
          'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
        }
      }
    })
    .save()

  install(['husky', '@commitlint/cli', '@commitlint/config-conventional'])
}

task.description = 'Adds commitlint'

module.exports = task;
