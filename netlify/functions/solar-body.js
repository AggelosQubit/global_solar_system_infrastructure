exports.handler = async (event) => {
  const name = (event.queryStringParameters && event.queryStringParameters.name) || ''
  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing body name' })
    }
  }

  const key = process.env.API_KEY_SYS_SOL || process.env.VUE_APP_API_KEY_SYS_SOL
  const headers = key ? { Authorization: `Bearer ${key}` } : {}

  try {
    const res = await fetch(
      `https://api.le-systeme-solaire.net/rest/bodies/${encodeURIComponent(name)}`,
      { headers }
    )
    const body = await res.text()
    return {
      statusCode: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json'
      },
      body
    }
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: 'Solar system API unavailable' })
    }
  }
}
