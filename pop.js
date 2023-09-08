const mongoose = require('mongoose');
require('dotenv').config()
// const { User, Message } = require('./models'); // Adjust the path as needed
// const User = require('./models/UserModel')
// const Message = require('./models/MessageModel')
const User = require('./models/UserModel')
const Message = require('./models/MessageModel')

mongoose.connect(process.env.DBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define sample user data
const sampleUsers = [
    {
        firstName: 'John',
        lastName: 'Doe',
        username: 'john@example.com',
        password: 'password1', // You should hash and salt passwords in a real application
        membershipStatus: 'Free',
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'jane@example.com',
        password: 'password2',
        membershipStatus: 'Premium',
    },
];

// Define sample message data
const sampleMessages = [
    {
        title: 'Hello from John',
        text: 'This is a message from John.',
    },
    {
        title: 'Greetings from Jane',
        text: 'This is a message from Jane.',
    },
];

// Function to populate users and messages
async function populateDatabase() {
    try {
        // Remove existing data (optional)
        await User.deleteMany({});
        await Message.deleteMany({});

        // Insert sample users into the database
        const users = await User.insertMany(sampleUsers);

        // Assign user IDs to sample messages
        const messagesWithUsers = sampleMessages.map((message, index) => ({
            ...message,
            createdBy: users[index]._id,
        }));

        // Insert sample messages into the database
        await Message.insertMany(messagesWithUsers);

        console.log('Sample data populated successfully.');
    } catch (error) {
        console.error('Error populating sample data:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}

// Call the function to populate the database
populateDatabase();