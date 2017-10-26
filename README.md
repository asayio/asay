# Asay
Chat with us on [Slack](https://join.slack.com/t/asay/shared_invite/enQtMjUyNjQxODYxNjM0LTgzNWFkZTc5ZjZlNTdiNTlkMjhjMzdkOTUyMTg0NzRkNTRjNzhhZjVmMjQwMzJjYWUwYThmYWVkYTY1MzZlMzk)

## Stack
- Version control: GitHub
- Database: PostgreSQL
- Back-end: Node.js, Express.js
- Front-end: React
- Deployment: Zeit Now

## Install local dev environment
Please follow the guide in the order it is presented to you.

### Version control
 1. Sign up @ github
 2. Get an admin to add you as collaborator to the project
 3. Clone project from asayio/asay
 4. Get .env file from admin

### Development
1. Install node 8 from nodejs.org
2. Install project libraries from terminal/command prompt
```
cd ./
npm install
```    
3. Run ./app and ./server 
```
cd ./
npm start
``` 
### Deployment
This step is only necessary if you need to publicly deploy the solution.

1. Signup @ zeit.co
2. Shut down your local instance if running (control+c)
3. Build and deploy solution
``` 
cd [your local ./server
npm login 
npm run build
now --public
```  
4. Go to the URL where the solution is deployed

## Coding practice

### Coding guidelines
- Indenting by tab
- Code, comments and naming must be in English
- All naming must be understandable and easily differentiable
- Don't do short names that has be explained!
- Use plural tense for multiple items
- Front-end naming by `PascalCase`
- Band-end naming by `camelCase`

### File-structure
- Files must be locateded as per `./src/domain/component` mapped logically (not perfectly correct)
- Use subfolders when purposeful for reuse or overview
- Duplicate code must be refactored into reusable classes, functions etc.

### Commits
- We use only one branch: `master`
- We flag a version as an release when a feature milestone has been tested.
- We do ongoing commits
  - Ideally every commit should only contain a single new feature/change
- We start everyday off with pull to sync our code

### Test
- Tests scripts are written and comitted along with the code
- Regressional unit tests are run (and succeeded) before commit
- Integration testing are done before a release
