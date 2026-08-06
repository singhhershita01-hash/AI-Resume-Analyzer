import mongoose from "mongoose";

const uri =
"mongodb+srv://singhhershita01_db_user:hershi2312@cluster0.y1wbuyh.mongodb.net/resume_analyzer?retryWrites=true&w=majority&appName=Cluster0";

try {
    await mongoose.connect(uri);
    console.log("✅ Connected!");
} catch (err) {
    console.error(err);
}

process.exit();