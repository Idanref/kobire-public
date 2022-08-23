import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AboutHome from './components/AboutHome';
import Footer from './components/Footer';
import Order from './components/Order';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Modal from './components/Modal';
import Comments from './components/Comments';
import Info from './components/Info';

function App() {
  return (
    <Provider store={store}>
      <>
        <Hero />
        <Navbar />
        <Gallery />
        <Modal />
        <Order />
        <Comments />
        <Info />
        <AboutHome />
        <Footer />
      </>
    </Provider>
  );
}

export default App;
