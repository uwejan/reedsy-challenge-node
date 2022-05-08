## 1. About you

I can talk about [zonaRugs](https://zonarugs.com/) an ecommerce app, SEO friendly in mind.
Built using NuxtJS which itself built on top of VueJs.
The choice went for `NuxtJS`, I love `VueJs` but Nuxt kind of better for my use case.
Where i needed the app to be `SEO` friendly, and take advantage of `SSR` of nuxt.
I know it uses the same package `vue-meta` but the real difference is that the page can be fully rendered before its loaded back to the client.
Other that you get all the joy of vue. Computed, watchers, ..etc

It is also worth mentioning, I followed the pattern of `Seperation of concern` on the back-end, and the front-end. I love this pattern i tend to use whenever i can with my work,
it just makes work much easier on the `development, testing, maintaining`.

The Front-end

- Bootstrap-vue, vuex, axios, authentication , and many more...
- has UPS for delivery, the ability to choose between UPS/ free pick up from the store.
- Customers can add addresses with automatic detection for postal codes.
- Customers can also print invoices once they log in from the order page.
- Customers can filter rugs by name, collection, color, size, and price.
- customers can rate and comment on products.
- Many features on the store, if you wish you can login with this dummy user credentials and try for yourself.

Feel free to check and place some test orders [Link](https://zonarugs.com/):
The source code for this project and many other projects is private, i can share screen if interested.
```
User name: 1user@example.com
Password: password`
Visa card for testing;
number :  4242424242424242
cvs: 123
date: any future date.
```
**I also have an NPM package** [janus-api-mqtt]("https://www.npmjs.com/package/@uwejan/janus-api-mqtt")

---

## 2. Document versioning

- Database
- FileSystem

### Database

Ohh. ok. Here i can talk more, as i have really good experience with databases.
While designing/architecting data storage things to keep in mind;

- SQL/NOSQL
- Relation-ships
- Data size / data growth
- Scalability
- Back-ups

#### Scenario

During my last job experience we had in mind the following requirement;

- chat messages
- user complex relation-ships. `Roles, profiles, messages, files` to list a few.

In that case Scalability and data availability was required.

#### My choice of technology, and data design, on this specific matter;

- ScyllaDB (assuming) / cassandraDB

```
create table org_channel_files
(
    file_id     uuid,
    book_id  uuid,
    user_id     uuid,
    type        int,
    section     int,
    created_at  timestamp,
    description text,
    file_uuid   timeuuid,
    name        text,
    primary key ((file_id, book_id, user_id), type, section, created_at)
)
    with caching = {'keys': 'ALL', 'rows_per_partition': 'ALL'}
     and compaction = {'class': 'SizeTieredCompactionStrategy'}
     and compression = {'sstable_compression': 'org.apache.cassandra.io.compress.LZ4Compressor'}
     and dclocal_read_repair_chance = 0.0
     and speculative_retry = '99.0PERCENTILE';
```

In the above Schema what matters is `(file_id, book_id, user_id)` afterwards keys for listing purposes.

There will be a separate schema for `books, users`

Now you can grow as much as you can pay for cloud. and have to worry about reads/writes `IO`

Then in my back-end. I can version documents the way i wish to. `path = ./uploads/${fileType}/${uuid}`

In this case the documents stored inside a directory by the category name of the file say `pdf`

and versioned by the `uuid` 128 bit universally unique.

- You want document by user. check.
- You want document at any time. check.
- You want the latest version. check.

#### Disk space efficiency

- DataBase wise not an issue at all.
- Storage of the document itself, depends on
  - number of versions
  - size of each version
  - how long you want to keep old versions

On linux systems you can schedule a cron job, that runs on the backend deleting files of certain timeline from the database and the file system.

I wont mention `Sql` solutions here, as i do not see it the case, and my intention is to keep it short.

You really, can design and ahve it any way you want. Once you use the right tool for the right job :)

---
## 3. Node.js REST API

Commands:

- `npm install`
- `npm run build`
- `npm run start`
- on new command line/ terminal
  - `npm run test`

#### Postman collection included in the base directory.

#### Objectives:
* use TypeScript or modern ES features
  * **Check**. I normally use es6, but i challenged myself and done it with typescript
* have reasonable test coverage
  * **Check**
* be scalable — this is a small app, but write it as if it will grow into a full, Production-grade server
  * **Scalability note**
  * be data store agnostic
    * **Check** Simplest i could come with is memory object store, which can holds data as much memory as machine
    could have, and to keep it simple as well.
    
| Job type     | Processing time (s) |
| ------------ |---------------------|
| ePub export  | 10 **Check**        |
| PDF export   | 25    **Check**     |
| import (any) | 60   **Check**      |


* **Check** 

#### Routes:
* GET `/export`
* POST `/export`
* GET `/import`
* POST `/import`
* GET `/ping`

#### Note1:
It is important to follow commands sequence if your aim is to run the test.

The reason behind that, is i first went with `supertest` but i noticed weird class state.

In order to eliminate jest/my-app debugging, i had to avoid `supertest`

I am using `Lodash` helper with groupBy, clone.

There are no controllers' directory, i did not see a need for it.

I guis it all matter of Company workflow, What the team decides to follow as;

- design pattern
- coding style
- file structure
- ...etc

But since i have the chance to decide, and i have time limitations. I went with what i thought would be in the middle between
fast and efficient.

#### Note2:
While importing/exporting, do we have to check if state has an entry with same id? I perhaps did not explain myself well on my email.
```
{
    "finished": [
        {
            "bookId": "2",
            "type": "epub",
            "state": "finished",
            "created_at": "1652013264317",
            "updated_at": "1652013274323"
        }
    ],
    "pending": [
        {
            "bookId": "2",
            "type": "epub",
            "state": "pending",
            "created_at": "1652013478801",
            "updated_at": null
        }
    ]
}
```
Both have same id, the app by default will accept the entry.

We can solve this by simply checking the current store against `bookId` and if it does have it return 
* `200, already processing`

OR
* `400, already exists dublicate key error`

#### Note3:
The code has built in validation for `POST` import/export resources, to force correct schema.

#### Note4:
```
export enum JobOperationsEnum {
  exportJob = 'exportJob',
  importJob = 'importJob',
}
```
Is used to have an object in the `Store` for each operation type.
My assumption here, we do not want operations records/entries to be all inside same object key.
---
##4 SPA

#### Commands;
* `npm install` 
* `npm run test:unit` For testing
* `npm run dev` Run the fake api and the app for development
* `npm run build`
* `npm run production` Build the app and runs the fake api server to consume data from

#### Objectives;
* use Vue.js
  * **Check**  
* display 5 books per page
  * **Check** 
* have multiple pages to have pagination
  * **Check**
* expand/collapse details when clicking the book
  * **Check** 
* improve the UI as you see fit
  * **Check** 
* have reasonable test coverage
  * **Check** Props testing is done for the main component and sub component. 
  * However, `UI` testing not included as its more time consuming and i have implemented `vuex` and `axios`
  * In that case i will need to test suit againset `vuex` , `axios` and `UI` clicks
  * You got the idea.
* be scalable — this is a small app, but write it as if it will grow into a full, Production-grade SPA
  * **Check** Scalability note. 
* assume books will be fetched over HTTP
  * **Check** `Bonus` I have implemented `axios` service and `vuex` store.
#### Bonus;
  Using json-server i included books api

#### Note;
* The app follows the objectives
* App components
  * `BookTableBase` Base componenet which allow the usage of sub componenets
  * `BookTitle` Holds Title column of table (image, title, author)
  * `BuyOn` Holds buy_on column
  * `BookDetails` Collapse when the @ book clicks
  * `BookPagination` Pagination component
  * `BookTable` The final component to be used 
* The Utilized `Bootstrap-vue` to get the exact `UI` of the provided image
  * Only required components are imported to reduce file build on size and be more efficient 
* The app breaks the book table into components to allow maximum control of the `UI`
* Hard coded a `1.5` seconds while fetching books to show `Loading... ui`
* Use Vuex to keep track of pagination operations
* Use Vuex to store books
---
## 5. Operation collision

#### Commands;
* `npm install` 
* `npm run build`
* `npm run start`
* `npm run test` 
  * You should follow order if you wish to test 
  * Open on new terminal and keep `start`
* `npm run dev` for development


#### Objectives;
* use TypeScript or modern ES features
  * **Check**
  * I usually use ES6 but i challenged myself using tsc
* have reasonable test coverage
  * **Check** 
  * `1 test` To Fail i kept it, so you can see it.
* explain any assumptions made
  * **Check** See Note2

#### Note1;
* The app implemented only `insert` not `delete`. so operation `delete` is not included.
* The test included test against all objectives.
* `expect(combined2.apply(s)).to.equal(combined1.apply(s))` 
  * The instructions assume it to true, but my implementation did not agree on it.
  * Please check test included, i am happy to prove me wrong.
#### Note2;
  * I assumed not to do `delete` operation.
    * The instructions provided shows insert as example, so i thought delete not needed
    * Implementing `delete` will fairly increase development and testing time.
      * New interface/design should be implemented to map operations and its values.
      * Fairly will take more time.

## Scalability Note;
Scaling apps depends on many factor, and each app prepending on its own requirement interstice new challenges.
* Are we using docker?
* Are we using certain proxy for `Rest-Api`
* How do we plane to use this service? on its on? or integrated with other services.

I decided to say that, instead of pasting in some `nodejs/babel/vuejs` production configs, 
or to assume not to assume docker is used and paste in some docker composing files.

**In short scaling has dependencies/requirements and is project related.**
