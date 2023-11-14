'use client'

import GridLayout from "./assets/grid-layout"
import Asset from "./assets/asset"
import View from "./assets/view"

import Input from "./elements/input"

const Home = () => {
  return (
    <main className="min-h-screen min-w-screen p-12">
      <GridLayout name="testing">
        <Asset name="custom-asset-test">
          <View
            type={['default']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input
              name="user.test.1"
              link="users" 
              placeholder="test 1"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.test.2"
              link="users" 
              placeholder="test 2"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.test.3"
              link="users" 
              placeholder="test 3"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <Input 
              name="user.test.10"
              link="users" 
              placeholder="test 3"
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
            <Input link="posts" name="user.test.1"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" name="user.test.1"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" name="user.test.1"/>
          </View>
        </Asset>
        <Asset name="custom-asset-test-1">
          <View
            type={['default']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input
              name="user.test.1"
              link="users" 
              placeholder="test 1"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.test.2"
              link="users" 
              placeholder="test 2"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.test.3"
              link="users" 
              placeholder="test 3"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <Input 
              name="user.test.10"
              link="users" 
              placeholder="test 3"
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
            <Input link="posts" name="user.test.1"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" name="user.test.1"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" name="user.test.1"/>
          </View>
        </Asset>
      </GridLayout>
    </main>
  )
}

export default Home