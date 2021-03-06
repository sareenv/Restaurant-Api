
'use strict'
const jwt = require('jsonwebtoken')
const unauthorisedStatusCode = 401

async function checkWaitingStaff(ctx, next) {
	const authHeader = ctx.headers.authorization
	const authMessage = 'Authorisation Header not found, Cannot verify you'
	if(authHeader === undefined) {
		ctx.status = unauthorisedStatusCode
		return ctx.body = {error: true, message: authMessage}
	}
	const jwtToken = authHeader
	try{
		const verify = await jwt.verify(jwtToken, 'darkSecretPrivateKey340CT')
		const memberType = verify.memberType
		if(memberType !== 'Waiting Staff Member') {
			ctx.status = unauthorisedStatusCode
			return ctx.body = {error: true, message: 'only waiting staff can access this resource'}
		}
		return next()
	}catch(error) {
		return ctx.body = {error: true, message: 'Cannot verify json web token it might be malformed'}
	}
}

module.exports = checkWaitingStaff
