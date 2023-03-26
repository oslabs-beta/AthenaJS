---
sidebar_position: 0
---

# Mocking Props

Mocking props is an important aspect of component development and testing in AthenaJS, as it allows developers to simulate the data their components receive from parent components or external sources. This helps ensure that the component behaves as expected in various scenarios.

To create and manage mock props for components in AthenaJS, users can use the app’s **Prop Window**, which allows for easy and intuitive management of mock props.

Here is a step-by-step guide on how to write and use dummy props in AthenaJS:

- **Access the props editor**: Locate the props editor panel in the bottom left of the AthenaJS UI. This panel is dedicated to creating and managing prop mocks for your isolated component.

- **Write the mock prop**: In the “Props” text area, write the mock prop using JSON notation. For example, you can enter 

`{“count” : 1}` 

- to create a dummy prop named “count” with a value of 1. For more complex prop values, you can use JSON objects or arrays, such as: 
  
`{“items”: [{“id”:1, “name”: “Item 1”}, {“id”: 2, “name”: “Item 2”}]}`.

- **Utilize the built-in linter**: As you write your mock props, the built-in linter will check for any syntax errors or issues in your JSON notation. If any problems are detected, the linter will notify you on the left side of the panel and provide helpful feedback if you hover over the notification.

- **Preview the component**: The component will automatically update as you update the mock props in the editor. With the mock props defined, you can preview the component in AthenaJS’s component rendering panel. This allows you to see how the component behaves with specified prop values, and make any necessary adjustments on the fly thanks to AthenaJS’s live component rendering.

- **Modify or remove mock props**: If needed, you can easily modify or remove existing mock props by accessing the Props panel and editing or deleting the corresponding JSON entries.

By following these steps, users can create and manage mock props for their components in AthenaJS. The automatic updating of the component as mock props are edited ensures a seamless experience for the user, allowing them to efficiently test and develop their components.


```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```
