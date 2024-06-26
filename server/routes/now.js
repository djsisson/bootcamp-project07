import Router from 'express-promise-router'
import {supaBase} from '../db/supa_db.js'
 
const router = new Router()
 
export default router
 
router.get('/', async (req, res) => {
  const db = supaBase()
  const { data, error } = await db.rpc('hello')
  res.send(data)
})