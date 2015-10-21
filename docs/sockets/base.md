# Socket Connections

### Send and receive data without seperate 

#### Emitted Events

##### updateQueue

Sends an updated version of the queue to the user

Method:

* updateQueue(queue)
  * queue - the array of queued songs and users

Data:

* an array of queue objects
  * song: the associated song for the performance
  * user: the user who will be performing

##### acceptUser

Notifies the client that user registration has been accepted

Method:

* acceptUser(user, queue, songlist)
  * user: the object representing the accepted user
  * queue: a current copy of the queue
  * songlist: an array containing all available song objects

Data:
  
  * user: the object representing the accepted user
  * queue: a array containing the queue
  * songlist: an array containing all available song objects

##### declineUser

Disconnects the user

Method:

* declineConnection(user)
  * user - the user to be disconnected

Data: (none)

##### onDeck

Requests that the user respond in a timely manner to avoid disconnection.

Method:

* onDeck(user, callback)
  * user - the user to request the response from
  * callback - A function of signature function(bool), to be called when a user has responded or timed out.  True is returned if the user responded in time, and false if not

Data: (none)

#### Received Events

##### ping

Expects a server response to show that the server is still connected

Data: (none)

Response:

* socket emits a 'pong' event

##### registerUser

Send at the same time as the /api/user GET request, this serves to register a socket to the user

Data:

* user - object holding the user information
  * id - user id number
  * nick - user nickname

Response:

* server waits for an acceptUser method to be called

##### onDeck

Accept the user's timely response to the onDeck request

Data: (none)

Response:

* server terminates timeout and understands that the user is in fact not going to chicken out

##### disconnect

The client has disconnected.

Data: (none)

* server closes connections and removes users
