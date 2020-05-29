# e-commerce
A node based web server that allows public users to view and add items to a cart, and an admin user can add new, edit and delete items. 

# Motivation 
I built this application to further develop my JS skills and gain knowledge that can be easily transferred onto other projects, it is not intended for production use. Building a Data Store from scratch was an exercise in expanding my knowledge in Classes and Inheritance with OOP. I have also gained a further understanding of User Authentication and have also developed some good examples of code that is available for re-use on other projects. In this exercise I also learnt about cookies and how to store information inside them. 

# Features
- Users are able to add to a cart without the need to log in or sign up
- Different routes for admin users
- User Authentication

# Known Issues
- uses a Data Store instead of a Database which is no good for production due to the following:
    - Will error if we try to open or write to the same file twice at the same time
    - Wont work if there are multiple servers running on different machines
    - Will have to write to the FS every time we want to update the data which is inefficient 
    
    To fix this issue for production I would instead use a database such as PostgreSQL. 

- Images are stored as a string directly in the products.json file. If I was making this for production I would instead use a Presigned URL to store the image in an external hosting solution (i.e. AWS, Google Cloud Storage). Another option would be to use a database, however I feel that an external hosting solution would be better due to the cost of database storage and performance.
