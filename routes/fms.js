const express = require("express")
const net = require("net")
const router = express.Router()


/* GET users listing. */
router.get("/", function (req, res, next) {
  const config = {
    title: "FMS Demo"
  }
  res.render("fms-main", config)
})

router.get("/command/:cmd", (req, res) => {
  
  const client = new net.Socket()
  console.log(process.env.FMS_MICOM_PORT, process.env.FMS_MICOM_IP)
  client.connect(process.env.FMS_MICOM_PORT, process.env.FMS_MICOM_IP, () => {
    try {
      console.log("FMS MICOM에 연결되었습니다.")
      let str = "CF06WC1234\r\n"
      switch (req?.params?.cmd) {
        case "on":
          client.write(str + "CF04GOTH\r\n")
          break
        case "off":
          client.write(str + "CF04GOTL\r\n")
          break
        case "reboot":
          client.write(str + "CF08GHTL03E8\r\n")
          break
        case "status":
          client.write(str + "CF03GIA\r\n")
          break
      }
      
      console.log(req.params.cmd)
    }
    catch (err) {
      res.status(500).json({
        status: 500,
        error: "연결 에러: " + err.message
      })
    }
  })
  
  
  client.on("data", (data) => {
    console.log(data.toString())
    try {
      console.log("FMS MICOM으로부터 받은 데이터: " + data?.toString())
      client.destroy()
      
      let str = data?.toString() || ""
      let message = "SUCCESS"
      
      if (str !== "FC03WRY\r") {
        if (data.toString().includes("FC04GIAH")) {
          message = "ON"
        }
        else if (data.toString().includes("FC04GIAL")) {
          message = "OFF"
        }
        res.status(200).json({ status: 200, message })
      }
    }
    catch (err) {
      res.status(500).json({
        status: 500,
        error: "연결 에러: " + err.message
      })
    }
  })
  
  
  client.on("close", () => {
    console.log("FMS MICOM 연결이 끊어졌습니다.")
  })
  
  client.on("error", (err) => {
    console.error("FMS MICOM 연결 에러:", err)
    res.status(500).send("연결 에러: " + err.message)
  })
})

module.exports = router
