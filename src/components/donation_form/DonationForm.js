import React  from 'react'
import './donation.scss'
import ParametersDonation from './parametersDonation'
import DaysLeft from '../functions/DaysLeft'

const PARAMETERSDONATION = ParametersDonation;

export default class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetDonateAmount: PARAMETERSDONATION.targetDonateAmount,
      currentDonateAmount: 0,
      currentDonatePercent: 0,
      stillNeededDonate: PARAMETERSDONATION.targetDonateAmount,
      
      daysLeft: DaysLeft(PARAMETERSDONATION.endDate),
      donorsCounter: 0,
      inputValue: 10
    };

    this.refInputValue = React.createRef();

    this.submitDonation = this.submitDonation.bind(this);
  }

  submitDonation(event) {
    // event.preventDefault();
    let inputValue = Number(this.refInputValue.current.value);
    let targetDonateAmount = this.state.targetDonateAmount;
    let currentDonateAmount = this.state.currentDonateAmount + inputValue;
    let currentDonatePercent = ((currentDonateAmount * 100) / targetDonateAmount);
    let widthProgress = "%";

    this.setState({
      inputValue,
      donorsCounter: this.state.donorsCounter + 1,
      currentDonateAmount,
      stillNeededDonate:  ((currentDonateAmount < targetDonateAmount) ? (targetDonateAmount - currentDonateAmount) : 0),
      currentDonatePercent: String(currentDonatePercent).concat(widthProgress)
    });
  }
  
  

  render() {
    return (<div className='donations'>
      <div className='donations__message'>
        <p> ${this.state.stillNeededDonate} still needed for this project</p>
{/*        

        targetDonateAmount = {this.state.targetDonateAmount}
      
        <p></p>
        CurrentAmount = {this.state.currentDonateAmount}

        <p></p>
        this.state.currentDonatePercent = {this.state.currentDonatePercent} */}
      </div>
      <div className='donations__message_marker'
        style={{left: this.state.currentDonatePercent}}>

      </div>
      <div className='donations__section'>
        <div className='donations__wrapper__progressbar'>
          <div className='donations__wrapper__progressbar-progress'
            style={{width: this.state.currentDonatePercent }}>
            
          </div>
        
        </div>

        <div className='donations__wrapper'>
          <div className='donations__wrapper__content'>
            <p><strong className='text-orange'>Only {this.state.daysLeft} days left</strong> to fund this project.</p>
            <p>Join the <strong>{this.state.donorsCounter}</strong> other donors who have already supported this project. Every dollar helps.</p>
          </div>
          <form className='donations__wrapper__form' action=''>
            <input className='donations__wrapper__form__number' 
              type='text'
              name='givendonate' 
              defaultValue={this.state.inputValue}
              onChange={e => {
                this.setState({
                  inputValue: e.target.value
                });
              }}
              ref = {this.refInputValue}>
            </input>
            <input className='donations__wrapper__form__submit' 
              type='button' 
              value='Give Now'
              onClick={this.submitDonation}
            ></input>
          </form>
          <em className='text-blue'>Why give ${this.state.inputValue}?</em>
        </div>
      </div>
    </div>
    );
  }
}