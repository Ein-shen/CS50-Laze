# LAZE




#### Video Demo:  <URL HERE>




#### Description:

Laze is a full-stack study companion web app built with React on the frontend and Supabase on the backend. The idea behind Laze came from a mix of my own study habits and my frustration with existing tools: I wanted something that combined the quiz-building simplicity of the Gizmo web app with social features like a real friends list and live chat, so that studying didn't have to feel like a solitary task. With Laze, a user can create an account, build their own multiple-choice decks (sets of practice questions), study those decks in a quiz format, share decks publicly so other users can practice from them, add friends, and chat with those friends in real time — all wrapped around a single Supabase project that handles authentication, the database, file storage, and realtime subscriptions.

I chose Supabase over something like Firebase mainly because it gave me a real relational Postgres database with SQL I could reason about directly, plus row-level security, storage, auth, and realtime channels all bundled together. That meant I didn't have to stitch multiple services together myself, and I could write actual SQL views (like my_friends, discussed below) instead of reshaping data client-side every time I needed it.

Pages

The src/pages folder holds the top-level routed views of the app: Login.jsx and Signup.jsx handle authentication through Supabase Auth, letting a user create an account or sign back in with an email and password. Signout.jsx clears the current session and returns the user to the login screen. Dashboard.jsx is the main hub a user lands on after logging in — it pulls together decks, friends, and quick access to studying so the user doesn't have to dig through menus to get started.

Components

The src/components folder is where the bulk of Laze's logic lives.

ProfileCard.jsx renders a user's profile — their avatar, name, and username — and lets the profile owner switch between Public, Private, and Stats tabs. It also handles avatar uploads: when a user picks a new profile photo, the image is first resized and compressed client-side (down to a maximum of 512px and re-encoded as a JPEG at 80% quality) before it's uploaded to Supabase Storage. I added this compression step deliberately, since raw phone camera photos can be several megabytes, and uploading those directly would slow down the app and waste storage — shrinking them first keeps uploads fast without a noticeable quality loss for a small circular avatar.

Public.jsx, Private.jsx, and Stats.jsx back the three tabs on the profile card, showing a user's public decks, private decks, and study statistics respectively. Decks.jsx, Createdeck.jsx, DeckDropDown.jsx, Cards.jsx, and QandA.jsx together make up the deck-building system: a user creates a deck, then adds individual multiple-choice questions to it, each with four answer options and one correct answer. I intentionally kept Laze to multiple-choice questions only, rather than supporting short answer or matching questions, because it kept both the data model and the study/grading logic simple and predictable — a design tradeoff directly inspired by how the Gizmo web app scopes its own quizzes.

Study.jsx is the actual quiz-taking experience: it walks a user through a deck one question at a time and tracks their score as they go. ShareStudy.jsx, ShareTotal.jsx, and Total.jsx handle sharing a deck publicly and summarizing results, so a user can see how they performed and let others study from decks they've published.

AddFriendButton.jsx and Notification.jsx manage the friend-request flow. Rather than making two users instantly "friends" the moment one adds the other, Laze uses a request/accept model much like Facebook: a row is inserted into a friends table with a pending status when a request is sent, and only flips to accepted once the receiver confirms it. Message.jsx and Chat.jsx build on top of that accepted relationship to provide real-time messaging, using a Supabase Realtime channel subscribed to Postgres INSERT events on the messages table so new messages appear instantly without polling.

One design decision I went back and forth on was how to get a friend's name and profile photo into the chat screen. My first instinct was to have Chat.jsx fetch that data itself with useEffect every time the page loaded. Instead, I settled on passing it through React Router's navigate(path, { state }) from Message.jsx when a user clicks a friend to open a chat, since the data is already available at that point and avoids a redundant database call. The tradeoff is that this state disappears on a hard refresh, which is a known limitation I'd address with a fallback fetch keyed on the room ID if I extend the project further.

To surface friends and their avatars efficiently, I built a my_friends SQL view on top of the friends and profiles tables. It uses auth.uid() to automatically resolve "the other person" in a friendship relative to whoever is logged in, and filters to only accepted friendships. This meant Message.jsx and Chat.jsx could pull a friend's name, username, and profile photo with a single select * from my_friends query instead of writing that join logic in JavaScript every time.

Ai.jsx is a placeholder for an upcoming feature: an AI-assisted layer to the study experience, planned to help generate or refine practice questions, that I haven't fully built out yet. Search.jsx lets users look up decks or people, Sidebar.jsx, Upperbar.jsx, Footer.jsx, and Greetings.jsx make up the app's persistent navigation and layout shell, and Edit.jsx, Delete.jsx, Popup.jsx, Return.jsx, and Stalk.jsx are smaller supporting components used throughout the app for editing content, confirming deletions, showing modal popups, navigating back a page, and viewing another user's public profile.

Finally, supabaseClient.js initializes and exports a single shared Supabase client instance, used across every component and page so the whole app talks to the same authenticated session and database connection.
