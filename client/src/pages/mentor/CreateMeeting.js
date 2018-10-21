import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Flash from 'components/Flash';
import { SubmitButton } from 'styles/comp';
import 'react-datepicker/dist/react-datepicker.css';
import * as api from 'utils/api';

export default class CreateMeeting extends Component {
  state = {
    calendarDate: moment(),
    submitted: false,
    stage: 1,
    meeting: {},
  };

  handleDateChange = ev => {
    this.setState({
      calendarDate: ev,
    });
  };

  handleSubmit = ({ ev, stage }) => {
    ev.preventDefault();
    if (stage === 1) {
      const { title, agenda, initialMessage } = ev.currentTarget.elements;
      const date = this.state.calendarDate;
      const meeting = {
        title: title.value,
        agenda: agenda.value,
        initialMessage: initialMessage.value,
        meetingDate: date.toISOString(),
        mentorID: this.props.mentor._id,
      };

      console.log(meeting);

      this.setState({ submitted: true });
      setTimeout(() => {
        this.setState({ submitted: false, meeting, stage: 2 });
      }, 3000);
    }
    if (stage === 2) {
      const {
        address,
        city,
        state,
        zip,
        cardNumber: cardNumberDirty,
        cardExpiration: dirtyExpiration,
        cardCode,
      } = ev.currentTarget.elements;
      const dirty = dirtyExpiration.value;
      const [month] = dirty.split('/');
      const year = dirty.substr(dirty.length - 2);
      const cardExpiration = `${month}${year}`;

      const [firstName, lastName] = this.props.user.name.split(' ');

      const cardNumber = cardNumberDirty.value.split('-').join('');

      api.meetings
        .create({
          meeting: this.state.meeting,
          address: address.value,
          city: city.value,
          state: state.value,
          zip: zip.value,
          cardNumber,
          cardExpiration,
          cardCode: cardCode.value,
          firstName,
          lastName,
        })
        .then(() => {
          this.setState({ submitted: true });
          setTimeout(() => {
            this.setState({ submitted: false, stage: 1 });
            this.props.close();
          }, 2500);
        });
    }
  };

  close = () => {
    this.setState(
      () => ({ stage: 1 }),
      () => {
        console.log(this.state.stage);
        this.props.close();
      }
    );
  };

