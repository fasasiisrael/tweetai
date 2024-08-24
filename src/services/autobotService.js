const { models } = require('../config/db');
const axios = require('axios');

// Function to fetch Autobots with pagination
async function getAutobots({ page, limit }) {
    const offset = (page - 1) * limit;
    const autobots = await models.Autobot.findAll({
        offset,
        limit,
        include: [
            { model: models.Post, include: [models.Comment] }
        ]
    });
    return autobots;
}

// Function to get a unique title for posts
async function getUniqueTitle() {
    let title;
    do {
        const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        title = posts[Math.floor(Math.random() * posts.length)].title;
    } while (await models.Post.findOne({ where: { title } }));
    return title;
}

// Function to create an Autobot with posts and comments
async function createAutobotWithPostsAndComments() {
    try {
        // Generate Autobot data
        const { data: autobotData } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
        console.log('Autobot data:', autobotData); // Log data to verify

        const autobot = await models.Autobot.create({
            id: autobotData.id.toString(), 
            name: autobotData.name,
            username: autobotData.username,
            email: autobotData.email,
            createdAt: new Date(), // Set timestamps
            updatedAt: new Date()
        });
        console.log('Created Autobot:', autobot);

        // Generate posts for the Autobot
        for (let i = 0; i < 10; i++) {
            const title = await getUniqueTitle();
            const { data: postData } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${i + 1}`);
            console.log('Post data:', postData); // Log data to verify

            const post = await models.Post.create({
                id: postData.id.toString(), // Ensure ID is a string
                title: title,
                body: postData.body,
                AutobotId: autobot.id,
                createdAt: new Date(), // Set timestamps
                updatedAt: new Date()
            });
            console.log('Created Post:', post);

            // Generate comments for the post
            for (let j = 0; j < 10; j++) {
                const { data: commentData } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${j + 1}`);
                console.log('Comment data:', commentData); 

                await models.Comment.create({
                    id: commentData.id.toString(), 
                    name: commentData.name,
                    body: commentData.body,
                    PostId: post.id,
                    createdAt: new Date(), 
                    updatedAt: new Date()
                });
                console.log('Created Comment for Post ID:', post.id);
            }
        }

        return autobot;
    } catch (error) {
        console.error('Error creating Autobot with posts and comments:', error);
        throw error;
    }
}

module.exports = {
    getAutobots,
    createAutobotWithPostsAndComments,
};
