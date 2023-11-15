'use client'

import GridLayout from "./assets/grid-layout"
import Asset from "./assets/asset"
import View from "./assets/view"

import Input from "./elements/input"
import SubmitButton from "./elements/submitbutton"

const Home = () => {
  return (
    <main className="min-h-screen min-w-screen p-12">
      <GridLayout name="testing">
        <Asset name="custom-asset-test">
          <View
            type={['default']} 
            api={{
              user: {url: "https://dummyjson.com/user/3"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input
              name="user.id"
              link="user" 
              linkKey="id" 
              placeholder="User ID"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.firstName"
              link="user" 
              linkKey="firstName" 
              placeholder="First Name"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.lastName"
              link="user" 
              linkKey="lastName" 
              placeholder="Last Name"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <Input 
              name="user.university"
              link="user" 
              linkKey="university" 
              placeholder="University"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
              <SubmitButton name="submit.user"/>
          </View>
          <View
            type={['detail']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" linkKey="university" name="user.test.1"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" linkKey="university" name="user.test.1"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="posts" linkKey="university" name="user.test.1"/>
          </View>
        </Asset>
        <Asset name="custom-asset-test-1">
          <View
            type={['default']} 
            api={{
              user: {url: "https://dummyjson.com/user/1"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input
              name="user.id"
              link="user" 
              linkKey="id" 
              placeholder="User ID"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.firstName"
              link="user" 
              linkKey="firstName" 
              placeholder="First Name"
              actions={{
                edit: "edit", 
                filters: true
              }}/>
            <Input 
              name="user.lastName"
              link="user" 
              linkKey="lastName" 
              placeholder="Last Name"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <Input 
              name="user.university"
              link="user" 
              linkKey="university" 
              placeholder="University"
              actions={{
                edit: "edit.users", 
                filters: true
              }}/>
            <SubmitButton name="submit.user"/>
          </View>
          <View
            type={['detail']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="user" linkKey="university" name="user.test.1"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="user" linkKey="university" name="user.test.1"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <Input link="user" linkKey="university" name="user.test.1"/>
          </View>
        </Asset>
      </GridLayout>
    </main>
  )
}

export default Home