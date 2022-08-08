import styled from "styled-components";
import { useState } from "react";
import { Input, Button, Icon, Form, Label } from "semantic-ui-react";

const DetailsButton = (props) => {
  const [buttonState, setButtonState] = useState(false);
  const [error, setError] = useState(true);

  return (
    <Form>
      <Container>

      <Button
          content={props.name}
          style={buttonStyle}
          icon={!buttonState ? "plus" : "minus"}
          size="small"
          onClick={(e) => setButtonState(!buttonState)}
        />


        {buttonState ? (
          <ShowHide>
            <Input
              type="text"
              style={inputStyle}
              name={props.name}
              placeholder={props.name}
              onChange={(e) => props.handleInputChange(e)}
            />
            {error ? (
              <Label style={labelStyle} pointing="above">That backhalf is taken!</Label>
            ) : null}
          </ShowHide>
        ) : (
          ""
        )}


      </Container>
    </Form>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
`;


const ShowHide = styled.div`
  display: flex;
  justify-content: center;
`;
const buttonStyle = {
  minWidth: "200px",
  paddingTop: "8px",
  backgroundColor: "transparent",
  color: "white",
  border: "1px dotted white",
  fontSize: "12px",
  margin: "5px",
  height: "30px",
};

const inputStyle = {
  height: "30px",
  maxWidth: "fit-content",
  fontSize: "14px",
}

const labelStyle = {
  position: "absolute",
  bottom: "0",
  fontSize: "14px",
  backgroundColor: "teal",
  width: "fit-content",
  color: "white",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;"
}
export default DetailsButton;
