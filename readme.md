# 🛫 Jet File
Jet file is a lightweight utility designed for realtime services, data viability and security. It's designed to work using JSON as a file format.

## Get Started with Jet File
Jet File automatically handles directory creation to avoid any runtime errors with missing directories while creating a file.

It also handles file creation if the file don't exists.

To create a new Jet File instance, use the `JetFile` class and specify the path to the desired file.

```javascript
import { JetFile } from "jet-file";

const instance = new JetFile("path/to/file.json");
```
### JetFile functions
`JetFile.set(key, value)` add a new value in the file.

`JetFile.get(key)` return the value of a key from the file.

## Example of a database powered by Jet File
```javascript
// ...
// EXPRESS CONFIGURATION
// WE ALSO IMPORT "v4" from "uuid"
// ...

const database = new JetFile("db.json");

app.post("/new-user", (req, res) => {
    const uuid = v4(); // unique id of the user

    database.set(
        uuid,
        {name: req.query.name} // data about our user
    );

    res.send(uuid); // we send the uuid of the user back
});

app.post("/get-user", (req, res) => {
    // we send data about the user read from the database
    res.send(database.get(req.query.uuid));
});

```