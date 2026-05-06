"use client";

import Header from "@/app/components/header";
import Post from "@/app/components/post";
import LandingPage from "./components/landing";
import { useEffect, useState } from "react";
import CreatePost from "./components/createPost";

function LoggedIn({ profile, setProfile, setCreatePostMenu, posts }) {
  return (
    <div>
      <Header
        setProfile={setProfile}
        setCreatePostMenu={setCreatePostMenu}
      ></Header>
      <p className="flex w-full p-5 justify-center align-middle welcome">
        Hello, {profile.firstname}
      </p>
      <div className="flex flex-col items-center justify-center h-full gap-6">
        {posts.map((p, idx) => (
          <Post {...p} key={idx + Math.random()} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [createPostMenu, setCreatePostMenu] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      {createPostMenu && (
        <CreatePost
          setCreatePostMenu={setCreatePostMenu}
          posts={posts}
          setPosts={setPosts}
        />
      )}
      {profile === null ? (
        <LandingPage setProfile={setProfile} setPosts={setPosts} />
      ) : (
        <LoggedIn
          setProfile={setProfile}
          profile={profile}
          setCreatePostMenu={setCreatePostMenu}
          posts={posts}
        />
      )}
    </div>
  );
}
