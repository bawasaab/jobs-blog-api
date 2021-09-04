const express = require('express');
const router = express.Router({
    mergeParams: true
});

const ValidateIdsMiddlewares = require('../../middlewares').ValidateIdsMiddlewares;
const validateIdsMiddlewaresObj = new ValidateIdsMiddlewares();

const CommentController = require('../../controllers').CommentController;
const CommentControllerObj = new CommentController();

/**
 * USER ROUTING STARTS
 */

// router.use( validateIdsMiddlewaresObj.articleId );

// router.get('/:commentId/idExists', [
//     validateIdsMiddlewaresObj.commentId,
//     CommentControllerObj.isIdExists
// ]);

// router.patch('/:commentId', [
//     validateIdsMiddlewaresObj.commentId,
//     CommentControllerObj.update
// ]);

// router.delete('/:commentId', [
//     validateIdsMiddlewaresObj.commentId,
//     CommentControllerObj.delete
// ]);

// router.get('/:commentId', [
//     validateIdsMiddlewaresObj.commentId,
//     CommentControllerObj.getById
// ]);

router.post('/:articleId/comments', [
    CommentControllerObj.insert
]);

// router.get('/', [
//     CommentControllerObj.getAll
// ]);
/**
 * USER ROUTING ENDS
 */

module.exports = router;