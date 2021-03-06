let ghost
let os = require('os');
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {
        let cpus = os.cpus()
        let thread_count = 0;
        for (let i = 0; i < cpus.length; i++){
                thread_count = i;
        }
        msg.edit('', {
                'embed': {
                        'title': 'Stats',
                        'description': `ghost uptime: ${secondsToString(process.uptime())}`,
                        'fields': [
                                {'name': 'Memory heapUsed', 'value': `${sizeOf(process.memoryUsage().heapUsed)} / ${sizeOf(os.totalmem())}`, 'inline': true},
                                {'name': 'Memory heapTotal', 'value': `${sizeOf(process.memoryUsage().heapTotal)} / ${sizeOf(os.totalmem())}`, 'inline': true},
                                {'name': 'Total Memory Used', 'value': `${sizeOf(os.totalmem()-os.freemem())} / ${sizeOf(os.totalmem())}`, 'inline':true},
                                {'name': 'System Load', 'value': `${os.loadavg()[0].toFixedDown(2)}%`, 'inline': true},
                                {'name': 'Server Uptime', 'value': `${secondsToString(os.uptime())}`},
                        ],
                        'color': ghost.config.embedColor
                }
        })
}

function secondsToString(seconds){
    seconds = Math.trunc(seconds)
    let numdays = Math.floor((seconds % 31536000) / 86400)
    let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
    let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
    let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
    return numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ' + numseconds + ' seconds'
}
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
sizeOf = function (bytes) {
  if (bytes === 0) { return "0.00 B"; }
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
}
