// src/seed.js
const axios = require('axios');
const { Autobot, Post, Comment } = require('./config/db').models;

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
    }
}

async function seedDatabase() {
    try {
        // Fetch Autobots
        const autobots = await fetchData('https://jsonplaceholder.typicode.com/users');
        const autobotsData = autobots.map(user => ({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await Autobot.bulkCreate(autobotsData, { updateOnDuplicate: ['name', 'email', 'username'] });

        // Fetch Posts
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const postsData = posts.map(post => ({
            id: post.id.toString(),
            title: post.title,
            body: post.body,
            AutobotId: autobots[Math.floor(Math.random() * autobots.length)].id.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await Post.bulkCreate(postsData, { updateOnDuplicate: ['title', 'body', 'AutobotId'] });

        // Fetch Comments
        const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
        const commentsData = comments.map(comment => ({
            id: comment.id.toString(),
            name: comment.name,
            body: comment.body,
            PostId: posts[Math.floor(Math.random() * posts.length)].id.toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await Comment.bulkCreate(commentsData, { updateOnDuplicate: ['name', 'body', 'PostId'] });

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}

module.exports = { seedDatabase };
