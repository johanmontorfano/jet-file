# Changelogs

## 1.0.6
- Added the ability to automatically handle and encrypt non-encrypted fields without crashing. External databases can be now used with `JetFile` without any changes.
- Removed an old feature of `JetFile` which created exit listeners for data saving, but the system is already trustable without those extraneous listeners.
## 1.0.2
- Resolved an issue which prevented paths from being properly created.
- Changed how `JetFile` behaves to prevent data loss on disk saves.
## 1.0.1
- Added a `entries` function to the `JetFile` object, returns the entries of a file in an array.