import { render, screen, waitFor, act } from '@testing-library/react';
import Main from './main'; // import your Main component

/*
it('renders "No Record!" when there are no records', async () => {
  render(<Main />);

  // Wait for any async actions to complete
  await screen.findByText('No Record!');

  expect(screen.getByText('No Record!')).toBeInTheDocument();
});
*/


describe("withFetch2", () => {
  it('can fetch normally', async () => {  
    
    let component: any;

    await act(async() => {
      component = render(<Main />);
    })

    const element = component.getByText('6588002')
    screen.debug();
  });
});  


