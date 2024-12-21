const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
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
    courseId: { type: ObjectId, ref: 'Course' },
    userId: { type: ObjectId, ref: 'Users' },
});

const UserModel = mongoose.model('Users', userSchema);
const AdminModel = mongoose.model('Admin', adminSchema);
const CourseModel = mongoose.model('Course', courseSchema);
const PurchasesModel = mongoose.model('Purchases', purchasesSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel,
};
