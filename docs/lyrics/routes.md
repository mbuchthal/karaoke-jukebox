# Lyrics Routes

### Get and receive song data

#### GET /api/lyrics/{{mp3file}}

Returns the song data for the file named {{mp3file}}.  The mp3file parameter can be found within any lyric objects properties.

Inputs: (None)

Returns:

* 200 - On success.  Body contains a single lyric object in JSON format
* 404 - If the file is not found.  No body.
* 500 - If something went wrong on the server.  No Body.

#### GET /api/lyrics

Returns all song data.

Inputs: (None)

Returns: 

* 200 - On success.  Body contains an array of lyric objects in JSON format.
* 500 - If something went wrong on the server.  No Body.

#### POST /api/lyrics

Store a new song data object.

Headers:

* token: authentication token

Inputs: 

* In JSON format, body should be equal to a single song data object.

Returns: 

* 201 - On success.  Body contains the original passed song data object.
* 400 - An error occurred while validating the data.  No body.
* 401 - If post attempt is made by an unauthenticted user. No body.
* 500 - If something went wrong on the server.  No Body.

#### PUT /api/lyrics/{{mp3file}}

Updates the content of the lyrics file named {{mp3file}}.  {{mp3file}} can be found as a parameter in any song data object.  This route will not create new entries.

Headers:

* token: authentication token

Inputs: 

* In JSON format, a single song data object.

Returns: 

* 200 - On success.  Body contains the original passed song data object.
* 401 - An error occurred while authenticating user.  No body.
* 404 - The song was not found in the database.  No body.
* 500 - If something went wrong on the server.  No Body.

#### DELETE /api/lyrics/{{mp3file}}

Deletes the lyrics file named {{mp3file}}.  {{mp3file}} can be found as a parameter in any song data object.  

Headers:

* token: authentication token

Inputs: (none)

Returns: 

* 200 - On success.  No body.
* 401 - An error occurred while authenticating user.  No body.
* 500 - If something went wrong on the server.  No Body.
