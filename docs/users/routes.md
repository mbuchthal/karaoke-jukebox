# User Routes

### Register and modify user data

#### GET /api/user

Registers the user in the system as a new user.  User MUST register with the socket server at the same time.

Headers:

* user: object (optional)
  * id: user id
  * nick: user nickname

Inputs: (None)

Returns:

* 202 - On success.  Returns the user id and nickname as a single object in the same format as the headers user object.  If the header was not set when requesting this resource, a new user object will be returned

#### PATCH /api/user

Changes the user nickname

Headers:

* user: object
  * id: user id
  * nick: user nickname

Inputs:

* nick: the new nickname to set for the user

Returns:

* 200 - On success.  Returns the new, updated, user object.
* 401 - Invalid or missing user id.
