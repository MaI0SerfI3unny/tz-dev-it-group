const Posts = require("../models/Posts")
const { v4: uuidv4 } = require('uuid');

const getPosts = async (req, res) => {
    const { page = 0, pageSize = 15, sort="asc", column_sort = "guid" } = req.query
    
    let sortObj = new Object()
    sortObj[column_sort] = sort === "asc"? 1 : -1
    const count = await Posts.count()
    const getPosts = await Posts.find()
    .limit(pageSize)
    .skip(pageSize * page)
    .sort(sortObj)
    
    res.status(200).json({
        count, 
        status: 200, 
        data: getPosts 
    })
}

const getPostById = async(req,res) => {
    const { guid } = req.params

    const find = await Posts.findOne({guid})

    if(!find)
    {
        return res.status(200).json({
            status: 404,
            message: "Post wasn`t founded"
        })
    }

    res.status(200).json({
        status: 200, 
        data: find
    })
}

const updatePost = async(req,res) => {
    const { guid } = req.params
    const { title, link, contentSnippet,creator, categories } = req.body
    const findById = await Posts.find({ guid })
    if(!findById)
    {
        return res
            .status(404)
            .json({ status: 404, message: "Post wasn`t founded" })
    }

    if(!contentSnippet || !link || !title || !creator || !categories)
    {
        return res
            .status(401)
            .json({ status: 401, message: "No required params" })   
    }

    const editPost = await Posts.findOneAndUpdate(
        { guid },
        { title, link, contentSnippet,creator, categories }
    );

    res.status(200).json({ 
        status: 200, 
        message: "Post was updated"
    })
}

const deletePost = async(req,res) => {
    const { guid } = req.params
    if(!guid)
    {
        return res
            .status(401)
            .json({ status: 401, message: "No required params" })    
    }
    await Posts.deleteOne({ guid })
    res.status(200).json({
        status: 200, 
        message:"Posts was deleted"
    })
}

const searchPost = async(req,res) => {
    const { search } = req.body
    if(!search)
    {
        return res
            .status(401)
            .json({ status: 401, message: "No required params" })    
    }
    const findResult = await Posts.find(
        { title: { "$regex": search, "$options": "i" } })
    
    res.status(200).json({ 
        status: 200, 
        data: findResult 
    })
}

const createPost = async(req,res) => {
    const {title, link, contentSnippet, categories=[],content="",creator} = req.body
    if(!title || !link || !contentSnippet || !creator)
    {
        return res
            .status(401)
            .json({ status: 401, message: "No required params" }) 
    }
    const guid = uuidv4()

    const newPost = await Posts.create({
        title, link, contentSnippet, categories, content, creator, guid
    })

    res.status(200).json({ 
        status: 200, 
        data: newPost,
        message: "Post was created" 
    })
}

module.exports = { 
    getPosts,
    updatePost,
    deletePost,
    searchPost,
    createPost,
    getPostById
}
