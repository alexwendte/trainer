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
  };

  handleDateChange = ev => {
    this.setState({
      calendarDate: ev,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { title, agenda, initialMessage } = ev.currentTarget.elements;
    const date = this.state.calendarDate;

    api.meetings
      .create({
        title: title.value,
        agenda: agenda.value,
        initialMessage: initialMessage.value,
        meetingDate: date.toISOString(),
        mentorID: this.props.mentor._id,
      })
      .then(() => {
        this.setState({ submitted: true });
        setTimeout(() => {
          this.setState({ submitted: false });
          this.props.close();
        }, 1500);
      });
  };

  render() {
    const { mentor, open, close } = this.props;
    const { submitted, calendarDate } = this.state;

    return (
      open && (
        <Modal>
          <ModalWrapper>
            <Header>
              <Heading>New Meeting</Heading>
              <Close onClick={close}>X</Close>
            </Header>
            <Flash submitted={submitted} successMessage="You sent a meeting request! 🎉" />
            <SubHeading>Meeting with {mentor.name}!</SubHeading>
            <Content>
              <p>
                The meeting will cost <Cost>{mentor.rate}</Cost>
              </p>
              <MyDatePicker>
                <label htmlFor="date">Choose a meeting date and time</label>
                <DatePicker selected={calendarDate} onChange={this.handleDateChange} showTimeSelect dateFormat="LLL" />
              </MyDatePicker>
              <form onSubmit={this.handleSubmit}>
                <InputGroup>
                  <label htmlFor="title">Title</label>
                  <Input type="title" id="title" required />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="agenda">Meeting Agenda</label>
                  <TextArea type="agenda" id="agenda" />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="initialMessage">Message For Mentor</label>
                  <TextArea type="initialMessage" id="initialMessage" />
                </InputGroup>
                <SubmitButton type="submit">Send Meeting Request</SubmitButton>
              </form>
            </Content>
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
`;

const ModalWrapper = styled.div`
  background: ${props => props.theme.lightGray};
  min-width: 60rem;
  min-height: 40rem;
`;

const Content = styled.div`
  padding: 1rem 2rem 2rem;
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
  color: ${props => props.theme.primary};
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

const InputGroup = styled.div`
  margin: 1rem 0.5rem;
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
