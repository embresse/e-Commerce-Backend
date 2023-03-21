const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // includes its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  //includes its associated Products
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    // if no matching id then error message shows
    if (!categoryData) {
      res.status(404).json({ message: "Ain't a single category with that id!"});
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id',async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // message shows if no matching category to id
    if (!categoryData) {
      res.status(404).json({ message: "No category matches the id :("});
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // destroy method will delete key value pair
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
