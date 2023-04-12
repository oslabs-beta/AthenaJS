import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UIComps from '../UIComps';
import { UserCompProvider } from '../../context/UserCompContext';

xdescribe('UIComps component', () => {
//   const mockValue = {
//     components: [
//       { name: 'Component 1', body: 'Const var1 = 1', jsx: '<div>Component JSX 1</div>', mockServer: null },
//       { name: 'Component 2', body: 'Const var2 = 2', jsx: '<div>Component JSX 2</div>', mockServer: null },
//     ],
//     dispatch: jest.fn(),
//   };
  test.todo('renders component names' 
//     , () => {
//     render(
//       <UserCompProvider>
//         <UIComps />
//       </UserCompProvider>
//     );

//     const comp1 = screen.getByText(/Component 1/i);
//     const comp2 = screen.getByText(/Component 2/i);
//     expect(comp1.textContent).toBe('Component 1');
//     expect(comp2.textContent).toBe('Component 2');
//   }
  );

  test.todo('calls addNode when "Add" button is clicked'
    // , () => {
//     const mockAddNode = jest.fn();
//     render(
//       <UserCompProvider>
//         <UIComps addNode={mockAddNode} />
//       </UserCompProvider>
//     );

//     const add1Button = screen.getByText(/Add/i, { selector: 'button' });
//     fireEvent.click(add1Button);
//     expect(mockAddNode).toHaveBeenCalledTimes(1);
//     expect(mockAddNode).toHaveBeenCalledWith(mockValue.components[0]);
//   }
    );

  test.todo('calls removeNode when "Remove" button is clicked'
    // , () => {
//     const mockRemoveNode = jest.fn();
//     render(
//       <UserCompProvider>
//         <UIComps removeNode={mockRemoveNode} />
//       </UserCompProvider>
//     );

//     const remove2Button = screen.getByText(/Remove/i, { selector: 'button' });
//     fireEvent.click(remove2Button);
//     expect(mockRemoveNode).toHaveBeenCalledTimes(1);
//     expect(mockRemoveNode).toHaveBeenCalledWith(mockValue.components[1]);
//   }
  );
});
