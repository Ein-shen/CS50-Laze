import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

// Profile
import Profile from './profile/Profile'
import ProfileCard from './profile/ProfileCard'

// Authentication
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'

// Main pages
import Dashboard from './pages/Dashboard'

// Home
import Message from './Home/Message'
import Search from './Home/Search'
import Ai from './Home/Ai'
import Home from './Home/Home'
import Notification from './Home/Notification'
import Chat from './Home/Chat'

// Components
import Decks from './components/Decks'
import Greetings from './components/Greetings'
import Popup from './components/Popup'

import Createdeck from './components/Createdeck'
import Cards from './components/Cards'
import Edit from './components/Edit'
import Delete from './components/Delete'
import Return from './components/Return'
import DeckDropDown from './components/DeckDropDown'
import Total from './components/Total'

import Study from './components/Study'
import QandA from './components/QandA'
import Public from './components/Public'
import Private from './components/Private'
import Stats from './components/Stats'
import ShareStudy from './components/ShareStudy'

import Stalk from './components/Stalk'
import AddFriendButton from './components/AddFriendButton'
import ShareTotal from './components/ShareTotal'

// Admin
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'


export default function App() {

    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    // null = still checking
    // user = regular user
    // admin = administrator
    const [role, setRole] = useState(null)

    const [status, setStatus] = useState(null)


    // =====================================================
    // GET CURRENT SESSION
    // =====================================================

    useEffect(() => {

        const getSession = async () => {

            const {
                data: { session }
            } = await supabase.auth.getSession()

            setSession(session)
            setLoading(false)
        }

        getSession()


        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
            }
        )


        return () => {
            subscription.unsubscribe()
        }

    }, [])


    // =====================================================
    // GET USER ROLE
    // =====================================================

    useEffect(() => {

        if (!session?.user) {

            setRole(null)
            setStatus(null)

            return
        }


        const getProfile = async () => {

            const {
                data,
                error
            } = await supabase
                .from('profiles')
                .select('role, status')
                .eq('id', session.user.id)
                .single()


            if (error) {

                console.error('Error getting profile:', error)

                setRole('user')
                setStatus('active')

                return
            }


            setRole(data?.role ?? 'user')
            setStatus(data?.status ?? 'active')
        }


        getProfile()

    }, [session])


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-300">
                <p className="text-lg font-bold">
                    Loading...
                </p>
            </div>
        )
    }


    return (

        <Routes>

            {/* =====================================================
                ADMIN LOGIN
            ===================================================== */}

            <Route
                path="/admin-login"
                element={

                    session && role === 'admin'

                        ? <Navigate to="/admin" replace />

                        : <AdminLogin />

                }
            />


            {/* =====================================================
                ADMIN AREA
            ===================================================== */}

            <Route
                path="/admin"
                element={

                    !session

                        ? <Navigate to="/admin-login" replace />

                        : role === null

                            ? (
                                <div className="min-h-screen flex items-center justify-center bg-gray-300">
                                    <p className="text-lg text-gray-500">
                                        Loading...
                                    </p>
                                </div>
                            )

                            : role === 'admin'

                                ? <AdminLayout />

                                : <Navigate to="/admin-login" replace />
                }
            >

                {/* /admin */}
                <Route
                    index
                    element={<AdminDashboard />}
                />

            </Route>


            {/* =====================================================
                REGULAR APPLICATION
            ===================================================== */}

            <Route
                path="/"
                element={

                    !session

                        ? <Login />

                        : role === 'admin'

                            ? <Navigate to="/admin" replace />

                            : <Dashboard session={session} />
                }
            >

                <Route
                    index
                    element={<Home />}
                />

                <Route
                    path="createdeck"
                    element={<Createdeck />}
                />

                <Route
                    path="chat"
                    element={<Chat />}
                />

                <Route
                    path="chat/:deckId"
                    element={<Chat />}
                />

                <Route
                    path="message"
                    element={<Message />}
                />

                <Route
                    path="message/:deckId"
                    element={<Message />}
                />

                <Route
                    path="profile"
                    element={<Profile user={session?.user} />}
                />

                <Route
                    path="profile/:deckId"
                    element={<Profile />}
                />

                <Route
                    path="profilecard"
                    element={<ProfileCard />}
                />

                <Route
                    path="stalk/:username"
                    element={<Stalk />}
                />

                <Route
                    path="decks"
                    element={<Decks />}
                />

                <Route
                    path="decks/:deckId"
                    element={<Decks />}
                />

                <Route
                    path="cards/:deckId"
                    element={<Cards />}
                />

                <Route
                    path="deckdropdown"
                    element={<DeckDropDown />}
                />

                <Route
                    path="qanda"
                    element={<QandA />}
                />

                <Route
                    path="edit"
                    element={<Edit />}
                />

                <Route
                    path="return"
                    element={<Return />}
                />

                <Route
                    path="delete"
                    element={<Delete />}
                />

                <Route
                    path="notification"
                    element={<Notification />}
                />

                <Route
                    path="search"
                    element={<Search />}
                />

                <Route
                    path="greetings"
                    element={<Greetings />}
                />

                <Route
                    path="popup"
                    element={<Popup />}
                />

                <Route
                    path="ai"
                    element={<Ai />}
                />

                <Route
                    path="public"
                    element={<Public />}
                />

                <Route
                    path="private"
                    element={<Private />}
                />

                <Route
                    path="stats"
                    element={<Stats />}
                />

                <Route
                    path="addfriendbutton"
                    element={<AddFriendButton />}
                />

            </Route>


            {/* =====================================================
                PUBLIC SHARING
            ===================================================== */}

            <Route
                path="/sharestudy/:deckId"
                element={<ShareStudy />}
            />

            <Route
                path="/sharetotal/:deckId"
                element={<ShareTotal />}
            />


            {/* =====================================================
                STUDY
            ===================================================== */}

            <Route
                path="/study/:deckId"
                element={
                    session
                        ? <Study />
                        : <Navigate to="/login" replace />
                }
            />


            {/* =====================================================
                TOTAL
            ===================================================== */}

            <Route
                path="/total/:deckId"
                element={
                    session
                        ? <Total />
                        : <Navigate to="/login" replace />
                }
            />


            {/* =====================================================
                AUTH
            ===================================================== */}

            <Route
                path="/signup"
                element={
                    session
                        ? <Navigate to="/" replace />
                        : <Signup />
                }
            />

            <Route
                path="/login"
                element={
                    session
                        ? <Navigate to="/" replace />
                        : <Login />
                }
            />


            <Route 
                    path="/welcome"
                     element={<Landing />} />

        </Routes>
    )
}