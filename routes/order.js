'use strict'

const Router = require('koa-router')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const router = new Router()

const Order = require('../modules/order')
const ordersDb = require('../databases/orderdb')
const badRequestHttpCode = 400

router.post('/order', koaBody, async ctx => {
	const {tablenumber, orderedItems} = ctx.request.body
	const order = new Order(ordersDb.database)
	try{
		const orderResult = await order.orderRegistration(tablenumber, orderedItems)
		if(orderResult === true) {
			return ctx.redirect('/neworder')
		}
		return ctx.body = 'Sorry the order was not registered'
	}catch(error) {
		console.log(error)
		ctx.throw(badRequestHttpCode, 'Failed to save this operation')
	}
})

router.get('/pendingOrders', async ctx => {
	const order = new Order(ordersDb.database)
	try{
		const pendingOders = await order.pendingOrders('Kitchen Staff Member')
		await ctx.render('pendingOrders', {pendingOrders: pendingOders})
	}catch(error) {
		await ctx.render('error', {error: 'Cannot Access this resource'})
	}
})

router.post('/orderCollection', koaBody, async ctx => {
	const orderId = ctx.request.body.orderId
	const accessType = 'Kitchen Staff Member'
	const order = new Order(ordersDb.database)
	try{
		const result = await order.collectionReadyOrders(orderId, accessType)
		if(result === true) {
			return ctx.redirect('/pendingOrders')
		}
		return ctx.redirect('error', {error: 'Order collection call failed'})
	}catch(error) {
		console.log(error)
		return ctx.redirect('error', {error: error})
	}
})

module.exports = router
