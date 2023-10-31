'use client'

import GeneralAsset from "./assets/general-asset"
import View from "./assets/view"
import AssetExample from "./assets/asset-example"
import GeneralPage from "./assets/general-page"

export default function Home() {
  return (
    <main class="min-h-screen min-w-screen">
      <GeneralPage>
        <GeneralAsset
          sizes={{
            minWidth: 1,
            maxWidth: 1,
            minHeight: 1,
            maxHeight: 1,
          }}>
          <View
            type={['default']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <AssetExample 
              link="users" 
              actions={{
                edit: "edit", 
                filters: true
              }}
              sizes={{
                minWidth: 1,
                maxWidth: 1,
                minHeight: 1,
                maxHeight: 1,
              }}/>
            <AssetExample 
              link="users" 
              actions={{
                edit: "edit.users", 
                filters: true
              }}
              sizes={{
                minWidth: 1,
                maxWidth: 1,
                minHeight: 1,
                maxHeight: 1,
              }}/>
          </View>
          <View
            type={['detail']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <AssetExample link="posts"/>
          </View>
          <View
            type={['edit']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <AssetExample link="posts"/>
          </View>
          <View
            type={['filters']} 
            api={{
              users: {url: "https://dummyjson.com/users"},
              posts: {url: "https://dummyjson.com/posts"}
            }}>
            <AssetExample link="posts"/>
          </View>
        </GeneralAsset>
      </GeneralPage>
    </main>
  )
}
