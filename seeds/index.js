const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()) * 20 + 10;
        const camp = new Campground({
            author: "6856ecbb946cbf7e285da35e",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dkl8jao1j/image/upload/v1750941041/YelpCamp/ess4l416a9zbscis36wp.avif",
                    filename: "YelpCamp/s6poahscdgj1lz0w1kqw",
                },
                {
                    url: "https://res.cloudinary.com/dkl8jao1j/image/upload/v1750954205/YelpCamp/mf9jjroammpiwjutvh9r.avif",
                    filename: "YelpCamp/bg3hhissu8mpwuhwhj4f",
                },
            ],
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi minima blanditiis libero! Nemo sit pariatur possimus natus quos obcaecati eum alias, eos autem deserunt quis nisi provident esse rerum ipsam.",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    db.close();
});
