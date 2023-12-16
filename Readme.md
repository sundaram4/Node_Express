# Node-Express
code has Brad traversy Node tutorial



##   my NOTES  

//npm i express dotenv --- dotenv ?

"scripts": {
    "start": "NODE_ENV=production node server",
    "dev": "nodemon server"
  },


//Creating Routes


```
Route structure
/api --- initial route
v1 -- version 1 , version 2 for future upgrades
bootcamps,courses.. --- different endpoints

/api/v1/bootcamps

/api/v1/courses

/api/v1/reviews

/api/v1/auth

/api/v1/users
```

```
http://localhost:5000/api/v1/bootcamps/?location.state=MA&housing=true

http://localhost:5000/api/v1/bootcamps/?average.Cost[lte]=10000 -- 
    db.inventory.find( { qty:{ $gt:20 } } )

? -- meaning query parameter
& -- using & we can keep adding more parameters to string


node seeder -i
node seeder -d
```

Select & Sorting
```
http://localhost:5000/api/v1/bootcamps/?select=name,description

//selecting name and occupation field
query.select('name occupation')

//sorting by  occupation
sort( { occupation:-1 } )

```

Adding Pagination
```
http://localhost:5000/api/v1/bootcamps/?page=2&limit=2

limit: limit can be written as limit 
since variable and key are same

```

Course Model & Seeding
```
const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  //pass the object
})

```

Course Routes & controller
```

```

