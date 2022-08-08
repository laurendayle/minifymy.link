import { Icon, Label, Menu, Table, Input, Button } from "semantic-ui-react";
import { useState } from "react";
import styled from "styled-components";
import ShortenURL from "../home/ShortenURL";
import Modal from "../reusable/Modal";
import { InputProvider } from "../hooks/InputProvider";

const LinksDisplay = ({ links }) => {

  const [showModal, setShowModal] = useState(false);

  return (
    <TableContainer>
      <InputProvider>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Input icon="search" placeholder="Search URLs"/>
          {showModal ? <Modal setShowModal={setShowModal} children={<ShortenURL />} /> : <></>}
          {!showModal ? <StyledButton onClick={() => setShowModal(!showModal)}>+</StyledButton> : ""}
        </div>
      </InputProvider>
      <Table singleLine size="small" compact textAlign="center" verticalAlign="middle">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Original URL</Table.HeaderCell>
            <Table.HeaderCell>Shortened URL</Table.HeaderCell>
            <Table.HeaderCell>Clicks</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body textAlign="center">
          {links?.length ? links.map((link) => (
            <Table.Row>
              <Table.Cell>{link.title ? link.title : "--"}</Table.Cell>
              <Table.Cell>{link.original_url}</Table.Cell>
              <Table.Cell>{link.shortened_url}</Table.Cell>
              <Table.Cell>{link.clicks}</Table.Cell>
            </Table.Row>
          )) : null}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" size="small" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" size="small" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  width: 60%;
  background-color: #8ebcbc;
  padding: 15px;
  border-radius: 5px;
  z-index: 0;
`;

const StyledButton = styled.button`
  width: 50px;
  height: 35px;
  background-color: transparent;
  border: 1px dotted teal;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 900;
  color: white;
  transition: all 0.25s ease;
`;

export default LinksDisplay;
