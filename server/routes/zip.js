const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/api/v1/zip`;

const zips = require('./zips')

module.exports = router;

router.get(BASE_URL + '/:id', async (ctx) => {
	  console.log('ctx= '+ctx)
  try {
        console.log('zip with zip')
        ctx.body = {
        status: 'success',
        latLon: zips[ctx.params.id]
        }
  } catch (err) {
    console.log('Zip router err:' + err)
  }
})

router.get(BASE_URL, async (ctx) => {
	  console.log('ctx= '+ctx)
  try {
    console.log('zips!')
    ctx.body = {
      status: 'success',
      data: zips
    };
  } catch (err) {
    console.log('Zip router err:' + err)
  }
})

