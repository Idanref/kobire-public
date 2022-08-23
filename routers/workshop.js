const express = require('express');
const router = new express.Router();
const Workshop = require('../models/workshop');
const Coupon = require('../models/coupon');
const { check, validationResult } = require('express-validator');
const { confirmationEmail, sendReceipt } = require('../emails/emails');

// @PUT - Add participant to 'pending' array & Send confirmation email with code
// @route - /workshops/pending/:workshopId
// @access - Public
router.put(
  '/workshops/pending/:workshopId',
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('phone', 'Invalid phone format').isLength({ min: 9 }),
  check('numOfTickets', 'Number of tickets invalid').not().isEmpty().isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = {
      ...req.body,
      // generating a 6-figure code
      code: Math.floor(Math.random() * 899999 + 100000),
    };

    try {
      let workshop = await Workshop.findOne({ _id: req.params.workshopId });

      if (workshop) {
        let pending = workshop.pending;

        if (workshop.soldOut) {
          return res.status(500).send('Workshop is sold out');
        }

        const matchedUsers = pending.filter((item) => item.email === user.email);

        // if user is already in 'pending' array
        if (matchedUsers.length > 0) {
          // if user verified
          if (matchedUsers[0].verified) {
            return res.status(500).send('המשתמש כבר אומת');
            // if user not verified
          } else {
            // find index and replace user
            var index = pending.findIndex((item) => item.email === user.email);
            pending[index] = user;
          }
        } else {
          pending = [...pending, user];
        }

        workshop = await Workshop.findOneAndUpdate({ _id: req.params.workshopId }, { $set: { pending } }, { new: true, runValidators: true })
          .populate({
            path: 'pending',
            populate: { path: 'coupon', model: 'Coupon' },
          })
          .populate({
            path: 'participants',
            populate: { path: 'coupon', model: 'Coupon' },
          });

        confirmationEmail(user.email, user.name, user.code);

        return res.json(workshop);
      }
      return res.status(404).send("Workshop doesn't exist");
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('server error');
    }
  }
);

// @PUT - Confirm email (with sent code)
// @route - /workshops/confirm/:workshopId
// @access - Public
router.put('/workshops/confirm/:workshopId', check('email', 'Email is required').isEmail(), check('code', 'Code is required').not().isEmpty(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let workshop = await Workshop.findOne({ _id: req.params.workshopId }).populate({ path: 'pending', populate: { path: 'coupon', model: 'Coupon' } });

    if (workshop) {
      const pending = workshop.pending;

      // Getting the user in an object format
      const matchedUser = pending.filter((item) => item.email === req.body.email)[0];

      // If no matched user
      if (!matchedUser) {
        return res.status(404).send('User not found');
      }

      // Checking if codes match
      if (matchedUser.code.toString() === req.body.code) {
        // Iterating through the pending array, finding the user and updating 'verified' to true. The user is unique by email (checked in insertion route)
        pending.forEach(async (item) => {
          if (item.email === req.body.email) {
            item.verified = true;
            // if user has a coupon, decrease coupon count by 1
            if (item.coupon) {
              await Coupon.findByIdAndUpdate(item.coupon._id, { $inc: { useLimit: -1 } });
            }
          }
        });

        // Setting the updates in mongo
        workshop = await Workshop.findOneAndUpdate({ _id: req.params.workshopId }, { $set: { pending } }, { new: true, runValidators: true });

        return res.json(workshop);
      }

      return res.status(401).send(`Code doesn't match`);
    }
    return res.status(404).send("Workshop doesn't exist");
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Check if coupon available
// @route - /workshops/checkcoupon/:couponCode
// @access - Public
router.get('/workshops/checkcoupon/:couponCode', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ couponCode: req.params.couponCode.toLowerCase() });

    if (!coupon) {
      return res.status(404).send('Coupon not found');
    }

    // Date expired OR useLimit reached
    if (coupon.expirationDate < new Date(Date.now()) || coupon.useLimit <= 0) {
      return res.status(403).send('Coupon not available');
    }
    return res.json(coupon);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @DELETE - Delete specific user (by email) from pending
// @route - /workshops/pending/:workshopId
// @access - Public
router.delete('/workshops/pending/:workshopId', check('email', 'Email is required').isEmail(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const workshop = await Workshop.findById(req.params.workshopId);
    if (!workshop) {
      res.status(404).send('Workshop not found');
    }
    const user = workshop.pending.find((item) => item.email === req.body.email);

    if (!user) {
      return res.status(404).send('Participant does not exist');
    }

    const removeIndex = workshop.pending.map((item) => item.email).indexOf(req.body.email);

    // // remove user from 'pending' array
    workshop.pending.splice(removeIndex, 1);

    await workshop.save();

    return res.json(workshop);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(500).send('Wrong Workshop Format');
    }
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Get workshops by location (param=null -> fetch all workshops)
// NOTE(!) - Will only return workshops with date >= now
// @route - /workshops?location="Tel Aviv"
// @access - Public
router.get('/workshops', async (req, res) => {
  try {
    // If location not specified in URL
    if (!req.query.location) {
      const workshop = await Workshop.find({});
      return res.json(workshop);
    }
    // Else - location not specified in URL
    const workshop = await Workshop.find({ location: req.query.location.toLowerCase(), date: { $gte: new Date() } });
    return res.json(workshop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Get workshop by ID
// @route - /workshops/:workshopId
// @access - Public
router.get('/workshops/:workshopId', async (req, res) => {
  try {
    const workshop = await Workshop.findOne({ _id: req.params.workshopId })
      .populate({
        path: 'pending',
        populate: { path: 'coupon', model: 'Coupon' },
      })
      .populate({
        path: 'participants',
        populate: { path: 'coupon', model: 'Coupon' },
      });

    if (!workshop) {
      return res.status(404).send('Workshop not found');
    }

    return res.json(workshop);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

// @GET - Get workshops locations
// @route - /workshops/locations/all
// @access - Public
router.get('/workshops/locations/all', async (req, res) => {
  try {
    const locations = await Workshop.distinct('location');

    return res.json(locations);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('server error');
  }
});

module.exports = router;
