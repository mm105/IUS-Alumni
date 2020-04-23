// ? //////////////////////////////////////////////////////////////////////////////
// ? //////////////////////////////////////////////////////////////////////////////
// ? //////////////////////////////////////////////////////////////////////////////
// ? //////////////////////////////////////////////////////////////////////////////

// ! API URL
//  https://europe-west1-alumniius.cloudfunctions.net/api

// Routes that have 'auth' in them are protected an you need token to access them
// Header for token looks like this:
// "Authorization: 'Bearer <token_here>'"
// Header name is "Authorization", and content is "Bearer <token_here>"
// Putting word "Bearer" before token is some kind of the standard so we are using it

// ! ALL THE ROUTES
/*
// app.post('/admin/login', adminLogin)
// app.post('/admin/change-password', auth, changePassword)
// app.post('/admin/add-student', auth, addStudent)
// app.put('/admin/edit-student', auth, editStudent)
app.delete('/admin/delete-student', auth, deleteStudent)
app.get('/admin/load', auth, adminLoad)

// app.get('/students/locations', getStudentsLocations)
// app.get('/students', getAllStudents)
// app.get('/student/:studentId', getStudentById)
app.get('/students/stats', getStudnetsStats)
app.get('/students/search/:search_text', searchStudents)
*/

// ? NEW ROUTE
// * app.post('/admin/login', adminLogin)
// * TAKES AS A PAYLOAD:
/*
    {
        "email": "test@gmail.com",
        "password": "123456"
    }
*/
// * RETURNS:
/*
    {
        "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYTczOGUyMWI5MWNlMjRmNDM0ODBmZTZmZWU0MjU4Yzg0ZGI0YzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWx1bW5paXVzIiwiYXVkIjoiYWx1bW5paXVzIiwiYXV0aF90aW1lIjoxNTg2MDI1NzI2LCJ1c2VyX2lkIjoiWUR0MWhZclh1a1lvcmxpQVBxcDJQdnNsc2dwMSIsInN1YiI6IllEdDFoWXJYdWtZb3JsaUFQcXAyUHZzbHNncDEiLCJpYXQiOjE1ODYwMjU3MjYsImV4cCI6MTU4NjAyOTMyNiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.btLZh5Q06kaev2bxhRc5B_Yhc35QeH9ASWemaP5jZ7Gg21K24HFc_VKZMmGP-vF8isN1JAjkxpafksEOP55ExUgDn-1cKZFQplp3W4wa0FATRlMLynu8tO_dhWLo5Hn-zgumexL6tUVQXqjLhxol88regLCOUZ2Cpf6Vj8QQkLSToTQDZoY-CQHdXQCbFW_2eOFSuzYf4oUtNY_I2F_QBGDcCtsske3HB7AGwARVFulS8L5ZxuwFF66mDeWjxTCClZ9YKizoz_LGCHDv6KYBWMNcwbGyI-k_sW0qSo1U-qAPuTbSIlFG969Wcd5lmkRQw_6yV1esVkBI8v0JQVC6Yg"
    }
*/

// ? NEW ROUTE
// * app.post('/admin/change-password', auth, changePassword)
// * TAKES AS A PAYLOAD:
/*
    {
        "email": "test@gmail.com",
        "password": "123456",
        "newPassword": "12345678",
        "newPasswordConfirm": "12345678"
    }
*/
// * RETURNS:
/*
    { message: 'Password successfully changed!' }
*/

// ? NEW ROUTE
// * app.post('/admin/add-student', auth, addStudent)
// * TAKES AS A PAYLOAD:
/*
    {
        "name": "Muhammed",
        "surname": "Musanovic",
        "graduated": "22/4/2022",
        "description": "Senior Software Engineer at Tesla Inc.",
        "location": {
            "title": "Sarajevo, BiH",
            "coordinates": [23.1121, 123.4321],
            "type": "Point"
        }
    }
*/
// * RETURNS:
/*
    { message: 'New student successfully added!' }
*/

// ? NEW ROUTE
// * app.put('/admin/edit-student', auth, editStudent)
// * TAKES AS A PAYLOAD:
/*
    {
        "studentId": "BdrMIFDMYWDjrIENYANn",
        "name": "Muhammed",
        "surname": "Musanovic",
        "graduated": "22/4/2022",
        "description": "Senior Software Engineer at Tesla Inc.",
        "location": {
            "title": "Sarajevo, BiH",
            "coordinates": [23.1121, 123.4321],
            "type": "Point"
        }
    }
*/
// * RETURNS:
/*
    { message: 'Student info successfully updated!' }
*/

// ? NEW ROUTE
// * app.delete('/admin/delete-student', auth, deleteStudent)
// * TAKES AS A PAYLOAD:
/*
    {
        "studentId": "BdrMIFDMYWDjrIENYANn"
    }
*/
// * RETURNS:
/*
    { message: 'Student successfully deleted!' }
*/

// ? NEW ROUTE
// * app.get('/admin/load', auth, adminLoad)
// * TAKES NOTHING -> SIMPLE GET REQUEST
// * RETURNS:
/*
    {
        "isAuthenticated": "true"
    }
*/

