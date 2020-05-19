
# Motivation 
Built this application to further develop my JS skills, it is not intended for production use. Building a Data Store from scratch was an exercise in expanding my knowledge in Classes and Inheritance with OOP. I  have also developed some good examples of code that is available for re-use on other projects. 


# Known Issues
- uses a Data Store instead of a Database which is no good for production due to the following:
    - Will error if we try to open or write to the same file twice
    - Wont work if there are multiple servers running on different machines
    - Will have to write to the FS every time we want to update the data