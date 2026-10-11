import os from "node:os"

function osPlatform():void {
  console.log(`OS Platform: ${os.platform()} `)
  console.log(`OS Architecture: ${os.arch()} `)
  console.log(`OS Type: ${os.type()} `)
  console.log(`OS Release: ${os.release()} `)

  console.log(`Home Directory: ${os.homedir()} `)
  console.log(`Temp Directory: ${os.tmpdir()} `)

  console.log(`CPUs: ${os.cpus().length}`)
  console.log(`CPU Model: ${os.cpus()[0].model}`)
  console.log(`CPU Speed: ${os.cpus()[0].speed}`)

  console.log(`Total Memory: ${os.totalmem()}`)
  console.log(`Free Memory: ${os.freemem()}`)


}

osPlatform()
