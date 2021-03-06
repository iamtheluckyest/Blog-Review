var db = require("../models");

module.exports = function(app) {

    // Add review to db
    app.post("/api/reviews", function(req, res) {
        // Gets the user id using the user sub from auth0
        db.User.findOne({
            where: {
                sub : req.user._json.sub
            }
        }).then(function(dbUser){
            // Adds user id as FK to the Review to associate it with the user submitting the review
            req.body.UserId = dbUser.id;
            req.body.rating = parseFloat(req.body.rating);
            req.body.title.trim();
            req.body.body.trim();
            db.Review.create(req.body).then(function(dbReview) {
                // Gets the blog's current total review count and cumulative rating.
                db.Blog.findOne({
                    where: {
                        id : req.body.BlogId
                    }
                }).then(function(dbBlog){
                    var newReviewCount = 1;
                    var newRating = req.body.rating;                   
                    if (dbBlog.total_reviews){
                        newReviewCount += dbBlog.total_reviews;
                        newRating = (dbBlog.cumulative_rating * dbBlog.total_reviews + newRating) / (newReviewCount);
                    };
                    // Updates the blog's total review count and cumulative rating.
                    db.Blog.update(
                        {
                            total_reviews: newReviewCount,
                            cumulative_rating: newRating
                        },
                        {
                        where : {
                            id : req.body.BlogId
                        }
                    }).then(function(dbUpdatedBlog){
                        res.redirect("/blog/" + req.body.BlogId);
                    })
                })
            });
        })
    });

    app.get("/api/review/edit/:id", function(req, res){
        db.Review.findOne({
            where: {
                id : req.params.id
            }
        }).then(function(dbReview){
            res.render("partials/modals/editReview", {review : dbReview});
        })
    });

    app.get("/api/review/check/:blogId/:sub", function(req, res) {
        // Finds the user
        db.User.findOne({
            where: {
                sub: req.params.sub
            }
        }).then(function(dbUser){
            // Finds any reviews that having already been written for by that user, for that blog
            db.Review.findOne({
                where: {
                    UserId : dbUser.id,
                    BlogId : req.params.blogId
                }
            }).then(function(dbReview) {
                res.json(dbReview);
            });
        });
    });

    // Functionality unavailable in this version.
    
    // app.delete("/api/review/:id", function(req, res) {
    //     db.Review.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     }).then(function(dbReview) {
    //         res.json(dbReview)
    //     });
    // });

    // Edit a review
    app.put("/api/review/:id", function(req, res) {
        db.Review.update({
            rating: req.body.rating,
            title: req.body.title,
            body: req.body.body
        },{
            where: {
                id: req.params.id
            }
        }).then(function(dbUpdatedReview) {
            // Gets the blog's current total review count and cumulative rating.
            db.Blog.findOne({
                where: {
                    id : req.body.BlogId
                }
            }).then(function(dbBlog) {
                var newRating = parseFloat(req.body.rating); 
                var pastRating = parseFloat(req.body.pastRating);                 
                if (dbBlog.total_reviews) {
                    newRating = (parseFloat(dbBlog.cumulative_rating) * dbBlog.total_reviews - pastRating + newRating) / (dbBlog.total_reviews);
                };
                // Updates the blog's total review count and cumulative rating.
                db.Blog.update({
                    cumulative_rating: newRating
                }, {
                    where : {
                        id : req.body.BlogId
                    }
                }).then(function(dbUpdatedBlog){
                    res.redirect("back");
                });
            });
        });
    });
}