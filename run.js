console.log('Panel siap digunakan, silahkan masukan perintah Anda.')
require('child_process').spawn('bash', [], {
  stdio: ['inherit', 'inherit', 'inherit', 'ipc']
})
