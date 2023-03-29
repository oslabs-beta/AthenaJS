---
sidebar_position: 0
---

# Mocking Props

In AthenaJS, mocking props is an essential aspect of component development and testing. It enables developers to simulate the data that their components receive from parent components or external sources, ensuring that they function correctly in various scenarios. Here is a step-by-step guide on how to write and use dummy props in AthenaJS:

- **Access the props editor**: Find the props editor panel located in the bottom-left of the AthenaJS UI. This panel allows for the creation and management of prop mocks for your isolated component.

- **Write the mock prop**: In the "Props" text area, you can load props from your component page and edit/create more mock props using JSON notation. For example, you can enter `{“count” : 1}` to create a dummy prop called "count" with a value of 1. 
  
- - For more complex prop values, you can use JSON objects or arrays, such as `{“items”: [{“id”:1, “name”: “Item 1”}, {“id”: 2, “name”: “Item 2”}]}`.

- **Utilize the built-in linter**: While writing mock props, AthenaJS's built-in linter will check for syntax errors or issues in your JSON notation. If any problems are detected, the linter will notify you on the left side of the panel and provide helpful feedback if you hover over the notification.

- **Preview the component**: The component will automatically update as you edit mock props in the editor. With the mock props defined, you can preview the component in AthenaJS's component rendering panel. This enables you to see how the component behaves with specific prop values and make necessary adjustments on the fly thanks to AthenaJS's live component rendering.

- **Modify or remove mock props**: You can easily modify or remove existing mock props by accessing the Props panel and editing or deleting the corresponding JSON entries.

By following these steps, you can efficiently create and manage mock props for your components in AthenaJS.
