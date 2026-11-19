let intervalId

let params = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

$(function () {
  displayTime(formatTime(params))
})

function formatTime(params) {
  return `${params.hours} : ${params.minutes} : ${params.seconds} : ${params.milliseconds}`
}

function displayTime(formattedTime) {
  $('#result').text(formattedTime)
}

function startTime(e) {
  const currentButton = e.currentTarget

  intervalId = setInterval(() => {
    params.milliseconds++

    if (params.milliseconds >= 9) {
      params.milliseconds = 0
      params.seconds++
    }

    displayTime(formatTime(params))
  }, 100)

  buttonTypeChange(currentButton)
}

function stopTime(e) {
  const currentButton = e.currentTarget

  clearInterval(intervalId)

  buttonTypeChange(currentButton)
}

function resetTime(e) {
  const currentButton = e.currentTarget
  ;((params.hours = 0),
    (params.milliseconds = 0),
    (params.minutes = 0),
    (params.seconds = 0))

  clearInterval(intervalId)

  displayTime(formatTime(params))

  buttonTypeChange(currentButton)
}

function buttonTypeChange(currentButton) {
  const buttons = ['#resetBtn', '#stopBtn']
  const buttonName = currentButton.id

  switch (buttonName) {
    case 'startBtn':
      disableChangeButtonState('#startBtn', buttons)
      break
    case 'stopBtn':
      disableChangeButtonState('#stopBtn', '#startBtn')
      break
    case 'resetBtn':
      disableChangeButtonState(buttons, '#startBtn')
  }
}

function disableChangeButtonState(disableButton, enableButton = null) {
  if (Array.isArray(disableButton)) {
    $.each(disableButton, function (index, button) {
      $(button).prop('disabled', true)
    })
  }

  if (typeof disableButton === 'string') {
    $(disableButton).prop('disabled', true)
  }

  if (Array.isArray(enableButton)) {
    $.each(enableButton, function (index, button) {
      $(button).prop('disabled', false)
    })
  } else if (typeof enableButton === 'string') {
    $(enableButton).prop('disabled', false)
  }
}

$('#startBtn').on('click', (e) => startTime(e))

$('#stopBtn').on('click', (e) => stopTime(e))

$('#resetBtn').on('click', (e) => resetTime(e))
