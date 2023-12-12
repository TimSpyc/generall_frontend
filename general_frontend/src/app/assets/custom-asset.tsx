import TextArea from "../elements/textarea/textarea";
import Input from "../elements/input/input";
import Button from "../elements/button/button";
import DatePicker from "../elements/date-picker/date-picker";
import DateRangePicker from "../elements/date-range-picker/date-range-picker";
import Chart from "../elements/chart/chart";
import Checkbox from "../elements/checkbox/checkbox";
import Asset from "../layout/asset";
import View from "../layout/view";

const CustomAsset = ({props}: any) => {
  return (
    <Asset
			name="custom-asset"
      buttons={[
        {
          view: ["default", "detail", "edit"],
          action: "view.default",
          actionProps: {
            api: { user: { id: 1 } },
          },
          label: "User Default",
          icon: "index",
        },
        {
          view: ["default"],
          action: "view.detail",
          actionProps: {
            api: { user: { id: 6 } },
          },
          label: "User Detail",
          icon: "detail",
        },
        {
          view: ["default"],
          action: "view.edit",
          actionProps: {
            api: { user: { id: 7 } },
          },
          label: "User Edit",
          icon: "edit",
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
				<Chart name="chart.example.1" />
        <Chart name="chart.example.2" />
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
  );
};

export default CustomAsset;