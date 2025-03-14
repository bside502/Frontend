import { Route, Routes } from 'react-router';
import RootLayout from '@/components/layout/rootLayout';
import Home from '@/pages/home/home';
import Login from '@/pages/login/login';
import ShopInformation from '@/pages/shopInformation/shopInformation';
import ShopCheck from '@/pages/shopCheck/shopCheck';
import UploadReview from '@/pages/upload-review/uploadReview';
import Persona from '@/pages/persona/persona';
import PersonaSuccess from '@/pages/persona-success/persona-success';
import Review from '@/pages/review/Review';
import ReviewHistory from '@/components/review/ReviewHistory';
import LoginCallback from '@/pages/login/login-callback';
import DeletePage from '@/pages/account/DeletePage';
import DeleteComplete from '@/pages/account/DeleteComplete';
import ShopUpdate from '@/pages/shopUpdate/ShopUpdate';

export default function CustomRoute() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login-callback' element={<LoginCallback />} />
        <Route path='/delete' element={<DeletePage />} />
        <Route path='/delete-complete' element={<DeleteComplete />} />
        <Route path='/persona' element={<Persona />} />
        <Route path='/shop-information' element={<ShopInformation />} />
        <Route path='/shop-check' element={<ShopCheck />} />
        <Route path='/update-store' element={<ShopUpdate />} />
        <Route path='/upload-answer' element={<UploadReview />} />
        <Route path='/persona' element={<Persona />} />
        <Route path='/persona-success' element={<PersonaSuccess />} />
        <Route path='/review' element={<Review />} />
        <Route path='/review-history' element={<ReviewHistory />} />
      </Route>
    </Routes>
  );
}
