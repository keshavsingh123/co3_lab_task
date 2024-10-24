// import express from 'express'
// import { Player } from '../Schema/player.schema.js';

// export const router = express.Router()

// // Get all players
// router.get('/', async (req, res) => {
//   const players = await Player.find({});
//   res.status(200).send(players);
// });

// // Get player by username
// router.get('/:username', async (req, res) => {
//   const player = await Player.findOne({ username: req.params.username });
//   res.status(200).send(player);
// });

// // Create new player
// router.post('/', async (req, res) => {
//   const { username } = req.body;
//   let player = await Player.findOne({ username });

//   if (!player) {
//     player = new Player({ username });
//     await player.save();
//   }

//   res.status(200).send(player);
// });

