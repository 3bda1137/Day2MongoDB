use SolveDay2

db.instructors.insertMany([
  {
    "_id": 14,
    "firstName": "Abdallah",
    "lastName": "Mohamed",
    "age": 23,
    "salary": 4800,
    "address": {
      "city": "Assiut",
      "street": 15,
      "building": 22
    },
    "courses": ["js", "jquery", "node.js"]
  },
  {
    "_id": 15,
    "firstName": "Mousa",
    "lastName": "AbdElnaby",
    "age": 24,
    "salary": 4200,
    "address": {
      "city": "Alexandria",
      "street": 8,
      "building": 10
    },
    "courses": ["html", "css", "js", "jquery"]
  },
  {
    "_id": 16,
    "firstName": "Ali",
    "lastName": "Mohamed",
    "age": 29,
    "salary": 5100,
    "address": {
      "city": "Giza",
      "street": 12,
      "building": 18
    },
    "courses": ["angular", "react", "js", "jquery"]
  }
]);














//a) Display all documents in the "instructors" collection

db.instructors.find({});


//b) Display all instructors with salaries greater than 4000 (only show firstName and salary)

db.instructors.find({ salary: { $gt: 4000 } }, { firstName: 1, salary: 1, _id: 0 });

//c) Display all instructors with ages less than or equal to 25
db.instructors.find({ age: { $lte: 25 } });


//d) Display all instructors with city "mansoura" and street number 10 or 14, only 

db.instructors.find({
  $and: [
    {
      "address.city": "mansoura",
      $or: [
        { "address.street": 10 },
        { "address.street": 14 }
      ]
    }
  ]
}, { firstName: 1, "address": 1, salary: 1, _id: 0 });


//e- Display all instructors that have js and jquery in their courses

db.instructors.find({ courses: { $all: ["js", "jquery"] } });

//f)Display number of courses for each instructor
db.instructors.aggregate([
  {
    $project: {
      firstName: 1,
      numCourses: { $size: "$courses" },
      _id: 0
    }
  }
]);


//g

db.instructors.find(
  { firstName: { $exists: true }, lastName: { $exists: true } },
  { firstName: 1, lastName: 1, age: 1, _id: 0 }
)
  .sort({ firstName: 1, lastName: -1 })
  .forEach((document) => {
    print("FullName: " + document.firstName + " " + document.lastName + ", Age: " + document.age);
  });



//h- Delete instructor with first name 'ebtesam' and has only  5 courses in courses array

db.instructors.deleteOne({
  firstName: "ebtesam",
  courses: { $size: 5 }
});




//i- Add active property to all instructors and set its value to true.

db.instructors.updateMany(
  {},
  { $set: { active: true } }
);


//j- Change 'EF' course to 'jquery' for 'mazen mohammed' instructor 

db.instructors.updateOne(
  {
    firstName: "mazen",
    lastName: "mohammed",
    courses: "EF"
  },
  {
    $set: { "courses.$": "jquery" }
  }
);

//k- Add jquery course for 'noha hesham'. 

db.instructors.updateOne(
  {
    firstName: "noha",
    lastName: "hesham"
  },
  {
    $push: { courses: "jquery" }
  }
);

//l- Remove courses property for 'ahmed mohammed ' instructor 
db.instructors.updateOne(
  {
    firstName: "ahmed",
    lastName: "mohammed"
  },
  {
    $unset: { courses: "" }
  }
);



//m- Decrease salary by 500 for all instructors that has only 3 courses in their list ($inc) 
db.instructors.updateMany(
  {
    $expr: { $eq: [{ $size: "$courses" }, 3] }
  },
  {
    $inc: { salary: -500 }
  }
);



// Rename address field for all instructors to fullAddress.


db.instructors.updateMany(
  {},
  {
    $rename: { "address": "fullAddress" }
  }
);

// Change street number for noha hesham to 20

db.instructors.updateOne(
  {
    firstName: "noha",
    lastName: "hesham"
  },
  {
    $set: { "fullAddress.street": 20 }
  }
);



