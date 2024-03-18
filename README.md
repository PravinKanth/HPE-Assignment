## OVERVIEW:

**HPE - myProject** is a web application designed to count distinct queries from a log file within a specified time range. This project consists of a backend API built with **Python and Flask** and a frontend interface developed with **React, Vite, TypeScript and SCSS**.

# SETUP:

#### BACKEND:

1. Clone the repository:

        git clone https://github.com/PravinKanth/HPE-Assignment.git
   Then,
   
        cd flask

   ##### Add the "hn_logs.tsv" file inside the flask folder (MUST)   

3. Install Python dependencies using Pipenv:
   
    *Note:* If you don't have pipenv, install it using the following command first:

        pip install pipenv

    Then,

        pipenv install

5. Activate the virtual environment:

        pipenv shell

6. Run the backend server:

        flask run


#### FRONTEND:

1. Open another terminal and Navigate to the frontend directory:

        cd vite

2. Install Node.js dependencies:

        npm install

3. Start the frontend server:

        npm run dev



# Usage:

1. Access the web application in your browser at http://localhost:5173/

![UI](/assets/vite.png)
2. Specify the time range and query the distinct queries.

3. Results will be displayed on the frontend.

##### Note: You can also use Postman to test the API endpoints.

Here are some example endpoints to test the application:

     http://127.0.0.1:5000/1/queries/count/2015
     http://127.0.0.1:5000/1/queries/count/2015-08
     http://127.0.0.1:5000/1/queries/count/2015-08-01
     http://127.0.0.1:5000/1/queries/count/2015-08-01 00:04:00,2015-08-01 00:04:59

![UI](/assets/postman.png)
# Features and My Thought Process:

- #### Language and Framework Choice: 
    Python and Flask were chosen for the backend due to their simplicity and ease of use. React with Vite, TypeScript and SCSS were chosen for the frontend to leverage modern web development practices and enhance developer productivity. (You know, vite leverages native ES modules, making the application faster compared to React with webpack)

- #### Data Structure: 
    A set was used to store unique queries within a time range, as it provides constant-time complexity for both insertion and lookup operations. This ensures efficient processing, especially for large log files.

- #### File Handling: 
    The backend can handle both static and dynamic log files with the same format. For static files, reading the entire file into memory during startup ensures fast query processing. For dynamic files, the application can be easily modified to handle real-time updates by prompting users to upload files in the frontend.

- #### Error Handling: 
    The application includes robust error handling to ensure smooth operation. Error scenarios such as file not found, invalid date inputs and unexpected server errors are handled gracefully, providing informative responses to users and preventing application crashes.

- #### Integration: 
    The frontend communicates with the backend API to query distinct queries based on the specified time range. I know, the frontend part ain't necessary, but it provides an edge for querying distinct queries.


