import ArticleModel from '../models/Article.js';

export async function getAll(req, res) {
  try {
    const articles = await ArticleModel.find().populate('user').exec(); //? reletion with user

    res.status(200).json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to get articles',
    });
  }
}

export async function get(req, res) {
  try {
    const articleId = req.params.id;

    // Get, increment viewsCount, update
    const doc = await ArticleModel.findOneAndUpdate(
      {
        _id: articleId,
      },
      {
        $inc: { viewsCount: 1 }, // increment
      },
      {
        returnDocument: 'after', // We get data only after update
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: 'The article is not found',
      });
    }

    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'failed to get the article',
    });
  }
}

export async function create(req, res) {
  try {
    const doc = new ArticleModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const article = await doc.save();

    res.status(201).json({
      success: true,
      article,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Bad try to create article :(',
    });
  }
}

export async function remove(req, res) {
  try {
    const articleId = req.params.id;

    const doc = await ArticleModel.findOneAndDelete({
      _id: articleId,
    });

    if (!doc) {
      return res.status(404).json({
        message: 'The article is not found',
      });
    }

    res.status(200).json({
      success: true,
      mesage: `The article - '${doc.title}' is removed`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to remove the article',
    });
  }
}

export async function update(req, res) {
  try {
    const articleId = req.params.id;

    const doc = await ArticleModel.findOneAndUpdate(
      {
        _id: articleId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update the article',
    });
  }
}

export async function upload(req, res) {
  res.status(201).json({
    success: true,
    url: `http://localhost:4444/article/uploads/${req.file.originalname}`,
  });
}
