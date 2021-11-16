# SightSea

## Overview 

## HACC2021 SightSea Security Solution

As our application uses Firebase (provided by Google), the underlying database infrastructure can be considered secure. However, as the app is still in development, the database rules are ‘open’ meaning anyone can read/write its data.  A future security solution to solve this vulnerability would be to ensure the Firebase database’s security protocols are always set to private.  Other security vulnerabilities in our application include unsanitized user input, exposed API keys for Firebase and Google Maps, unlimited user login attempts, and unlimited form submissions by guest users.  Each vulnerability would have its own solution.  A solution to resolve unsanitized user inputs would be to parse out any special characters from any data provided by a user as well as ensuring user-provided data is never used as code.  This would help ensure that users would not be able to inject code into the application’s database.  A solution to the API key vulnerability would be to hide the API keys in separate configuration files and only import them as variables when needed.  The Firebase documentation does say it is ok for the Firebase configuration to be exposed, however, the exposed configuration in addition to our open database rules is a vulnerability that truly allows for anyone to read/write to the database.  Lastly, for the issue of unlimited user login attempts and unlimited form submissions, we would have to implement a maximum submission count or a cool-down period for repeated submits.



## Team members
* Jake Imanaka
* Tsz Ching Wong
* Patrick McCrindle
* Clyde James Felix
* Justin Wong
