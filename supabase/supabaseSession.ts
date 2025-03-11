import React, { useState, useEffect } from 'react'
import supabase from '../supabase/supabase'

function supabaseSession() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    

    useEffect(() => {
    
        const session = async () => {
            
            try {
                setLoading(true)

                const { data: { session: supabaseSession } } = await supabase.auth.getSession()
    
                if (!supabaseSession) {
                    console.log('supabaseSession error')
                    return
                }

                const { data: sessionData, error: sessionError } = await supabase.auth.getUser(supabaseSession.access_token)
    
                if (sessionError) {
                    await supabase.auth.signOut()
                    console.log('sessionError')
                    return
                }

                setUser(sessionData)
                setUserDetails(sessionData)

            } catch (error) {
                console.log('error')
            } finally {
                setLoading(false)
            }
        }
    
        session()
    }, [])

    return {
        loading,
        setLoading,
        user,
        setUser,
        userDetails,
        setUserDetails
    }
}

export default supabaseSession