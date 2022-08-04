import { Icon, Label, Menu, Table, Input } from "semantic-ui-react";
import styled from "styled-components";

const LinksDisplay = ({ links }) => {
  return (
    <TableContainer>
      <Input icon="search" placeholder="Search URLs" />
      <Table singleLine size="small" compact textAlign="center" verticalAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Original URL</Table.HeaderCell>
            <Table.HeaderCell>Shortened URL</Table.HeaderCell>
            <Table.HeaderCell>Clicks</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body textAlign="center">
          {links?.length
            ? links.map((link) => (
                <Table.Row>
                  <Table.Cell>{link.title ? link.title : "--"}</Table.Cell>
                  <Table.Cell>{link.original_url}</Table.Cell>
                  <Table.Cell>{link.shortened_url}</Table.Cell>
                  <Table.Cell>{link.clicks}</Table.Cell>
                </Table.Row>
              ))
            : ""}
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
`;

export default LinksDisplay;
