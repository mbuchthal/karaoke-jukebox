# Queue Routes

### Register modify song queue

#### POST /api/queue

Registers the user for a new song at the end of the queue.

Headers:

* user: object
  * id: user id
  * nick: user nickname

Inputs:

* song: song object

Returns:

* 200 - On success.  No body.
* 400 - Bad song reference.
* 401 - User could not be found.
* 404 - Song not found.

#### PATCH /api/queue

Modify the user's queue object.  Send a song to change the registered song, or nothing to move the user one spot back in the queue.

Headers:

* user: object
  * id: user id
  * nick: user nickname

Inputs:

* song: song object (optional)

Returns:

* 200 - On success.  No body.
* 400 - User already in back of queue.
* 401 - User could not be found.
* 404 - Could not find user in queue.

#### DELETE /api/queue

Removes the registration of the user from the song queue.

Headers:

* user: object
  * id: user id
  * nick: user nickname

Inputs: (none)

Returns:

* 200 - On success.  No body.
* 401 - User could not be found.
* 404 - User could not be found in queue.
