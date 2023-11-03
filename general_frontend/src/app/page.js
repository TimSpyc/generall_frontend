'use client'

import GridLayout from "./assets/grid-layout"
import Asset from "./assets/asset"
import View from "./assets/view"

import Input from "./elements/input"

const Home = () => {
  return (
    <main className="min-h-screen min-w-screen p-12">
      <GridLayout>
        <Asset name="custom-asset-test">
          <View
            type={['default']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input
              link="users" 
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              link="users" 
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <Input 
              link="users" 
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
          </View>
          <View
            type={['detail']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts"/>
          </View>
        </Asset>
      </GridLayout>
    </main>
  )
}

export default Home