const cron = require("node-cron")
const Posts = require("../models/Posts")
const User = require("../models/User")
const Parser = require("rss-parser")
const bcrypt = require('bcryptjs')

const startCronService = () => {
    cron.schedule("* * * * * *", async() => {
        const countPost = await Posts.count();
        const countAdmin = await User.count();
        if(!countPost || countPost === 0){
            const parser = new Parser()
            const feed = await parser.parseURL(process.env.URL_RSS_PARSE)
            Posts.create({feed}.feed.items)
            console.log("Posts was uploaded")
        }
        if(!countAdmin || countAdmin === 0){
            await User.create({
                email: process.env.EMAIL_SUPERADMIN,
                password: await bcrypt.hash(process.env.PASS_SUPERADMIN, 12),
            })

            console.log("Superadmin was created")
        }
    })
}

module.exports = startCronService