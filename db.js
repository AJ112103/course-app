const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    _id: ObjectId,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
})

const adminSchema = new Schema({
    _id: ObjectId,
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
})

const courseSchema = new Schema({
    _id: ObjectId,
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId              
})

const purchasesSchema = new Schema({
    _id: ObjectId,
    courseId: ObjectId,
    userId: ObjectId
})

const UserModel = mongoose.model('Users', userSchema);
const AdminModel = mongoose.model('Admin', adminSchema);
const CourseModel = mongoose.model('Course', courseSchema);
const PurchasesModel = mongoose.model('Purchases', purchasesSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasesModel
}