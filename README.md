# !Basic Information for team work

## Branches organization:

we will work as a three membres team, so the repository will consists of the following branches: 

- `main`: Here we will merge only the code that was already proven to work correctly, and as a groupal commit from the next branch:
- `pre-merge`: This branch will merge commits from each team member individual branch, and will be used as a branch for code testing. Here we will certify that the code actually works before merging it to `main`.
- `Models-2`: This branch correspond to the team member in charge of the second part of the models as described in [asana](), it will only receive pull requests from that member. 
- `auth`: This branch belongs to the member in charge of the authorization routes as described in [asana](), it will only receive pull requests from that member.

The remaining member will push his part directly to `pre-merge` to reduce the amount of merges.

Make sure you have your local proyect updated at least in relation to branch `main`, but preferably to `pre-merge`.
   
## About [npm](https://www.npmjs.com/) & [node](https://nodejs.org/en/) versions:

This "Skeleton" was created using `npm` v9.2.0 & `node` [v18.13.0](https://nodejs.org/en/).

Updating your own `npm` & `node` is necesary for better work flow, so, before cloning, merging or fetching the repository, make sure you already have updated `npm` & `node`.

##### npm updating:

```bash
npm install -g npm@latest
```
## Dependencies:

Make sure to install all required dependencies before working, this is simply done by running this comand:

```bash
npm install
```
## Syntax conventions:

Make sure you have read at least the first part of the [Project Bases](https://academlo.notion.site/Base-del-Proyecto-b54473bef71747369accb2c569b94ce6) document, wich specify notation requirements for naming and object properties calling.

Also, remember to always use git commit conventions as follows:

##### Prefixes:

- `feat`: adding a new feature
- `fix`: bug and error fixing
- `docs`: documentation related
- `perf`: performance improvement changes
- `refactor`: changes that doesn't improve the performance, but report some other kind of improvement(for example, on order or legibility)
- `test`: code for testing purposes

After the prefix we have to give a simple but precise description of our contribution, followed by our name or nickname in parenthesis (I think this will help us to notice whether our partners are contribuing or not, and to quikly identify whom to contact in case of need).

##### Example:

```bash
git commit -m 'feat: users model added (Mario)'
```

## Environment variables:

You'll find an `.env.example` file where you can check wich environment variables we are using, its important to remember that some of them can be used by all of us and some others can't. Please, take your time to correctly fill your own `.env` with than info.

## Scripts:

To make the job a bit faster the following scripts were added to `package.json`:


```bash
npm run lint-fix 
```
Will automatically fix all eslint errors detected

#### Migrations:

```bash
npm run migrate
```
Will execute all migrations, keep in mind that if you want to make a single migration, you better execute this command instead: 

```bash
npx sequelize-cli db:migrate --name yourMigrationFileName.js
```

```bash
npm run undo-mig
```
Will reverse a single migration, if you want to revert the migration of three models, you'll have to run this comand three times, or execute a "undo-all" commad: 

```bash
npm run undo-mig-all
```

This one will revert all migrations done.

#### Seeders:

There will be just two main command for seeders:

```bash
npm run seed-all
```

wich migrate all seeds files created, and:

```bash
npm run undo-seed-all
```

wich reverts all seeds migrated. You can create or revert seeds one by one with the `sequelize-cli` corresponding commads as describen in [Seeders](https://academlo.notion.site/Seeders-bfcc2c9fc0ee44a68c6f5f9af6af70b4).

###### *If you want to add another `script` to the list make sure to add it first in `package.json`, then make a single commit like this: `git commit -m 'feat: new migration script added (Mario)'`, and finally let us know its function here in the `readme` file. 

## Migrations and Transactions: 

For most of us this resources may be new, so don't foget to check the related documentation about [Migrations](https://sequelize.org/docs/v6/other-topics/migrations/) and [Transactions](https://sequelize.org/docs/v6/other-topics/transactions/).

Also, you may find a bit tricky to use the configurations suggested in [Project Bases](https://academlo.notion.site/Base-del-Proyecto-b54473bef71747369accb2c569b94ce6). Frecuently checking both documentations will help a lot. 

#### Finally, for more information about how to start don't forget to read the whole `Notion` document on: [Project Bases](https://academlo.notion.site/Base-del-Proyecto-b54473bef71747369accb2c569b94ce6).
