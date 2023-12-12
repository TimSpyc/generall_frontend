"use client";
import React from "react";
import dynamic from 'next/dynamic'

import TextArea from "./elements/textarea";
import Input from "./elements/input";
import Button from "./elements/button";
import DatePicker from "./elements/date-picker";
import DateRangePicker from "./elements/date-range-picker";
import Chart from "./elements/chart";
import Checkbox from "./elements/checkbox";

const GridLayout = dynamic(() => import("./layout/grid-layout"), {ssr: false});
const Asset = dynamic(() => import("./layout/asset"), {ssr: false});
const View = dynamic(() => import("./layout/view"), {ssr: false});

const Home = () => {
  return (
    <div className="min-h-screen min-w-screen p-12">
      <GridLayout name="testing">
        <Asset
          name="custom-asset-test"
          buttons={[
            {
              view: ["default", "detail"],
              action: "view.default",
              actionProps: {
                api: {
                  user: {
                    url: "https://dummyjson.com/user",
                    id: 1,
                  },
                },
              },
              label: "User Default",
              icon: "index",
            },
            {
              view: ["default"],
              action: "view.detail",
              actionProps: {
                api: {
                  user: {
                    url: "https://dummyjson.com/user",
                    id: 50,
                  },
                },
              },
              label: "User Detail",
              icon: "detail",
            },
          ]}
        >
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
              },
            }}
          >
            <TextArea
              name="user.userAgent"
              link="user"
              linkKey="userAgent"
              placeholder="User Agent"
              label="Label"
            />
            <Input
              name="user.id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="Label"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
            <Input
              name="user.university"
              link="user"
              linkKey="university"
              placeholder="University"
              label="Label"
            />
            <Checkbox
              name="user.test"
              link="user"
              linkKey="university"
              label="Custom Label"
            />
            <DatePicker
              name="user.birthDate"
              link="user"
              linkKey="birthDate"
              label="Birthdate"
            />
            <DateRangePicker
              name="user.birthDateRange"
              link="user"
              linkKey="birthDate"
              label="Birthdate"
            />
            <Button name="submit.user" action="submit.user" type="button">
              <span>Submit</span>
            </Button>
            <Button
              name="view.edit"
              action="view.edit"
              actionProps={{
                api: {
                  user: {
                    id: 1,
                    params: {
                      search: "Search String",
                    },
                  },
                },
              }}
              type="button"
            >
              <span>Change to Edit</span>
            </Button>
            <Chart name="chart.example.1" />
            <Chart name="chart.example.2" />
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
              },
            }}
          >
            <Input
              name="id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="User ID"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
          </View>
          <View
            type="edit"
            api={{
              user: {
                url: "https://dummyjson.com/user",
              },
              post: {
                url: "https://dummyjson.com/posts",
              },
            }}
          >
            <Input
              name="id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="User ID"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
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
              },
            }}
          >
            <Input
              name="user.id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="Label"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
            <Input
              name="user.university"
              link="user"
              linkKey="university"
              placeholder="University"
              label="Label"
            />
            <DatePicker
              name="user.birthDate"
              link="user"
              linkKey="birthDate"
              label="Birthdate"
            />
            <DateRangePicker
              name="user.birthDateRange"
              link="user"
              linkKey="birthDate"
              label="Birthdate"
            />
            <Button name="submit.user" action="submit.user" type="button">
              <span>Submit</span>
            </Button>
            <Button
              name="view.edit"
              action="view.edit"
              actionProps={{
                api: {
                  user: {
                    id: 90,
                    params: {
                      search: "Search String",
                    },
                  },
                },
              }}
              type="button"
            >
              <span>Change to edit</span>
            </Button>
            <Chart name="chart.example.1" />
            <Chart name="chart.example.2" />
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
              },
            }}
          >
            <Input
              name="id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="User ID"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
          </View>
          <View
            type="edit"
            api={{
              user: {
                url: "https://dummyjson.com/user",
              },
              post: {
                url: "https://dummyjson.com/posts",
              },
            }}
          >
            <Input
              name="id"
              link="user"
              linkKey="id"
              placeholder="User ID"
              label="User ID"
            />
            <Input
              name="user.firstName"
              link="user"
              linkKey="firstName"
              placeholder="First Name"
              label="Label"
            />
            <Input
              name="user.lastName"
              link="user"
              linkKey="lastName"
              placeholder="Last Name"
              label="Label"
            />
          </View>
        </Asset>
      </GridLayout>
    </div>
  );
};

export default Home;
