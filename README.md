# karaoke-jukebox
Karaoke Jukebox - song database/renderer and room management

[![Build Status](https://travis-ci.org/andrewmnelson/karaoke-jukebox.svg?branch=master)](https://travis-ci.org/andrewmnelson/karaoke-jukebox)

Project is deployed on: kjstage.herokuapp.com
Mp3's must be hosted locally by typing ```node mp3server/mp3server.js```
Note: mp3's are not provided in this demo.

### Karaoke Jukeboke and Room Management System
This app is designed to be used by someone hosting karaoke. When patrons are linked to the app and click Sign In, they are assigned a unique id and given a QR code with their id in it.

At this point the admin has to scan the QR code to verify that the user is present and participating. The admin is accessible at /#/kvox/admin, and a dummy admin of admin:foobar123 is provided. Once logged in, the admin is prompted Choose File. On a mobile device, this prompts the admin to take a photo. When the admin takes a photo of a user's QR code, the user is verified and their device updates to the main menu.

Users can update their username (defualt is Guest), choose to sing either Yellow Submarine or Rainbow Connection, and view the karaoke queue.

The karaoke player is accessible at /#/kvox/renderer
The lyrics and timing are hard-coded for the Yellow Submarine and Rainbow Connection examples.
