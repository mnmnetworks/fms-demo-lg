$(".btn-on").click(async function () {
  try {
    $("button").prop("disabled", true)
    const res = await axios.get("/fms/command/on")
    console.log(res?.data?.message || "")
  }
  catch (err) {
    console.log(err)
  }
  finally {
    setTimeout(function() {
      $("button").prop("disabled", false)
    }, 1000)
  }
})

$(".btn-off").click(async function () {
  try {
    $("button").prop("disabled", true)
    const res = await axios.get("/fms/command/off")
    console.log(res?.data?.message || "")
  }
  catch (err) {
    console.log(err)
  }
  finally {
    setTimeout(function() {
      $("button").prop("disabled", false)
    }, 1000)
  }
})

$(".btn-reboot").click(async function () {
  try {
    $("button").prop("disabled", true)
    const res = await axios.get("/fms/command/reboot")
    console.log(res?.data?.message || "")
  }
  catch (err) {
    console.log(err)
  }
  finally {
    setTimeout(function() {
      $("button").prop("disabled", false)
    }, 1000)
  }
})

$(".btn-status").click(async function () {
  try {
    $("button").prop("disabled", true)
    const res = await axios.get("/fms/command/status")
    console.log(res?.data?.message || "")
    $(".green").hide()
    $(".red").hide()
    if (res?.data?.message === "ON") $(".green").show()
    else $(".red").show()
    
  }
  catch (err) {
    console.log(err)
  }
  finally {
    setTimeout(function() {
      $("button").prop("disabled", false)
    }, 1000)
  }
})

