'use client'

import GridLayout from "./layout/grid-layout"
import Asset from "./layout/asset"
import View from "./layout/view"

import Input from "./elements/input"
import Button from "./elements/button"
import DatePicker from "./elements/date-picker"
import DateRangePicker from "./elements/date-range-picker"
import Chart from "./elements/chart"
import React from "react"

const Home = () => {
  return (
    <React.StrictMode>
      <main className="min-h-screen min-w-screen p-12">
        <GridLayout name="testing">
          <Asset name="custom-asset-test" buttons={[
            {
              action: 'view.default',
              actionProps: {
                api: {
                  user: {
                    url: "https://dummyjson.com/user",
                    id: 5,
                    params: {
                      search: "test"
                    }
                  },
                },
              },
              label: 'User Default',
              icon: 'index'
            },
            {
              action: 'view.detail',
              actionProps: {
                api: {
                  user: {
                    url: "https://dummyjson.com/user",
                    id: 1,
                    params: {
                      search: "test"
                    },
                  },
                },
              },
              label: 'User Edit',
              icon: 'edit'
            },
          ]}>
            <View
              type="default" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                  id: 1,
                },
                post: {
                  url: "https://dummyjson.com/posts",
                  id: 1,
                }
              }}>
              <Input
                name="user.id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <Input 
                name="user.university"
                link="user" 
                linkKey="university" 
                placeholder="University"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <DatePicker 
                name="user.birthDate"
                link="user" 
                linkKey="birthDate" 
                placeholder="Birthdate"
                label="Birthdate"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <DateRangePicker 
                name="user.birthDateRange"
                link="user" 
                linkKey="birthDate" 
                placeholder="Birthdate"
                label="Birthdate"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
                <Button name="submit.user" action="submit.user">
                  Submit
                </Button>
                <Button name="view.edit" 
                  action="view.edit" 
                  actionProps={{
                    api: {
                      user:{
                        id: 1, 
                        params: {
                          search: "Search String"
                        }
                      }
                    }
                  }} 
                >
                  Change to Edit
                </Button>
                <Chart name="chart.example.1"/>
                <Chart name="chart.example.2"/>
            </View>
            <View
              type="detail" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                  id: 5,
                },
                post: {
                  url: "https://dummyjson.com/posts",
                  id: 2,
                }
              }}>
              <Input
                name="id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="User ID"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
            </View>
            <View
              type="edit" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                },
                post: {
                  url: "https://dummyjson.com/posts",
                }
              }}>
              <Input
                name="id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="User ID"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
            </View>
          </Asset>
          <Asset name="custom-asset-test-2">
            <View
              type="default" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                  id: 1,
                },
                post: {
                  url: "https://dummyjson.com/posts",
                  id: 1,
                }
              }}>
              <Input
                name="user.id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <Input 
                name="user.university"
                link="user" 
                linkKey="university" 
                placeholder="University"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <DatePicker 
                name="user.birthDate"
                link="user" 
                linkKey="birthDate" 
                placeholder="Birthdate"
                label="Birthdate"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
              <DateRangePicker 
                name="user.birthDateRange"
                link="user" 
                linkKey="birthDate" 
                placeholder="Birthdate"
                label="Birthdate"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
                <Button name="submit.user" action="submit.user" link="submit.user">
                  Submit
                </Button>
                <Button name="view.edit" 
                  action="view.edit" 
                  actionProps={{
                    api: {
                      user:{
                        id:90, 
                        params: {
                          search: "Search String"
                        }
                      }
                    }
                  }} 
                >
                  Change to Edit
                </Button>
                <Chart name="chart.example.1"/>
                <Chart name="chart.example.2"/>
            </View>
            <View
              type="detail" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                  id: 2,
                },
                post: {
                  url: "https://dummyjson.com/posts",
                  id: 2,
                }
              }}>
              <Input
                name="id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="User ID"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
            </View>
            <View
              type="edit" 
              api={{
                user: {
                  url: "https://dummyjson.com/user",
                },
                post: {
                  url: "https://dummyjson.com/posts",
                }
              }}>
              <Input
                name="id"
                link="user" 
                linkKey="id" 
                placeholder="User ID"
                label="User ID"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.firstName"
                link="user" 
                linkKey="firstName" 
                placeholder="First Name"
                label="Label"
                actions={{
                  edit: "edit", 
                  filters: true
                }}/>
              <Input 
                name="user.lastName"
                link="user" 
                linkKey="lastName" 
                placeholder="Last Name"
                label="Label"
                actions={{
                  edit: "edit.users", 
                  filters: true
                }}/>
            </View>
          </Asset>
        </GridLayout>
      </main>
    </React.StrictMode>
  )
}

export default Home