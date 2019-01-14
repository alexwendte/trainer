import moment, {Moment} from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import FlashContext from '../../contexts/FlashContext';
import { SubmitButton } from '../../styles/comp';
import * as api from '../../utils/api';
import { IForm, IMeeting, IMentor, IUser } from '../../types';

interface IProps {
  open: boolean
  mentor: IMentor
  user: IUser
  close: () => void  
}

const CreateMeeting: React.FC<IProps> = ({open,  mentor,  user,  close}) => {
  const [calendarDate, setCalendarDate] = React.useState<Moment>(moment());
  const [stage, setStage] = React.useState(1);
  const [meeting, setMeeting] = React.useState<Partial<IMeeting> | undefined>(undefined)

const flashContext = React.useContext(FlashContext)    
  
  const handleDateChange = (ev: React.ChangeEvent<Moment>) => {
    setCalendarDate(ev.currentTarget);
  };

  const handleSubmit = ({ ev, stage }: {ev: React.FormEvent<HTMLFormElement> & IForm, stage: number} ) => {
    ev.preventDefault();
    if (stage === 1) {
      const { title, agenda, initialMessage } = ev.currentTarget.elements;
      const date = calendarDate;
      const createdMeeting = {
        agenda: agenda.value,
        initialMessage: initialMessage.value,
        meetingDate: date.toISOString(),
        mentorID: mentor._id,
        title: title.value,
      };
    flashContext.set({message: `Your deposit was succesful, A meeting request was sent to ${mentor.name}! 🎉`})
    setStage(2)
    setMeeting(createdMeeting)
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

      const [firstName, lastName] = user.name.split(' ');

      const cardNumber = cardNumberDirty.value.split('-').join('');

      api.meetings
        .create({
          address: address.value,
          cardCode: cardCode.value,
          cardExpiration,
          cardNumber,
          city: city.value,
          firstName,
          lastName,
          meeting,
          state: state.value,
          zip: zip.value,
        })
        .then(() => {
          flashContext.set({message: "Meeting Created! 🎉"})
          setStage(1)
        });
    }
  };

  const closeModal = () => {
    setStage(1)
    close()
  };

    return (
      open ? (
        <Modal>
          <ModalWrapper>
            {stage === 1 && (
              <>
                <Header>
                  <Heading>New Meeting</Heading>
                  <Close onClick={() => closeModal}>X</Close>
                </Header>
                <SubHeading>
                  Meeting with {mentor.name} <Cost>Cost: {`$${mentor.rate}` || 'Free'}</Cost>
                </SubHeading>
                <Content>
                  <MyDatePicker>
                    <label htmlFor="date">Choose a meeting date and time</label>
                    <DatePicker
                      selected={calendarDate.toDate()}
                      onChange={() => handleDateChange}
                      showTimeSelect={true}
                      dateFormat="LLL"
                      required={true}
                    />
                  </MyDatePicker>
                  <Form
                    onSubmit={(ev: any) => {
                      handleSubmit({ ev, stage: 1 });
                    }}
                  >
                    <InputGroup>
                      <label htmlFor="title">Title</label>
                      <Input type="text" id="title" required={true} />
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
                  <Close onClick={() => closeModal}>X</Close>
                </Header>
                <SubHeading>
                  Meeting with {mentor.name} <Cost>Cost: {`$${mentor.rate}` || 'Free'}</Cost>
                </SubHeading>
                {meeting && meeting.meetingDate}
                <Content>
                  <Form
                    onSubmit={(ev: any) => {
                      handleSubmit({ ev, stage: 2 });
                    }}
                  >
                    <InputGroup>
                      <label htmlFor="address">Address</label>
                      <Input type="text" id="address" required={true} placeholder="1223 Claflin Rd" />
                    </InputGroup>
                    <AddressInputs>
                      <InputGroup>
                        <label htmlFor="city">City</label>
                        <Input type="text" id="city" required={true} placeholder="Manhattan" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="state">State</label>
                        <Input type="text" id="state" required={true} placeholder="KS" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="zip">Zip</label>
                        <Input type="text" id="zip" required={true} placeholder="66502" />
                      </InputGroup>
                    </AddressInputs>
                    <InputGroup>
                      <label htmlFor="cardNumber">Card Number</label>
                      <Input type="text" id="cardNumber" required={true} placeholder="1234-1234-1234-1234" />
                    </InputGroup>
                    <CardInputs>
                      <InputGroup>
                        <label htmlFor="cardExpiration">Card Expiration</label>
                        <Input type="string" id="cardExpiration" required={true} placeholder="08/20" />
                      </InputGroup>
                      <InputGroup>
                        <label htmlFor="cardCode">Card Code</label>
                        <Input type="text" id="cardCode" required={true} placeholder="123" />
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
      ) : null
    );
}

export default CreateMeeting

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
