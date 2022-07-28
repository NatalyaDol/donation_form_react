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
      leftDonateAmount: PARAMETERSDONATION.targetDonateAmount,
      currentDonateAmount: 0,
      daysLeft: DaysLeft(PARAMETERSDONATION.endDate),
      message: PARAMETERSDONATION.message,
      donorsCurrentValue: 0,
      inputValue: 50,
      defaultValue: 50
    };

    this.refInputValue = React.createRef();

    this.submitDonation = this.submitDonation.bind(this);

  }
  
  submitDonation(event) {
    event.preventDefault();
    this.setState({
      inputValue: this.refInputValue.current.value,
      donorsCurrentValue: this.state.donorsCurrentValue + 1,
    })
  }
  

  render() {
    return (<div className='container-donation'>
      <div className='container-donation__message'>
        ${this.state.leftDonateAmount}
        &nbsp;{this.state.message}
      </div>

      <div className='container-donation__wrapper'>
        <div className='container-donation__wrapper__progressbar'></div>
        <div className='container-donation__wrapper__content'>
          <p><strong className='text-orange'>Only {this.state.daysLeft} days left</strong> to fund this project.</p>
          <p>Join the <strong>{this.state.donorsCurrentValue}</strong> other donors who have already supported this project. Every dollar helps.</p>
        </div>
        <form className='container-donation__wrapper__form' action=''>
          <input className='container-donation__wrapper__form__number' 
            type='text' 
            name='givendonate' 
            defaultValue={this.state.defaultValue}
            onChange={e => {
              this.setState({
                inputValue: e.target.value
              })
            }}
            ref = {this.refInputValue}>
          </input>
          <input className='container-donation__wrapper__form__submit' 
            type='submit' 
            value='Give Now'
            onClick={this.submitDonation}
          ></input>
        </form>
        <em className='text-blue'>Why give ${this.state.inputValue}?</em>
      </div>
    </div>
    );
  }
}