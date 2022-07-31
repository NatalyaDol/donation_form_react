import React  from 'react'
import './donation.scss'
import DaysLeft from '../functions/DaysLeft'

export default class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetDonateAmount: this.props.data.targetDonateAmount,
      inputDonateValue: this.props.data.minDonate,
      btnSaveContent: this.props.data.btnSaveContent,
      btnTellContent: this.props.data.btnTellContent,
      currentDonateAmount: 0,
      currentDonatePercent: 0,
      stillNeededDonate: this.props.data.targetDonateAmount,
      message: '',
      fundIsOpen: true,
      submitBtnDisabled: '',
      
      daysLeft: DaysLeft(this.props.data.endDate),
      donorsCounter: 0
    };

    this.refInputDonateValue = React.createRef();
    this.submitDonation = this.submitDonation.bind(this);
    this.handleChangeInputFrom = this.handleChangeInputFrom.bind(this);
    this.inputFormValidation = this.inputFormValidation.bind(this);
  }

  componentDidMount() {
    let targetDonateAmount = this.state.targetDonateAmount;
    let currentDonateAmount = this.state.currentDonateAmount;
    let stillNeededDonate = this.state.stillNeededDonate;
    let fundIsOpen = ((currentDonateAmount < targetDonateAmount && this.state.daysLeft > 0) ? true : false);

    if (fundIsOpen === true) {
      this.setState({
        fundIsOpen,
        message: '$' + stillNeededDonate + ' still needed for this project'
      })
    } else {
      this.setState({
        message: 'Thank you! The fund is closed.',
        submitBtnDisabled: 'disabled'
      })
    } 
  }

  inputFormValidation(event) {
    !/[0-9]/.test(event.key) && event.preventDefault()
  }

  handleChangeInputFrom(event) {
    let inputDonateValue = Number(event.target.value);
    
    this.setState({
      inputDonateValue: inputDonateValue
    })
  }

  submitDonation(event) {
    // event.preventDefault();
    let inputDonateValue = Number(this.refInputDonateValue.current.value);
    let targetDonateAmount = this.state.targetDonateAmount;
    let currentDonateAmount = this.state.currentDonateAmount + inputDonateValue;
    let currentDonatePercent = ((currentDonateAmount * 100) / targetDonateAmount);
    let fundIsOpen = ((currentDonateAmount < targetDonateAmount && this.state.daysLeft > 0) ? true : false);
    let donorsCounter = this.state.donorsCounter;
    let stillNeededDonate = targetDonateAmount - currentDonateAmount;

    this.setState({
      inputDonateValue,
      stillNeededDonate,
      currentDonateAmount,
      currentDonatePercent: String(currentDonatePercent).concat("%")
    });

    if (fundIsOpen === true) {
      this.setState({
        donorsCounter: ((inputDonateValue > 0) ? donorsCounter + 1 : donorsCounter),
        message: '$' + stillNeededDonate + ' still needed for this project'
      })
    } else {
      this.setState({
        stillNeededDonate: null,
        message: 'Thank you! The fund is closed.',
        submitBtnDisabled: 'disabled',
        donorsCounter: ((inputDonateValue > 0) ? donorsCounter + 1 : donorsCounter) 
      })
    } 
  }
  
  render() {
    const totalDays = this.state.daysLeft;
    return (<div className='donations'>
      <div className='donations__message'>
        <p>{this.state.message}</p>
      </div>
      <div className='donations_marker'
        style={{left: this.state.currentDonatePercent}}>
      </div>
      <div className='donations__section'>
        <div className='donations__section__progressbar'>
          <div style={{width: this.state.currentDonatePercent }}></div>
        </div>
        <div className='donations__section__wrapper'>
          <div>
            <p>
              <strong className='text-orange'>Only {this.state.daysLeft} 
                {
                  (totalDays < 2) && ' day left'
                }
                {
                  (totalDays >= 2) && ' days left'
                }
              </strong> to fund this project.
            </p>
            <p>Join the <strong>{this.state.donorsCounter}</strong> other donors who have already supported this project. Every dollar helps.</p>
          </div>
          <form className='donations__section__wrapper__form' action=''>
            <input className='donations__section__wrapper__form__number' 
              type='number'
              name='givendonate' 
              defaultValue={this.state.inputDonateValue}
              onKeyPress={this.inputFormValidation}
              onChange={this.handleChangeInputFrom}
              ref = {this.refInputDonateValue}>
            </input>
            <input className='donations__section__wrapper__form__submit' 
              type='button' 
              value='Give Now'
              onClick={this.submitDonation}
              disabled={this.state.submitBtnDisabled}
            ></input>
          </form>
          <em className='text-blue'>Why give ${this.state.inputDonateValue}?</em>
        </div>
      </div>
      <div className='donations__btns'>
        <button type="button">{this.state.btnSaveContent}</button>
        <button type="button">{this.state.btnTellContent}</button>
      </div>
    </div>
    );
  }
}