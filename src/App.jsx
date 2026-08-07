import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from "./supabaseClient"


import Profile from "./user/Profile" 
import ProfileCard from "./user/ProfileCard"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Signout from "./pages/Signout"


import Message from "./Home/Message"
import Search from "./Home/Search"
import Ai from "./Home/Ai"
import Home from "./Home/Home"
import Notification from "./Home/Notification"
import Chat from "./Home/Chat"

import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"

import Decks from "./components/Decks"



import Greetings from "./components/Greetings"
import Popup from "./components/Popup"

import Createdeck from "./components/Createdeck"
import Cards from "./components/Cards"
import Edit from "./components/Edit"
import Delete from "./components/Delete"
import Return from "./components/Return"
import DeckDropDown from "./components/DeckDropDown"
import Total from "./components/Total"



import Study from "./components/Study"
import QandA from "./components/QandA"
import Public from "./components/Public"
import Private from "./components/Private"
import Stats from "./components/Stats"
import ShareStudy from "./components/ShareStudy"

import Stalk from  "./components/Stalk"
import AddFriendButton from  "./components/AddFriendButton"
import ShareTotal from  "./components/ShareTotal"

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={session ? <Dashboard session={session} /> : <Login />}>
        <Route path="createdeck" element={<Createdeck/>} />


        <Route path="chat/:deckId" element={<Chat />} />
        <Route path="/message/:deckId" element={<Message />} />
        <Route path="/profile/:deckId" element={<Profile />} />
        <Route path="stalk/:username" element={<Stalk />} />

        <Route path="chat" element={<Chat/>} />
        <Route path="deckdropdown" element={<DeckDropDown/>} />
        <Route path="decks/:deckId" element={<Decks />} />
        <Route path="cards/:deckId" element={<Cards />} />
        <Route path="qanda" element={<QandA />} />
        <Route path="edit" element={<Edit/>} />
        <Route path="return" element={<Return/>} />
        <Route path="delete" element={<Delete/>} />
        <Route path="decks" element={<Decks />} />
        <Route path="profile" element={<Profile user={session?.user} />} />
        <Route index element={<Home />} />
        <Route path="notification" element={<Notification />} />
        <Route path="message" element={<Message />} />
        <Route path="search" element={<Search/>}  />
        <Route path="greetings" element={<Greetings/>}  />
        <Route path="popup" element={<Popup/>} />
        <Route path="profilecard" element={<ProfileCard/>} />
        <Route path="ai" element={<Ai/>} />
        <Route path="public" element={<Public/>} />
        <Route path="/cards/:deckId" element={<Private />} />
        <Route path="stats" element={<Stats />} />
        <Route path="addfriendbutton" element={<AddFriendButton />} />

        <Route path="/stalk/:username" element={<Stalk />} />

      </Route>



      {/* ✅ public share route — no login required */}
      <Route
        path="/sharestudy/:deckId"
        element={<ShareStudy />}
      />

       <Route
        path="/sharetotal/:deckId"
        element={<ShareTotal />}
      />


      {/* ✅ moved out — now top-level, no sidebar/layout */}
      <Route
        path="/study/:deckId"
        element={session ? <Study /> : <Navigate to="/login" />}


      />


      <Route path="/total/:deckId" element={session ? <Total /> : <Navigate to="/login" />} />

      <Route path="/signup" element={session ? <Navigate to="/" /> : <Signup />} />
      <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
    </Routes>
  )
}
