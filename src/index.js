var fs = require('fs')

module.exports = {
  isHusky: function(filename) {
    var data = fs.readFileSync(filename, 'utf-8')
    return data.indexOf('# husky') === 0
  },

  write: function(filename, data) {
    fs.writeFileSync(filename, data)
    fs.chmodSync(filename, 0755)
  },

  create: function(dir, name, cmd) {
    var filename = dir + '/' + name
    var data = [
      '# husky',
      'PATH=' + process.env.PATH,
      cmd,
      'if [ $? -ne 0 ]; then',
      '  echo',
      '  echo "husky"',
      '  echo "  To bypass ' + name + ' hook add -n or --no-verify"',
      '  echo',
      'fi'
    ].join('\n')

    if (!fs.existsSync(filename)) {
      this.write(filename, data)
    } else {
      if (this.isHusky(filename)) {
        this.write(filename, data)
      } else {
        console.log('  skipping .git/hooks/' + name + ' (existing user hook)')
      }
    }
  },

  remove: function(dir, name) {
    var filename = dir + '/' + name

    if (fs.existsSync(filename) && this.isHusky(filename)) {
      fs.unlinkSync(dir + '/' + name)
    }
  }
}