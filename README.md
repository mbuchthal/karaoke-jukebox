# K-Vox:
### Karaoke Jukebox - song database/renderer and room management

[![Build Status](https://travis-ci.org/andrewmnelson/karaoke-jukebox.svg?branch=master)](https://travis-ci.org/andrewmnelson/karaoke-jukebox)

Project is deployed on: https://kjstage.herokuapp.com/

Mp3's must be hosted locally using Node.js:

```node mp3server/mp3server.js```

Note: mp3's are not provided in this demo for copyright reasons.

### Karaoke Jukeboke and Room Management System
This app is designed to be used by a karaoke host. When patrons are linked to the app (typically a link on a poster in a bar) and click Sign In, they are assigned a unique id and given a QR code containing their id.

![alt text](/docs/Demo/IMG_0074.PNG "Patron's Generated QR Code")

At this point, the admin has to scan the QR code to verify that the user is present and participating in karaoke. This verification step is intended to prevent abuse of the system. The admin portal is accessible at /#/kvox/admin, and a dummy admin of admin:foobar123 is hard-coded in. Once logged in, the admin is given a Choose File prompt. On a mobile device, this prompts the admin to take a photo. When the admin takes a photo of a user's QR code, the user is accepted and their device updates to the main menu using Socket.io.

Users can update their username (defualt is Guest), choose to sing either Yellow Submarine or Rainbow Connection, and view the karaoke queue.

The karaoke player is accessible at /#/kvox/renderer

The lyrics and timing are hard-coded for the Yellow Submarine and Rainbow Connection examples.
