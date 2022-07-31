import './App.css'
import DonationForm from './components/donation_form/DonationForm'
import DataDonation from './components/donation_form/dataDonation'

function App() {
  return (
    <div className="App">
      <DonationForm 
        data={DataDonation}
      />
    </div>
  );
}

export default App;
