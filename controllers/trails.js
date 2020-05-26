const mongoose = require('mongoose')
const Trail = mongoose.model('trails')

exports.createTrail = async (req, res, next) => {
  const trail = new Trail({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    location: req.body.location,
    date: Date.now()
  })

  try {
    const createdTrail = await trail.save()
    res.status(201).json({
      message: 'Trail created successfully',
      trail: {
        ...trail,
        id: createdTrail._id
      }
    })
  } catch (err) {
    res.status(500).json({
      message: err
    })
  }
}

exports.updateTrail = async (req, res, next) => {
  const trail = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    location: req.body.location
  }

  try {
    const updatedTrail = await Trail.updateOne({ _id: req.params.id }, trail)

    if (updatedTrail.n) {
      console.log('success')
      res.status(200).json({ message: 'Update successful!' })
    } else {
      res.status(401).json({ message: 'Not authorized!' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err
    })
  }
}

exports.getTrails = async (req, res, next) => {
  const pageSize = +req.query.pagesize
  const currentPage = +req.query.page
  const trailQuery = Trail.find()
  if (pageSize && currentPage) {
    trailQuery.skip(pageSize * (currentPage - 1)).limit()
  }

  try {
    const fetchedTrails = await trailQuery
    const count = await Trail.count()

    res.status(200).json({
      message: 'Trails fetched Successfully!',
      posts: fetchedTrails,
      maxPosts: count
    })
  } catch (err) {
    res.status(500).json({
      message: 'Fetching trails failed'
    })
  }
}

exports.getTrail = async (req, res, next) => {
  try {
    const trail = await Trail.findById(req.params.id)

    if (trail) {
      res.status(200).json(trail)
    } else {
      res.status(404).json({
        message: 'Trail not found!'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Fetching Trail Failed'
    })
  }
}

exports.deleteTrail = async (req, res, next) => {
  console.log('hi')
  try {
    const result = await Trail.deleteOne({
      _id: req.params.id
    })

    if (result.n > 0) {
      res.status(200).json({ message: 'Deletion successful!' })
    } else {
      res.status(401).json({ message: 'Not authorized!' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Deleting trail failed!'
    })
  }
}
