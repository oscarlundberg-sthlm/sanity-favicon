# sanity-favicon

Given a sanity image field, this will:

1. Download the image
2. Convert and rename it to favicon.ico (containing 9 sizes, from 16x16 to 256x256 px).
3. Move the favicon.ico to the public folder

The idea is to run this when the sanity field is updated, for example on a sanity webhook endpoint.
