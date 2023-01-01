require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User.model");
const Courses = require("../models/Course.model");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/sportsharing";

console.log("mongoUri", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(`Successfully connected to the database ${MONGODB_URI}`)
  )
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to the database ${MONGODB_URI}: `,
      error
    );
    process.exit(1);
  });

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const passwordPlain = "Toto123!";
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHashed = bcrypt.hashSync(passwordPlain, salt);

function randomDate() {
  const start = new Date("2023-01-01");
  const end = new Date("2024-01-01");

  let d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return new Date(`${year}-${month}-${day}`);
}

function randomStartTime() {
  let min = 6;
  let max = 22;
  let minutes = ["00", "30"];
  let randomHours = Math.floor(Math.random() * (max - min) + min).toString();

  if (randomHours.length < 2) randomHours = "0" + randomHours;

  let randomMinutes = minutes[Math.floor(Math.random() * minutes.length)];
  return randomHours + ":" + randomMinutes;
}

//
// USERS
//
const fakeusers = [
  {
    username: "Betty Boop",
    email: "betty@boop.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623517022/Ironhack-project2:%20Sportsharing/spoontiques-miroir-compact-betty-boop-clin-doeil.jpg.jpg",
  },
  {
    username: "Lucky Luck",
    email: "lucky@luck.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1622493468/Ironhack-project2:%20Sportsharing/luckyluke.jpg.jpg",
  },
  {
    username: "Micky Mouse",
    email: "micky@mouse.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623517095/Ironhack-project2:%20Sportsharing/mickey-mouse-photo-pixy-org-1605551430.jpg.jpg",
  },
  {
    username: "Obélix",
    email: "obelix@asterix.fr",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl: "",
  },
  {
    username: "Po",
    email: "po@panda.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623517195/Ironhack-project2:%20Sportsharing/Kung-Fu-Panda-Gulli-Po-un-panda-un-peu-Francais.jpg.jpg",
  },
  {
    username: "Donkey Kong",
    email: "donkey@kong.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623517885/Ironhack-project2:%20Sportsharing/1779409.jpg.jpg",
  },
  {
    username: "Donald Duck",
    email: "donald@truck.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl: "",
  },
  {
    username: "Nemo",
    email: "finding@neom.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl: "",
  },
  {
    username: "Batman",
    email: "bat@man.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1622966695/Ironhack-project2:%20Sportsharing/batman.jpg.jpg",
  },
  {
    username: "Elastigirl",
    email: "elasti@girl.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623517412/Ironhack-project2:%20Sportsharing/images.jpg.jpg",
  },
  {
    username: "Catwoman",
    email: "cat@woman.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl: "",
  },
  {
    username: "Captain America",
    email: "captain@america.com",
    passwordHash: passwordHashed,
    city: "Paris",
    telephone: "0938837094",
    imageUrl:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1623353400/Ironhack-project2:%20Sportsharing/captain-america.jpg.jpg",
  },
];

//
// COURSES
//

const coursesNumber = 300;

const courses = [
  {
    courseName: "💪 Online Core Power",
    category: "Pilates",
  },
  {
    courseName: "Outdoor Climbing",
    category: "Climbing",
  },
  {
    courseName: "The Charleston Dance",
    category: "Dance",
  },
  {
    courseName: "HIIT Training",
    category: "Functional Training",
  },
  {
    courseName: "Kung fu",
    category: "Material Arts",
  },
  {
    courseName: "Best Age Pilates",
    category: "Pilates",
  },
  {
    courseName: "Tennis for Beginners",
    category: "Racket Sports",
  },
  {
    courseName: "Weight Training 101",
    category: "Strength Training",
  },
  {
    courseName: "Backstroke Training",
    category: "Swimming",
  },
  {
    courseName: "American Football",
    category: "Team Sports",
  },
  {
    courseName: "Power Plate Workout",
    category: "Vibration Training",
  },
  {
    courseName: "Aquajogging",
    category: "Water Sports",
  },
  {
    courseName: "Vinyasa All Level",
    category: "Yoga",
  },
  {
    courseName: "Indoor Bouldering",
    category: "Climbing",
  },
  {
    courseName: "Ballett Basic",
    category: "Dance",
  },
];

const courseAdresses = [
  {
    address: "Place de la Concorde",
    zip: "75001",
    city: "Paris",
  },
  {
    address: "Parc de la Vilette",
    zip: "75019",
    city: "Paris",
  },
  {
    address: "Parc de la tête d'or",
    zip: "69006",
    city: "Lyon",
  },
  {
    address: "Place de l'hotel de ville",
    zip: "44000",
    city: "Nantes",
  },
  {
    address: "Parc Borely",
    zip: "13000",
    city: "Marseille",
  },
];

const fakecourses = [];

User.create(fakeusers)
  .then((users) => {
    const userIds = [];
    users.forEach((user) => {
      userIds.push(user._id);
    });
    console.log(`${users.length} users created!`);

    // Create courses
    for (let i = 0; i < coursesNumber; i++) {
      let course = {
        participants: [],
        description:
          "Cat ipsum dolor sit amet, hack. Leave buried treasure in the sandbox for the toddlers growl at dogs in my sleep yet man running from cops stops to pet cats, goes to jail but cat slap dog in face scratch so owner bleeds. Lick left leg for ninety minutes, still dirty lay on arms while you're using the keyboard cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip demand to have some of whatever the human is cooking, then sniff the offering and walk away or terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry.",
      };

      //set randomly coursename & category
      let randomCourse = Math.floor(Math.random() * courses.length);
      course.courseName = courses[randomCourse].courseName;
      course.category = courses[randomCourse].category;

      //set randomly date
      course.date = randomDate();

      //set randomly startTime
      course.startTime = randomStartTime();

      //set randomly adress
      let randomAdress = Math.floor(Math.random() * courseAdresses.length);
      course.address = courseAdresses[randomAdress].address;
      course.zip = courseAdresses[randomAdress].zip;
      course.city = courseAdresses[randomAdress].city;

      //add randomly a course owner
      let randomOwner = Math.floor(Math.random() * fakeusers.length);
      course.courseOwner = userIds[randomOwner];

      //set randomly participant number between 4 and 12
      let min = 4;
      let max = 12;
      course.maxParticipants = Math.floor(Math.random() * (max - min) + min);

      //add participants
      let randomParticipant;
      let randomParticipantNumber = Math.floor(
        Math.random() * course.maxParticipants
      );
      let count = 0;
      while (count <= randomParticipantNumber) {
        randomParticipant = Math.floor(Math.random() * fakeusers.length);
        //Check if participant is courseOwner or if already participant
        while (
          userIds[randomParticipant] === course.courseOwner ||
          course.participants.indexOf(userIds[randomParticipant]) !== -1
        ) {
          randomParticipant === 11
            ? (randomParticipant = 0)
            : randomParticipant++;
        }
        course.participants.push(userIds[randomParticipant]);
        count++;
      }
      fakecourses.push(course);
    }

    Courses.create(fakecourses)
      .then((courses) => {
        console.log(`${courses.length} courses created!`);
        // Once created, close the DB connection
        mongoose.connection.close();
      })
      .catch((err) =>
        console.log(
          "An error occured when uploading the fake course data: ",
          err
        )
      );
  })
  .catch((err) =>
    console.log("An error occured when uploading the fake user data: ", err)
  );
