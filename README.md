
Environemnt:
The code has been tested on a Windows 10 x64 machine. No guarantees that the development environment would work in other operating systems; hopefully it doees

Currentyly we are using development environment. Note that in production environment, we should turn off console logs by changing
NODE_ENV_ENVIRONMENT to be 'production'


Heroku:
To push only backend to heroku
git subtree push --prefix Server heroku master

To get logs 
heroku logs -t --app app-name