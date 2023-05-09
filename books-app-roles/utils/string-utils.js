const cleanText = text => text.trim()

const capitalizeText = text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()

module.exports = { cleanText, capitalizeText }