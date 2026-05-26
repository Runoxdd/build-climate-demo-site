import Home from './pages/Home';
import RiskAssessment from './pages/RiskAssessment';
import ClimateMap from './pages/ClimateMap';
import Adaptationguide from './pages/AdaptationGuide';
import Research from './pages/Research';
import Contact from './pages/Contact';
import LagosRealtimeClimate from './pages/LagosRealtimeClimate';
import Occurrence from './pages/Occurrence';
import Variables from './pages/Variables';
import Effects from './pages/Effects';
import Strategist from './pages/Strategist';
import Layout from './Layout';

export const pagesConfig = {
  mainPage: "Home",
  Layout: Layout,
  Pages: {
    "Home": Home,
    "RiskAssessment": RiskAssessment,
    "ClimateMap": ClimateMap,
    "AdaptationGuide": Adaptationguide,
    "Research": Research,
    "LagosRealtimeClimate": LagosRealtimeClimate,
    "Contact": Contact,
    "Occurrence": Occurrence,
    "Variables": Variables,
    "Effects": Effects,
    "Strategist": Strategist,
  }
};