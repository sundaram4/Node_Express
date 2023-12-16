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
http://localhost:5000/api/v1/bootcamps?location.state=MA&housing=true

? -- meaning query parameter
& -- using & we can keep adding more parameters to string
```

