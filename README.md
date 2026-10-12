# cs333-lab4
Node on your own machine, then Express middleware: a QR code generator and a Band Name Generator 🎸

Do each step below, and **answer the questions right here in this `README.md` file** as you go (type your answers under each question).

- **Part 1 — Monday Oct 19, self-guided (no class, I'm at a conference).** Node, files, npm, and a command-line QR code generator.
- **Part 2 — after Wednesday's class.** Express middleware, built up one file at a time into a Band Name Generator.

**How this lab works (two links to hand in, plus your landing page):**
- **Your code:** make your own copy of this lab (click **Use this template**, or clone it), do your work, and **push it to your own GitHub repo**.
- **Your landing page** on `lampforall`, updated with Lab 4 (see the end).

This lab runs **on your computer**, not on `lampforall`. Our shared server only serves files you upload; it doesn't run Node programs for you. Later in the term we build servers that can.

**When you get stuck on Monday**, post in the Slack lab thread with (1) the command you ran, (2) the **exact** error text, copied, and (3) what you already tried. Answering a classmate's question counts as doing the lab well. Check the **Stuck?** table at the bottom first.

---

# Part 1: Node on your machine (Monday, about 2 hours)

Until now all of your JavaScript ran inside a browser. Today it runs on your computer, with no page at all.

## Terminal and Node

Use **Git Bash** on Windows (on the lab machines; at home install Git for Windows, or use WSL) or Terminal on a Mac. In VS Code: **Terminal → New Terminal**, then pick Git Bash from the **⌄** next to the **+**.

| Command | Does |
| --- | --- |
| `pwd` | where am I? |
| `ls` | what's in this folder? |
| `mkdir name` | make a folder |
| `cd name` / `cd ..` | go into a folder / up one |
| `code .` | open this folder in VS Code |

1. Run `node --version` and `npm --version`. You need Node **22 or newer**; if it's older or "command not found", install the **LTS** from [nodejs.org](https://nodejs.org), then close and reopen the terminal.
   What version do you have?

## The REPL

2. Type `node` and press Enter. The prompt changes to `>`. This is the **REPL**: Read, Evaluate, Print, Loop. Try:
   ```
   > 5 + 8
   > "sou".toUpperCase()
   > [3, 1, 2].map((n) => n * 10)
   > process.version
   > document
   ```
   `document` worked in the browser's console. What happens here, and why?
   Leave with `.exit`.

## Your first program

3. Make a practice folder **outside** this repo and open it:
   ```bash
   cd ~
   mkdir node-practice
   cd node-practice
   code .
   ```
   Create `index.js` containing `console.log("Hello from Node!");` and run `node index.js`.
4. Run it with `node --watch index.js` instead. Change the message and save: it reruns by itself. Stop it with **Ctrl+C**.
   (Older tutorials install a package called `nodemon` for this. It's built into Node now.)
5. Make a `package.json` and switch on ES modules:
   ```bash
   npm init -y
   npm pkg set type=module
   ```
   Open `package.json` and find the `"type": "module"` line. With it, Node uses `import` / `export`, the same modules as `<script type="module">` in the browser.
   Without it, Node expects the older **CommonJS** style: `const fs = require("fs")`. You'll see both in real code. What goes wrong if you mix them in one project? (Try it: put a `require` in your file and run it.)

## Files, with the `await` you learned last week

6. Replace `index.js` with:
   ```js
   import { writeFile, readFile } from "node:fs/promises";

   console.log("1. about to write");
   await writeFile("message.txt", "Hello Node.js");
   console.log("2. written");

   const text = await readFile("message.txt", "utf8");
   console.log("3. read back:", text);
   ```
   Run it, and check `message.txt` appeared. (`node:` means "built into Node", not from npm.)
7. Remove `"utf8"` from `readFile` and run it. What prints instead of your text? What does that tell you about what a file *is*? Put it back.
8. Change the file name in `readFile` to `nope.txt`. What is the error **code** (a word in capitals)? Then wrap it in `try` / `catch` so it prints a friendly message instead of crashing.
9. Find the function in the [Node `fs/promises` docs](https://nodejs.org/docs/latest/api/fs.html#promises-api) that **adds** to the end of a file instead of replacing it. Use it to add a line each time the program runs. Run it three times and check the file.
   Which function was it?
10. You'll also meet the older **callback** style in existing code:
    ```js
    import fs from "node:fs";

    fs.writeFile("message.txt", "Hello Node.js", (err) => {
      if (err) throw err;
      console.log("It's saved!");
    });
    console.log("This prints first");
    ```
    Why does "This prints first" print first? (Think back to the `A C B` puzzle.)

## Choosing a package

[npmjs.com](https://www.npmjs.com) has millions of packages, and anyone can publish one. Two QR code packages come up in tutorials: **`qr-image`** and **`qrcode`**.

11. Look both up on npmjs.com (and `npm view qr-image time` in the terminal) and fill this in:

    | | `qr-image` | `qrcode` |
    | --- | --- | --- |
    | Weekly downloads | | |
    | Last published | | |
    | Open issues on GitHub | | |
    | Can it save straight to a PNG? | | |

    Which would you choose for a project you had to keep running for years, and why? (We'll use `qrcode`: say whether you agree.)

## The QR code generator

Now work in **this repo**. `index.js` has the plan in a comment.

12. Set it up and install the packages:
    ```bash
    npm init -y
    npm pkg set type=module
    npm install qrcode @inquirer/prompts
    ```
    Look at what changed: `package.json` lists them under `"dependencies"`, `node_modules/` appeared, and so did `package-lock.json`.
    `.gitignore` already contains `node_modules/`. Why should `node_modules` never go into git, and how does someone who clones your repo get the packages?
13. **Ask for a URL.** In the [`@inquirer/prompts` docs](https://www.npmjs.com/package/@inquirer/prompts), find the `input` prompt. Ask for a URL, `await` the answer and `console.log` it.
14. **Reject bad input.** `input` takes a `validate` option: a function that returns `true` for good input or a string to show as the error. `URL.canParse(value)` tells you whether something is a full URL. Make `sou.edu` get rejected and `https://sou.edu` accepted.
15. **Make the image.** In the [`qrcode` docs](https://www.npmjs.com/package/qrcode), find `toFile`. It returns a promise, so you can `await` it. Save `qr.png`, open it, and scan it with your phone.
16. **Name it after the site.** `new URL(url).hostname` turns `https://sou.edu/academics` into `sou.edu`. Save as `sou.edu.png` instead.
17. **Keep a history.** Append each URL, with `new Date().toISOString()`, to `urls.txt` (the function from step 9).
18. **Tell the user it worked**, and print the QR code in the terminal too: the `qrcode` docs have a way to render to a string with `type: "terminal"`.
19. Make a QR code for **your landing page on `lampforall`** and keep the PNG in this repo: you'll use it at the end.
20. Why can't this program run on a static web page like your `lampforall` site? What's different about where it runs?

Optional stretch:
- Skip the prompt when the URL is given on the command line (`node index.js https://sou.edu`). Look up `parseArgs` in the `node:util` docs.
- Save an `.svg` as well. Why might an SVG be better for a poster?
- Colours: make one in SOU red, then check it still scans.

**Commit as you go**, at least once per step from 13 to 18, with messages that say what works (`Validate URL input`).

---

# Part 2: Express middleware (after Wednesday)

Everything is in the **`Middleware/`** folder: a form in `public/index.html`, four exercises `index1.js` to `index4.js`, and the finished version of each in `solution1.js` to `solution4.js`.

Do `index1.js` first, then compare with `solution1.js`; then `index2.js`, and so on. **Type it, don't paste it.** By `index4.js` you'll have a working Band Name Generator.

21. Install and run the first one:
    ```bash
    cd Middleware
    npm install
    npm run dev1
    ```
    `npm run dev1` is `node --watch index1.js`: look in `package.json`. Open `http://localhost:3000`. You should see the form.
    Which line of `index1.js` makes the form appear, and where does that file live?
22. Install the **REST Client** extension in VS Code and open `Middleware/requests.http`. Click **Send Request** above the first request. That's how you'll test routes from now on, without clicking through the browser each time.

### index1.js: receiving a form

23. Submit the form in the browser. What does the page say, and what does the server terminal show?
24. Add a `POST /submit` route that `console.log`s `req.body` and sends back a short reply. Submit again.
    What is `req.body`?
25. Add `app.use(express.urlencoded());` near the top and submit again. What changed, and what does this middleware do?
    (Older tutorials install a package called `body-parser` for this. It's been built into Express since 2017.)
26. Send the second request in `requests.http`. What happens if you remove the `res.send(...)` line from your route and send it again?

### index2.js: logging with `morgan`

27. Stop `dev1` (Ctrl+C) and run `npm run dev2`. Add `morgan("dev")` as middleware (`import morgan from "morgan";` then `app.use(morgan("dev"));`). Load the page from the browser and from `requests.http`.
    What does each part of a log line mean?
28. Try `morgan("combined")`. What extra information does it log, and which line tells you whether a request came from the browser or from REST Client?

### index3.js: your own middleware

29. Run `npm run dev3`. It crashes straight away: read the error. `index3.js` uses a `logger` function that doesn't exist yet. Write it above the `app.use(logger)` line: a function `(req, res, next)` that logs `req.method` and `req.url`, then calls `next()`.
30. Delete `next();` and reload the page. What happens, and why?
31. Look at `solution3.js`: its logger also times each request with `res.on("finish", ...)`. That's an **event listener**, on the server. When does it run?

### index4.js: the Band Name Generator

32. Run `npm run dev4` and build the whole thing from the empty `index4.js`: `morgan`, `express.urlencoded()`, `express.static("public")`, and a `POST /submit` route that replies with the band name: street name + pet name.
33. Write the name-making step as **its own middleware function** that runs only for `/submit`:
    ```js
    app.post("/submit", bandNameGenerator, (req, res) => { ... });
    ```
    It puts the name on `res.locals.bandName` for the route to use. Compare with `solution4.js`.
34. **Validate:** if either field is missing or blank, reply with status **400** and a message. Test it with the third request in `requests.http`.
35. Send the fourth request in `requests.http`: it puts a `<script>` in the street name. What would happen if you put user input straight into the HTML you send back? How does `solution4.js` stop that?
36. An older version of this lab kept the band name in a variable **outside** the functions:
    ```js
    let bandName = "";
    ```
    Why is that a bug once two people use the site at the same moment?

Optional stretch:
- Add a `/history` route that lists every band name made since the server started, newest first.
- Save the history to a JSON file with `node:fs/promises`, so it survives a restart.
- Turn the form into a `fetch` call (like Lab 3), sending JSON to a `POST /api/band-name` route that answers with `res.json(...)`. Show the result without a page reload.

**Comment each `indexN.js`** to show you understand it: what each middleware does, and why it's in that order. These are not typical comments: they're to show me you read up on the pieces.

---

# Hand it in

37. Add Lab 4 to your landing page: a short description, your QR code image from step 19, and a link to this repo on GitHub (it runs on your computer, so there's no live version to link).
38. SFTP the updated landing page and the QR image to `lampforall`. Scan the QR code on the live page with your phone: does it go where it should?
39. Push this repo (code **and** this README with your answers) to **your own GitHub repo**.
40. Submit in Moodle: (1) your GitHub repo and (2) your landing page.

---

## Stuck?

| You see | What's going on | Fix |
| --- | --- | --- |
| `node: command not found` / `'node' is not recognized` | Node isn't installed, or the terminal was open before you installed it | Install the LTS, then **close and reopen** the terminal and VS Code |
| `Cannot use import statement outside a module` | No `"type": "module"` in `package.json` | `npm pkg set type=module` |
| `require is not defined in ES module scope` | CommonJS code in an ES module project | Change `require` to `import` |
| `Cannot find package 'qrcode'` / `ERR_MODULE_NOT_FOUND` | Not installed, or installed in another folder | `pwd`: are you in the project folder? Then `npm install` |
| `ENOENT: no such file or directory` | Relative paths start from the folder you ran `node` **from** | `pwd`, `ls`, and run from the project folder |
| `package.json` ended up in the wrong place | You weren't in the project folder when you ran `npm init` | Delete it, `cd` to the right folder, run it again |
| `running scripts is disabled on this system` | PowerShell is blocking npm | Use **Git Bash** as your VS Code terminal |
| `EACCES: permission denied` on `npm install -g …` | Global installs need admin | Nothing in this lab needs `-g`: install inside the project |
| `EADDRINUSE: address already in use :::3000` | Another server is still running, often in a forgotten terminal tab | Ctrl+C or close (🗑) every terminal tab. Still stuck: Mac/Git Bash `lsof -i :3000` then `kill <PID>`; or run on another port: `PORT=3001 npm run dev4` |
| The browser spins forever | A route never sends a response, or a middleware never calls `next()` | Every request must end in `res.send` / `res.json` / `res.status(...).end()` |
| `req.body` is `undefined` | No body-parsing middleware, or it's added **after** the route | `app.use(express.urlencoded())` above your routes |
| `Cannot GET /something` | No route or file for that path | Check the path and the method (GET vs POST) |
| `Unexpected token` in `package.json` | A missing or extra comma | Every line but the last inside `{ }` ends with a comma |
