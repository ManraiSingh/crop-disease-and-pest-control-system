import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdvisoryPage from './app/advisory/AdvisoryPage.jsx'
import HistoryPage from './app/history/HistoryPage.jsx'
import HomePage from './app/home/HomePage.jsx'
import AppShell from './app/layout/AppShell.jsx'
import ProfilePage from './app/profile/ProfilePage.jsx'
import ScanPage from './app/scan/ScanPage.jsx'
import LandingPage from './landing/LandingPage.jsx'
import AboutYourself from './onboarding/pages/AboutYourself.jsx'
import AddField from './onboarding/pages/AddField.jsx'
import AllSet from './onboarding/pages/AllSet.jsx'
import CropDetails from './onboarding/pages/CropDetails.jsx'
import Welcome from './onboarding/pages/Welcome.jsx'
import PhoneDemoLayout from './shared/PhoneDemoLayout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PhoneDemoLayout />}>
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/about-you" element={<AboutYourself />} />
          <Route path="/onboarding/add-field" element={<AddField />} />
          <Route path="/onboarding/crop" element={<CropDetails />} />
          <Route path="/onboarding/all-set" element={<AllSet />} />

          <Route element={<AppShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
