# Facebook Workplace JSON to CSV

### Requirements:
  - NodeJS  anything over v.6 should probably work
  - NPM

### Installation:
  - Open a command prompt and CD to the root directory of  the fbworkPlace directory.
  - Type:  “npm install “ which should load the Node_modules directory.
  - To start the server type: “npm run dev – you should see the sever start on port 8080
  - You should see the server log in the command window.
  - The server will restart after any new edits (using Nodemon)

### Open your editor in the app directrory
In the root directory open the fbworkPlac.config.js file. You can edit the configuration environmental values also the PERM_TOKEN.

### In Postman

You should be able to request the API details.

###### Here’s an example:

localhost:8080/groupComments/465235423971266_465239270637548


### Server LocalHost
http://localhost:8080/


### API Commands
```sh

/apiAuth                        -- Calls for API Key
/groupComments/<postID>         -- Calls for Comments Feed
/groupFeed/<groupID>            -- Calls for Group Feed
/groupseen/<postID>             -- Calls for Group seen
/groupReactions/<postID>        -- Calls for Reaction Feed
/communityGroups/<communityID>  -- Calls for community Group Feed
/sharedPost/<postID>            -- Calls for Group shared post

```

### CSV Calls
```sh

/downloadGroupFeed/gf/<groupID>         -- Returns CSV for Group Feed
/downloadGroupFeed/gr/<postID>          -- Returns CSV for Reaction Feed
/downloadGroupFeed/cg/<communityID>     -- Returns CSV for Community Group Feed
/downloadGroupFeed/gc/<postID>          -- Returns CSV for Group Comments
/legalHacktober/posts/<filename>        -- Retrieves new line text file with post ids
                                            to build CSV file.
/legalHacktober?postid= [..postid]      -- Creates a CSV file in app/csv_files
                                        ex. localhost:8080/legalHacktober?postId=1839136679499463_1888315407914923, 1839136679499463_1888247677921696,465235423971266_465239270637548,465235423971266_465235540637921
```

### Note:
Files must be placed in the load directory