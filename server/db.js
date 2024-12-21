const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
});

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
});

const purchasesSchema = new Schema({
    courseId: { type: ObjectId, ref: 'course' },
    userId: { type: ObjectId, ref: 'users' },
});

const UserModel = mongoose.model('users', userSchema);
const AdminModel = mongoose.model('ddmin', adminSchema);
const CourseModel = mongoose.model('course', courseSchema);
const PurchasesModel = mongoose.model('purchases', purchasesSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel,
};
