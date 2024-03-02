import type { Provider, User } from "@supabase/supabase-js"
import { Button, IconKey, IconMail, Input, Typography } from "@supabase/ui"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { supabase } from "~core/supabase"

const { Title, Text, Link } = Typography

function IndexOptions() {
  const [user, setUser] = useStorage<User>({
    key: "user",
    instance: new Storage({
      area: "local"
    })
  })

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    async function init() {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
        return
      }
      if (!!data.session) {
        setUser(data.session.user)
        sendToBackground({
          name: "init-session",
          body: {
            refresh_token: data.session.refresh_token,
            access_token: data.session.access_token
          }
        })
      }
    }

    init()
  }, [])

  const handleEmailLogin = async (
    type: "LOGIN" | "SIGNUP",
    username: string,
    password: string
  ) => {
    try {
      const {
        error,
        data: { user }
      } =
        type === "LOGIN"
          ? await supabase.auth.signInWithPassword({
              email: username,
              password
            })
          : await supabase.auth.signUp({ email: username, password })

      if (error) {
        alert("Error with auth: " + error.message)
      } else if (!user) {
        alert("Signup successful, confirmation mail should be sent soon!")
      } else {
        setUser(user)
      }
    } catch (error) {
      console.log("error", error)
      alert(error.error_description || error)
    }
  }

  const getItems = async () => {
    const { data, error } = await supabase
      .from("test")
      .insert([{ title: "someValue" }])
      .select()

    console.log("data", data)
    console.log("error", error)
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        top: 240,
        position: "relative"
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 240,
          justifyContent: "space-between",
          gap: 4.2
        }}>
        {user && (
          <>
            <Button
              block
              placeholder="Создать встречу"
              onClick={() => getItems()}
              size="large"
              type="primary">
              Создать встречу
            </Button>

            <Title level={5}>
              {user.email} - {user.id}
            </Title>

            <Button
              block
              placeholder="LOGOUT"
              onClick={(e) => {
                supabase.auth.signOut()
                setUser(null)
              }}
              size="large"
              type="primary">
              LOG OUT
            </Button>
          </>
        )}
        {!user && (
          <>
            <Input
              label="Email"
              placeholder="john@digweed.com"
              icon={<IconMail />}
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Input
              label="Password"
              placeholder="******************"
              icon={<IconKey />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button
              block
              placeholder="SIGNUP"
              onClick={(e) => {
                handleEmailLogin("SIGNUP", username, password)
              }}
              size="large"
              type="primary"
              style={{ marginBottom: "10px" }}>
              SIGNUP
            </Button>
            <Button
              block
              placeholder="LOGIN"
              onClick={(e) => {
                handleEmailLogin("LOGIN", username, password)
              }}
              size="large"
              type="primary">
              LOGIN
            </Button>

            {/* <Button
              block
              placeholder="GITHUB"
              onClick={(e) => {
                handleOAuthLogin("github")
              }}
              size="large"
              type="default">
              Sign in with GitHub
            </Button> */}
          </>
        )}
      </div>
    </main>
  )
}

export default IndexOptions
