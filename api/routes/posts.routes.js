const router = require('express-promise-router')()
const {withAuth} = require("../services/pasport")
const {
    getPosts,
    updatePost,
    deletePost,
    searchPost,
    createPost,
    getPostById
} = require("../controller/PostController")

router.get("/posts/get", withAuth, getPosts)
router.get("/posts/get/:guid", withAuth, getPostById)
router.put("/posts/update/:guid", withAuth, updatePost)
router.delete("/posts/delete/:guid", withAuth, deletePost)
router.post("/posts/create", withAuth, createPost)
router.post('/posts/search', withAuth, searchPost)

module.exports = router