import Home from './pages/Home';
import RiskAssessment from './pages/RiskAssessment';
import ClimateMap from './pages/ClimateMap';
import AdaptationGuide from './pages/AdaptationGuide';
import Research from './pages/Research';
import Contact from './pages/Contact';
import LagosRealtimeClimate from './pages/LagosRealtimeClimate';
import Layout from './Layout';

export const pagesConfig = {
  mainPage: "Home",
  Layout: Layout,
  Pages: {
    "Home": Home,
    "RiskAssessment": RiskAssessment,
    "ClimateMap": ClimateMap,
    "AdaptationGuide": AdaptationGuide,
    "Research": Research,
    "LagosRealtimeClimate": LagosRealtimeClimate,
    "Contact": Contact,
  }
};