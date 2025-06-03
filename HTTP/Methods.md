# `HTTP Methods`

HTTP (HyperText Transfer Protocol) methods define `the actions that can be performed on a web server`. Here are the most important HTTP methods along with their uses:

## 🔹 1. GET
- Purpose: `Retrieve data from the server`.

- Use Case: Fetch a webpage, an image, user data, or any resource.

- Characteristics:

    - Safe (doesn't modify data).

    - Idempotent (multiple identical requests have the same effect).

    - Can be cached and bookmarked.

- 📌 Example: GET /users/123 → fetch user data with ID 123.

## 🔹 2. POST
- Purpose: `Send data to the server to create a new resource`.

- Use Case: Form submissions, uploading files, creating a blog post, user registration.

- Characteristics:

    - Not idempotent (repeating a POST can create multiple entries).

    - Data is sent in the body of the request.

- 📌 Example: POST /users → create a new user.

## 🔹 3. PUT
- Purpose: `Update or create a resource by replacing it entirely`.

- Use Case: Updating a user's entire profile, replacing an image.

- Characteristics:

    - Idempotent.

    - Replaces the existing resource.

- 📌 Example: PUT /users/123 → replace user data with ID 123.

## 🔹 4. PATCH
- Purpose: `Update a resource partially`.

- Use Case: Changing only the email of a user or updating the status of an order.

- Characteristics:

    - Not necessarily idempotent (but often treated as such).

    - Only the specified fields are modified.

- 📌 Example: PATCH /users/123 with { "email": "new@mail.com" }.

## 🔹 5. DELETE
- Purpose: `Delete a resource on the server`.

- Use Case: Removing a user, deleting a file, removing a blog post.

- Characteristics:

    - Idempotent.

    - Should be used with caution.

- 📌 Example: DELETE /users/123 → deletes user with ID 123

## 🔹 6. HEAD
- Purpose: `Same as GET, but returns only the headers (no body)`.

- Use Case: Check if a resource exists, test links, or check metadata before downloading.

- Characteristics:

    - Safe and idempotent.

    - Faster than GET for metadata.

- 📌 Example: HEAD /image.jpg → check if the image exists.

## 🔹 7. OPTIONS
- Purpose: `Describes the allowed methods and options for a resource`.

- Use Case: CORS (Cross-Origin Resource Sharing) preflight requests.

- Characteristics:

    - Safe and idempotent.

    - Useful for clients to understand what actions can be taken.

- 📌 Example: OPTIONS /users → returns methods like GET, POST, etc.