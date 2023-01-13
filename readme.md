# 🛫 Jet File
Jet file is a lightweight utility designed for realtime services, data viability and security. It's designed to work using JSON as a file format.

### Check out `JetStore`, it's the future JetFile working system. You should try it !

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

# 🏪 JetStore
JetStore is somewhat an improvement of JetFile and adresses many issues JetFile have.

## What does JetStore brings over JetFile ?
You'll see below all the issues and improvements JetStore brings over JetFile:
- JetStore doesn't cause any RAM overflow when caching files for quick access.
- JetStore doesn't fails when a datafile gets too big for the filesystem, as it works different than JetFile to manage key-value pairs.
- JetStore doesn't fails when a datafile is broken, not causing any dataloss.

You'll see below a list of changes in how JetStore operates compared to JetFile:
- JetStore stores each key data in an individual file, still hashing every data.
- JetStore doesn't need a saving routing to prevent data loss as every operation is performed on the file and not the cache.
- JetStore allows operations made on the disk way quicker as it doesn't need to determine and perform action on the data to be stored.

## How to get started quickly with JetStore
```typescript
const store = new JetStore("store/location");

// sets a key
store.editKey(name, value);
// gets a key
store.readKey<T>(name, value);
// read all the keys of this store
store.getEntries();
```
