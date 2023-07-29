module.exports = {
    create,
    delete: deleteReview
}

const Book = require('../models/book');

async function create(req,res){
    const book = await Book.findById(req.params.id);
    console.log(req.user);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    if (!book) {
        res.status(404).send('Book not found');
        return;
    }
    book.details.push(req.body)
    try{
        await book.save()
    } catch(err){
        console.log(err)
    }
    res.redirect(`/books/${book._id}`);
}

async function deleteReview(req,res){
    const book = await Book.findOne({'details._id': req.params.id, 'details.user': req.user._id});
    if(!book) return res.redirect('/books');
    book.details.remove(req.params.id);
    await book.save();
    res.redirect(`/books/${book._id}`);
}