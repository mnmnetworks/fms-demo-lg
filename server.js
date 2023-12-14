const express = require("express")
const net = require("net")
const app = express()
const port = 3000 // Express 서버 포트

// FMS MICOM의 IP 주소와 포트
const FMS_MICOM_IP = "192.168.0.4"
const FMS_MICOM_PORT = 9764


app.get("/send-command/:cmd", (req, res, next) => {
  
  const client = new net.Socket()
  client.connect(FMS_MICOM_PORT, FMS_MICOM_IP, () => {
    console.log("FMS MICOM에 연결되었습니다.")
    client.write("CF06WC1234\r\n")
    switch (req?.params?.cmd) {
      case "on":
        client.write("CF04GOTH\r\n")
        break
      case "off":
        client.write("CF04GOTL\r\n")
        break
      case "reboot":
        client.write("CF08GHTL03E8\r\n")
        break
      case "state":
        client.write("CF03GIA\r\n")
        break
    }
    
    
    // client.write('CFGOTL\r\n'); // 명령어를 FMS MICOM에 보냄
    // client.write('CFGOTH\r\n'); // 명령어를 FMS MICOM에 보냄
  })
  
  
  client.on("data", (data) => {
    console.log("FMS MICOM으로부터 받은 데이터: " + data.toString())
    client.destroy()
    res.send("명령이 전송되었습니다: " + data.toString())
  })
  
  
  client.on("close", () => {
    console.log("FMS MICOM 연결이 끊어졌습니다.")
  })
  
  client.on("error", (err) => {
    console.error("FMS MICOM 연결 에러:", err)
    res.status(500).send("연결 에러: " + err.message)
  })
})

app.listen(port, () => {
  console.log(`Express 서버가 포트 ${ port }에서 실행중입니다.`)
})