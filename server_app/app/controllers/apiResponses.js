function inferType(body) {
  if (body !== null && typeof body === 'object') {
    return 'application/json'
  } else {
    return 'text/plain'
  }
}

function writeResponse(res, httpCode, body) {
  res.writeHead(httpCode, {
    'Content-Type': inferType(body)
  })

  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }
  res.end(body)
}

exports.ok = function(res, body) { writeResponse(res, 200, body) }


exports.notFound = function(res, body) { writeResponse(res, 404, body) }

exports.internalError = function (res) { writeResponse(res, 500, 'Internal server error') }