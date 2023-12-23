import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { BlogPost } from './models/blogPost.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URL;

app.use(express.json());

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    console.log('Connected to database.');
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

app.get('/', async (req, res) => {
    try {
        const allBlogPosts = await BlogPost.find({});
        res.send({
            blogPosts: allBlogPosts
        });
    } catch (error) {
        res.send({
            errorMessage: error
        });
    }
});

app.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const blogPost = await BlogPost.findById(postId);
        res.send(blogPost);
    } catch (error) {
        res.send({
            errorMessage: error
        });
    }
});

app.post('/', async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const registeredBlogPost = await BlogPost.findOne({ title: title });
        if (registeredBlogPost === null) {
            await BlogPost.create({
                title: title.trim(),
                description: description.trim(),
                content: content.trim()
            });
        } else {
            console.log('The post already exists!');
        }
        return res.redirect('/');
    } catch (error) {
        res.send({
            errorMessage: error
        });
    }
});

app.put('/:postId', async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const postId = req.params.postId;
        const blogPost = await BlogPost.findById(postId);
        blogPost.title = title.trim();
        blogPost.description = description.trim();
        blogPost.content = content.trim();
        await blogPost.save();
        return res.redirect('/');
    } catch (error) {
        res.send({
            errorMessage: error
        });
    }
});

app.delete('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await BlogPost.findByIdAndDelete(postId);
        return res.redirect('/');
    } catch (error) {
        res.send({
            errorMessage: error
        });
    }
});