import { model, Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BlogPost = model('blogPosts', postSchema);
export { BlogPost };