  render() {
    const { mentor, open } = this.props;
    const { submitted, calendarDate, stage, meeting } = this.state;
    console.log(this.state.stage);
    return (
      open && (
        <Modal>
          <ModalWrapper>
            {stage === 1 && (
              <>
                <Header>
                  <Heading>New Meeting</Heading>
                  <Close onClick={this.close}>X</Close>
                </Header>
                <Flash submitted={submitted} successMessage="Meeting Created! 🎉" />
                <SubHeading>
                  Meeting with {mentor.name} <Cost>Cost: {`$${mentor.rate}` || 'Free'}</Cost>
                </SubHeading>
                <Content>
                  <MyDatePicker>
                    <label htmlFor="date">Choose a meeting date and time</label>
                    <DatePicker
                      selected={calendarDate}
                      onChange={this.handleDateChange}
                      showTimeSelect
                      dateFormat="LLL"
                      required
                    />
                  </MyDatePicker>
                  <Form
                    onSubmit={ev => {
                      this.handleSubmit({ ev, stage: 1 });
                    }}
                  >
                    <InputGroup>
                      <label htmlFor="title">Title</label>
                      <Input type="text" id="title" required />
                    </InputGroup>
                    <InputGroup>
                      <label htmlFor="agenda">Meeting Agenda</label>
                      <TextArea id="agenda" />
                    </InputGroup>
                    <InputGroup>
                      <label htmlFor="initialMessage">Message For Mentor</label>
                      <TextArea id="initialMessage" />
                    </InputGroup>
                    <SubmitButton style={{ marginTop: '2rem' }} type="submit">
                      Create Meeting
                    </SubmitButton>
                  </Form>
                </Content>
              </>
            )}
            {stage === 2 && (
              <>
                <Header>
                  <Heading>Meeting Payment</Heading>
                  <Close onClick={this.close}>X</Close>
                </Header>
                <Flash
                  submitted={submitted}
                  successMessage={`Your deposit was succesful, A meeting request was sent to ${mentor.name}! 🎉`}
                />
                <SubHeading>
                  Meeting with {mentor.name} <Cost>Cost: {`$${mentor.rate}` || 'Free'}</Cost>
                </SubHeading>
                {meeting.date}
                <Content>
                  <Form
                    onSubmit={ev => {
                      this.handleSubmit({ ev, stage: 2 });
                    }}
                  >
                    <InputGroup>
                      <label htmlFor="address">Address</label>
                      <Input type="text" id="address" required placeholder="1223 Claflin Rd" />
                    </InputGroup>
                    <AddressInputs>
                      <InputGroup>
                        <label htmlFor="city">City</label>
                        <Input type="text" id="city" required placeholder="Manhattan" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="state">State</label>
                        <Input type="text" id="state" required placeholder="KS" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="zip">Zip</label>
                        <Input type="text" id="zip" required placeholder="66502" />
                      </InputGroup>
                    </AddressInputs>
                    <InputGroup>
                      <label htmlFor="cardNumber">Card Number</label>
                      <Input type="text" id="cardNumber" required placeholder="1234-1234-1234-1234" />
                    </InputGroup>
                    <CardInputs>
                      <InputGroup>
                        <label htmlFor="cardExpiration">Card Expiration</label>
                        <Input type="string" id="cardExpiration" required placeholder="08/20" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardCode">Card Code</label>
                        <Input type="text" id="cardCode" required placeholder="123" />
                      </InputGroup>
                    </CardInputs>
                    <SubmitButton style={{ marginTop: '2rem' }} type="submit">
                      Make Deposit
                    </SubmitButton>
                  </Form>
                </Content>
              </>
            )}
          </ModalWrapper>
        </Modal>
      )
    );
  }
}
CreateMeeting.propTypes = {
  mentor: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(53, 64, 65, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: ${props => props.theme.lightGray};
  min-width: 70rem;
  min-height: 40rem;
`;

const Content = styled.div`
  padding: 0 2rem 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${props => props.theme.primary};
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.white};
  text-align: center;
`;

const SubHeading = styled.h3`
  text-align: center;
  padding-top: 2rem;
`;

const Cost = styled.span`
  color: ${props => props.theme.green};
  padding-left: 1rem;
`;

const Close = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  font-weight: 900;
  &:hover {
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin: 1rem 0.5rem 0;
  flex-grow: 1;
  label,
  legend {
    color: ${props => props.theme.gray};
    padding-bottom: 0.5rem;
  }
  label,
  input {
    display: block;
  }
  input {
    width: 100%;
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    border: none;
    background: ${props => props.theme.white};
  }
  textarea {
    width: 100%;
    height: 6rem;
    padding: 1rem;
    border: none;
    border-radius: 5px;
  }
`;

const AddressInputs = styled.div`
  display: flex;
`;
const CardInputs = styled.div`
  display: flex;
`;

const MyDatePicker = styled.div`
  padding-top: 2rem;
  .react-datepicker-wrapper input {
    border-radius: 5px;
    padding: 0.7rem 1.2rem;
    height: 3.4rem;
    width: 25rem;
    margin-top: 0.5rem;
    border: none;
    background: ${props => props.theme.white};
    font-family: Rubik;
  }

  .react-datepicker__current-month {
    font-size: 1.6rem;
  }

  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 13rem;
  }

  .react-datepicker__navigation {
    top: 1.5rem;
  }

  .react-datepicker__day {
    padding: 0.5rem;
    width: auto;
  }
  .react-datepicker__week,
  .react-datepicker__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .react-datepicker__day--selected:hover {
    background-color: ${props => props.theme.primary};
  }

  .react-datepicker__time-container {
    width: auto;
  }
  .react-datepicker__header--time {
    padding: 0;
    height: 5.1rem;
    line-height: 5.1rem;
  }

  .react-datepicker-time__header {
    font-size: 1.6rem;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: auto;
  }
`;