// ? NEW ROUTE
// * app.get('/students/locations', getStudentsLocations)
// * TAKES NOTHING -> SIMPLE GET REQUEST
// * RETURNS:
/*
    [
        {
            "studentId": "BdrMIFDMYWDjrIENYANn",
            "coordinates": [
                23.1121,
                123.4321
            ]
        },
        {
            "studentId": "rYLJtKqMgUzQBYNSE6TB",
            "coordinates": [
                42.2121,
                84.3212
            ]
        }
    ]
*/

// ? NEW ROUTE
// * app.get('/students', getAllStudents)
// * TAKES NOTHING -> SIMPLE GET REQUEST
// * RETURNS:
/*
    [
        {
            "studentId": "BdrMIFDMYWDjrIENYANn",
            "location": {
                "title": "Sarajevo, BiH",
                "coordinates": [
                    23.1121,
                    123.4321
                ],
                "type": "Point"
            },
            "name": "Muhammed",
            "surname": "Musanovic",
            "description": "Senior Software Engineer at Tesla Inc.",
            "graduated": "22/4/2022"
        },
        {
            "studentId": "rYLJtKqMgUzQBYNSE6TB",
            "name": "Harun",
            "surname": "Tucakovic",
            "description": "Senior Software Engineer at Google LLC",
            "graduated": "22/4/2022",
            "location": {
                "coordinates": [
                    42.2121,
                    84.3212
                ],
                "type": "Point",
                "title": "Chicago, Illinois, USA"
            }
        }
    ]
*/

// ? NEW ROUTE
// * app.get('/student/:studentId', getStudentById)
// * TAKES "studentId" as argument in URL
// * RETURNS:
/*
    {
        "studentId": "BdrMIFDMYWDjrIENYANn",
        "location": {
            "coordinates": [
                23.1121,
                123.4321
            ],
            "type": "Point",
            "title": "Sarajevo, BiH"
        },
        "name": "Muhammed",
        "surname": "Musanovic",
        "description": "Senior Software Engineer at Tesla Inc.",
        "graduated": "22/4/2022"
    }
*/

// ? NEW ROUTE
// * app.get('/students/stats', getStudnetsStats)
// * TAKES NOTHING -> SIMPLE GET REQUEST
// * RETURNS:
/*
    {
        "numberOfStudents": 9,
        "locations": [
            [
                "Tuzla, BiH",
                3
            ],
            [
                "Istanbul, Turkey",
                2
            ],
            [
                "Sarajevo, BiH",
                2
            ],
            [
                "Ankara, Turkey",
                1
            ],
            [
                "Hrasnica, Ilidza",
                1
            ]
        ]
    }
*/
// NOTE for getStudentsStats:
// Returns top 5 locations, if there is less then 5 than it returns all locations
// Locations are sorted in descending order (just like in the example above!)

// ? NEW ROUTE
// * app.get('/students/search/:search_text', searchStudents)
// * TAKES 'search_text' as an argument in URL. IMPORTANT: If search text has mulitple words they should be separated with '+' character! e.g. "harun+tucakovic", "sarajevo+bih", "senior+software+engineer".
// * RETURNS:
/*
    {
        "students": [
            {
                "studentId": "Mn6X3u1LdVUbdNZgYFKS",
                "location": {
                    "type": "Point",
                    "title": "Las Vegas, California, USA",
                    "coordinates": [
                        44.5379,
                        18.6735
                    ]
                },
                "name": "Haruna",
                "surname": "Bisic",
                "description": "Embedded Systems Engineer",
                "graduated": "22/4/2022"
            },
            {
                "studentId": "YwlWxAX3PWMEywtN0A1D",
                "name": "Harun",
                "surname": "Tucakovic",
                "description": "Web Developer",
                "graduated": "22/4/2022",
                "location": {
                    "title": "New York, New York, USA",
                    "coordinates": [
                        44.5371,
                        18.6733
                    ],
                    "type": "Point"
                }
            }
        ],
        "positions": [],
        "locations": []
    }
*/
// * RETURN VALUE EXPLANATION:
// * You get back object with three arrays: students, positions and locations. Every array contains same type of objects. Different arrays represent different types of search results.
// * Search engine searches through student names, student desctiprions (their position) and through student locations. All respective results are in their respective arrays
// * e.g. search_text = 'sarajevo' -> you will get all students that are working in sarajevo in "locations" array, because this is search based on location
// * e.g. search_text = 'usa' -> you will get all students that are working in 'usa' in "locations" array, but you'll also get students with surname 'mUSAnovic' in "students" array because search term is found in students name!
// * e.g. search_text = 'web' -> you'll get all students that work as 'web developers', 'web enigneers', etc. in "positions" array
// * All three arrays may have some search results if search term is found in locations, positions and student names info. If all three arrays are empty that means no results found.
// * There is fuzzing implemented in string matching, which means that if you search with term "hartun" you will get student named "Harun" because that 't' can be seen as typing mistake. About this fuzzing we can further talk on discord!
