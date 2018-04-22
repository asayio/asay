async function crawlerIdentifier(request) {
  const userAgent = request.headers['user-agent'];
  const botList = [
    'googlebot',
    'bingbot',
    'duckduckbot',
    'twitterbot',
    'facebookexternalhit',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest',
    'slackbot',
    'W3C_Validator'
  ];
  const botString = botList.join('|');
  const isBot = userAgent.match(botString);
  return isBot;
}

module.exports = crawlerIdentifier;
