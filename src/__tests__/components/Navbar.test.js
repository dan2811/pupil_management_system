import { render, screen } from '@testing-library/react';
import Navbar from '../../Components/navbar';
import { useLocation } from 'react-router-dom';


describe('Navbar Tests', () => {

    const mockedUseLocation = () => {
        React.useEffect(() => {
          console.log('using an effect');
        });
        return (<div>Hello World</div>);
      };
      jest.mock('./MyComponent', () => MockMyComponent);

    beforeEach(() => {
        
    })

    test('renders navbar succesfully', () => {
        const {container} = render(<Navbar />);
      
        expect(container).toMatchSnapshot();
      });
})

